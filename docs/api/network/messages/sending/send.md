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

!!! tip "On the server, you should usually prefer [`#!luau light.broadcast()`](./broadcast.md) over [`#!luau light.send()`](./send.md)."

    This is because the latter can take up more memory. Light "broadcasts" can save memory by writing data to a single
    stream and batching it to relevant players instead of writing to a single stream and copying it for each player. To
    learn more, check out [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic."
