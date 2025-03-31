# Light's Dynamically Grouped Streams

Light utilizes [message batching](./replication_batch.md) to keep the library's data overhead low. Because messages are
batched until the end of the frame, there comes to be an issue with broadcasting the same data to multiple players.
If we want to be able to send things to individual groups of people, we have to have distinct buffers to separate those
people from one another.

## A Simple Scenario

Here's somewhere we want to fire some data to a couple of our players.

```luau
send({plr1, plr2}, 1234)
send({plr1}, 4321)
```

To batch this data for each player, we could store separate buffers for each player, and copy over the data we already
serialized into each target's send buffer. Let's lay out send buffers like this:

```luau title="pseudocode-send-buffers"
send_buffers = {
   plr1 = [0b],
   plr2 = [0b]
}
```

## Copying

Now, we run the first line: `#!luau send({plr1, plr2}, 1234)`

```luau title="buffer-copy-example"
ser 1234 -> 0b10011010010
                 |
send_buffers = { | write
    plr1 = [0b..10011010010]
                 | copy
    plr2 = [0b..10011010010]
}
```

Now, the second: `#!luau send({plr1}, 4321)`

```luau title="buffer-copy-example"
ser 4321 -> 0b1000011100001
                         |
send_buffers = {         | write
    plr1 = [0b..10011010010..1000011100001]
    plr2 = [0b..10011010010..]
}
```

When we step replication, each player will get their respective buffer as-is. Each player got their messages in order as
expected. This copying behavior is essentially what [Blink](https://github.com/1Axen/blink) does, and what you'll get
when you use [`#!luau light.send*`](../../api/network/messages/sending/send.md) with multiple players on the server.
However, copying can grow costly for your memory usage and add some real overhead when you continue to do it for a large
number (or all) of your players.

## A Smarter Way

What [ByteNet](https://github.com/ffrostfall/ByteNet) does to combat this fact is to create a separate "stream" for
events fired to everyone, and individual streams for each player. Then, on the replication step, send the global stream
with :FireAllClients() first. This creates an undocumented event ordering discrepancy, because events fired to all users
will always be recieved first. [ByteNet](https://github.com/ffrostfall/ByteNet) also has bad performance firing to a
specific list of players, because there is no singular stream it can write to.

## An (Even) Smarter Way

Here's where Light comes in. Light implements a system which batches together streams based on the composition of their
users. Now, you get something like this for your buffers:

```luau title="pseudocode-send-buffer-with-records"
send_buffers = {
    {plr1, plr2} = [0b--[[...]]],
    {plr1}       = [0b--[[...]]]
}
```

Notice how {plr1, plr2} gets a buffer to be written to. We base the lookup for each stream based on its composition of
player records, meaning any event sent to plr1 **and** plr2 will be written to a single buffer. These groups need to be
created when you fire to them the first time, and can add a bit of overhead there. For the fruits of our labor, when we
step replication, instead of sending each player exclusively one buffer, we simply send a list of them, saving tons of
memory:

```luau title="batch.luau"
local player_send_batches = {}

for players, buff in send_buffers do
    for _, player in players do
        local send_batch = player_send_batches[player]
        if not send_batch then
            send_batch = { buff }
            player_send_batches[player] = send_batch
            continue
        end
        table.insert(send_batch, buff)
    end
end

for player, batch in player_send_batches do
    ReliableRemoteEvent:FireClient(player, table.unpack(batch))
end
```

This creates the same ordering discrepancy as bytenet, but on a larger scale. Ordering of a message is only guaranteed
per-stream, and streams are grouped based on who they were fired to. In practice, this has little impact on how you
develop. But, if it's an issue you can always use `#!luau light.send()` and utilize the copying behavior anyways.

### Queries

Well, we can save on memory by grouping together calls like this without copying. But what about actually **finding**
the buffers we're writing to? That's non-trivial, because there's an exponentially high number of possible combinations.
Not to mention, these groups can't permute / have different orders. They must be based solely on what players do and do
not exist in a stream.

The first step is to make sure our streams know who's listening, and that we have a list of streams that can be queried.
Generating these lists involve a million billion edge cases I won't dive deep into here, but the gist is to give us an
array to iterate.

```luau title="querying_streams.luau"
type Stream = {
    subscribed_users: { Player },
    buff_batch: ...
}

local queryable_streams: { Stream } = {}
```

Now, we could iterate through each stream and continue if
[`table.find()`](https://create.roblox.com/docs/reference/engine/libraries/table#find) doesn't leave you with an exact
match for each player. But that takes a lot of time if we create lots of streams, so let's add a new property to
`#!luau type Stream` for the number of subscribed users, so we can filter out streams without the right number:

```luau title="querying_streams.luau"
type Stream = {
    subscribed_users: { Player },
    num_subscribed_users: number,
    buff_batch: ...
}
```

With the number of subscribed users for a stream saved, we should also change `subscribed_users` to be a set, so we can
check if someone is subscribed to a stream in O(1) time. Now, we can make our query function:

```luau title="querying_streams.luau"
type Stream = {
    subscribed_set: { [Player]: true? },
    num_subscribed_users: number,
    buff_batch: ...
}

local queryable_streams: { Stream } = {}

local query_stream
do
    function query_stream(querying_users: { Player }): Stream
       local querying_for_num = #querying_users

       for _, queryable_stream in queryable_streams do
            if queryable_stream.num_subscribed_users ~= querying_for_num then
                continue
            end

            local subscribed_set = queryable_stream.subscribed_set

            local matching_stream = queryable_stream

            for index = 1, querying_for_num do
                if subscribed_set[querying_users[index]] then
                    continue
                end
                matching_stream = nil
                break
            end

           if matching_stream then return matching_stream end
       end

       return make_stream(querying_users)
    end
end
```

This is great, now finding a stream is ~O(n*s) where "n" is the number of players we're querying for, and "s" is the
number of streams of the same number of subscribed users. Not too shabby! Though, we want it to be really quick to find
our streams which we've already created. We'll add a new data set "`#!luau local player_queryable`" to let the player
know which streams it is already listening to, so we can iterate that instead of all of the streams. If no matching
streams are found in the first player's dataset, we need to make a new stream.

```luau title="querying_streams.luau"
type Stream = {
    subscribed_set: { [Player]: true? },
    num_subscribed_users: number,
    buff_batch: ...
}

local queryable_streams: { Stream } = {}
local player_queryable: { [Player]: { Stream } } = {}

local query_stream
do
    function query_stream(querying_users: { Player }): Stream
        local querying_for_num = #querying_users

        local queryable = player_queryable[querying_users[1]]
        if not queryable then
            return make_stream(querying_users)
        end

        --[[
        Same code as before!
        ]]
        for _, queryable_stream in queryable do
            if queryable_stream.num_subscribed_users ~= querying_for_num then
                continue
            end

            local subscribed_set = queryable_stream.subscribed_set

            local matching_stream = queryable_stream

            for index = 1, querying_for_num do
                if subscribed_set[querying_users[index]] then
                    continue
                end
                matching_stream = nil
                break
            end

            if matching_stream then return matching_stream end
        end

        return make_stream(querying_users)
    end
end
```

This is still ~O(n*s), but "s" is typically going to be a smaller number, since it's specific to one player. This is
(more or less) how Light's broadcasts work. Light also maintains a "global" stream and a generated set of the
"localized" streams belonging to only a single player, so they can be accessed very quickly.
