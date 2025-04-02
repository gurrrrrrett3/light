# Light's Unreliable Fragmentation

## Description

Automatically convert large unreliable packets into individual fragmented ones in order to circumvent Roblox
limitations.

## Motivation

Roblox (as of right now) does not allow you to send unreliable packets over 1000 bytes. We don't want our users worried
about the size (in bytes) that their unreliable event could total to, so we should handle breaking up large packets
behind the scenes.

## Design

### Maximum Size

Light creates an artificial "maximum" size based on estimated roblox type overhead. Then, it breaks up an unreliable
event's written packet into individual smaller pieces with some sequencing data.

The maximum send size for each fragment is calculated like this:

```luau
local unreliable_fragment_size: number
do
    -- 1000 at the time of writing this
    unreliable_fragment_size = ROBLOX_MAX_UNRELIABLE

    local adjusted_fragment_size

    while true do
        adjusted_fragment_size = ROBLOX_MAX_UNRELIABLE
        -- roblox type overhead rough estimate
        adjusted_fragment_size -= 2
        -- remove the size roblox will use to encode our buffer from the max fragment size
        adjusted_fragment_size -= get_vlq_size(unreliable_fragment_size)
        if adjusted_fragment_size == unreliable_fragment_size then
            unreliable_fragment_size = adjusted_fragment_size
            -- we've reached a stable level so we can stop iterating
            break
        end
        unreliable_fragment_size = adjusted_fragment_size
    end
end
```

### Discarding

Since this process involves unreliables, we can't assume all fragments of a message will make it. If a fragment lives
for more than a second, we'll simply discard it. Most of the time these fragments will all show up in the exact same
frame.

### Sequencing

We need the order of each piece of the message to be encoded, so that we can put the event back together on the other
side. We need the ability to know:

- Which packets belong to which individual message send call

- We need to know we can assemble it by the time all fragments arrive.

- Message id, assuming all pieces of the message arrived

- The order in which pieces were sent to reconstruct them, assuming all pieces arrived

So, the simplest way is to encode the following:

- Message ID
- How many times this message has been called (fmod this value so it doesn't go up in size forever)
- How many fragments are expected in total so we know when to assemble them
- Sequence ID for reconstructing the fragments

This works, but we've added a bare minimum 4 bytes of overhead to every fragment. That actually can be a significant
value depending on how many fragments there are. Let's try optimizing it a bit. Notice how in our prerequisites, some
information is only needed if we got all of the fragments? That means we can move some pieces of data to only be
included in one (the first) fragment of a message. We can also unify the Sequencing ID to only keep track of the
fragment number. That's because we know which fragment is the first now, as well as how many fragments are expected on
any viable packet. This means we can derive a call's presence from the presence of a bitflag, and ignore a "call count."
Let's adjust the format with a bitflag to include that:

- Is this the first fragment for this message? (1 bit)
- Unified Sequencing ID (7 bits) (1)

If it's the first fragment, we'll include these too:

- Message ID
- Total Number of Fragments

### TODO finish this blog lol
