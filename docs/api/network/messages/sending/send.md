# Send

## `#!luau function light.send` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send<T>(
   message: Message<T>,
   data: T
): ()
```

Send a message with given data to the server, for example:

```luau
light.send(messages.foo, 1234)
```

## `#!luau function light.send` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send<T>(
   message: Message<T>,
   to: Player | { Player },
   data: T
): ()
```

Send a message with given data to a player, for example:

```luau
Players.PlayerAdded:Connect(function(player)
   light.send(messages.foo, player, 1234)
end)
```

### Note about [`#!luau light.send()`](./send.md) (On the server)

You should almost always prefer
[`#!luau light.broadcast()`](./broadcast.md). Sending to a list of players is much more memory-efficient with
[`#!luau light.broadcast()`](./broadcast.md), because it operates on different logic.(1)
{.annotate}

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
   writing to a single stream and copying it to each player. This process is done through stream queries internally. To
   learn more about how Light dynamically groups streams for broadcasting, check out
   [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.
