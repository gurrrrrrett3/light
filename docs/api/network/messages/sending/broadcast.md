# Broadcast

[`#!luau light.broadcast()`](./broadcast.md) will send a message to a list of players on the server.

!!!tip "Sending to individual players"

    To send to an individual, check out [`#!luau light.send()`](./send.md)

## `#!luau function light.broadcast`

```luau title='<!-- server --> <!-- sync -->'
function broadcast<T>(
    message: Message<T>,
    to: { Player },
    data: T
)
```
