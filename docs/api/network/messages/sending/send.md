# Send

## `#!luau function light.send`

```luau title='<!-- client --> <!-- sync -->'
function send<T>(
    message: Message<T>,
    data: T
): ()
```

Send a message with given data to the server, for example:

```luau
light.send(messages.foo, 1234)
```

!!! tip "Sending messages to multiple people"

    To send messages to multiple people on the server, check out [`#!luau light.broadcast()`](./broadcast.md).

## `#!luau function light.send`

```luau title='<!-- server --> <!-- sync -->'
function send<T>(
    message: Message<T>,
    to: Player,
    data: T
): ()
```

Send a message with given data to a player, for example:

```luau
Players.PlayerAdded:Connect(function(player)
    light.send(messages.foo, player, 1234)
end)
```
