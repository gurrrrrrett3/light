# Send To All Except

Send To All Except is identical to calling [`#!luau light.send()`](./send.md) to all players except a player or
list of players.

!!! tip "You should usually prefer [`#!luau light.broadcast_to_all_except()`](./broadcast_to_all_except.md) over [`#!luau light.send_to_all_except()`](./send_to_all_except.md)"

    This is because the latter can take up more memory. Light "broadcasts" can save memory by writing data to a single
    stream and batching it to relevant players instead of writing to a single stream and copying it for each player. To
    learn more, check out [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function light.send_to_all_except`

```luau title='<!-- server --> <!-- sync -->'
function send_to_all_except<T>(
   message: Message<T>,
   exclude: Player | { Player },
   data: T
)
```
