# Broadcast To All Except

Broadcast To All Except is identical to calling
[`#!luau light.broadcast()`](./broadcast.md) to all players except a player or list of players.
Broadcast To All Except is very similar to [`#!luau light.send_to_all_except()`](./send_to_all.md) with a few key
differences. Broadcasting to a group of players can impact ordering in ways that
[`#!luau light.send_to_all()`](./send_to_all.md) will not.
[`#!luau light.broadcast_to_all_except()`](./broadcast_to_all_except.md) also typically has a lower memory impact.(1)
{.annotate}

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
   writing to a single stream and copying it to each player. This process is done through stream queries internally. To
   learn more about how Light dynamically groups streams for broadcasting, check out
   [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function broadcast_to_all_except` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function broadcast_to_all_except<T>(
   message: Message<T>,
   exclude: Player | { Player },
   data: T
)
```
