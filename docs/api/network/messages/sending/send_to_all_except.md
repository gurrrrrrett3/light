# Send To All Except

Send To All Except is identical to calling [`#!luau light.send()`](./send.md) to all players except a player or
list of players.

## Important Note

[`#!luau light.send_to_all_except()`](./send_to_all_except.md) can generally take up more memory than
[`#!luau light.broadcast_to_all_except()`](./broadcast_to_all_except.md). Consider using the latter instead.(1)

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
   writing to a single stream and copying it to each player. This process is done through stream queries internally. To
   learn more about how Light dynamically groups streams for broadcasting, check out
   [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function send_to_all_except` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send_to_all_except<T>(
   message: Message<T>,
   exclude: Player | { Player },
   data: T
)
```
