# Broadcast

Broadcasting is very similar to [`#!luau light.send()`](./send.md) with a few key differences. The biggest of which is
that broadcast can **only** be run on the server. Broadcasting to a group of players can also impact ordering in ways
that [`#!luau light.send()`](./send.md) will not. [`#!luau light.broadcast()`](./broadcast.md) also typically has a
lower memory impact.(1)
{.annotate}

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
   writing to a single stream and copying it to each player. This process is done through stream queries internally. To
   learn more about how Light dynamically groups streams for broadcasting, check out
   [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function broadcast` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function broadcast<T>(
   message: Message<T>,
   to: Player | { Player },
   data: T
)
```
