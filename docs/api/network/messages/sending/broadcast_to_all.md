# Broadcast To All

Broadcast To All is very similar to [`#!luau light.send_to_all()`](./send_to_all.md) with a few key differences.
Broadcasting to a group of players can impact ordering in ways that [`#!luau light.send()`](./send_to_all.md) will not.
[`#!luau light.broadcast_to_all()`](./broadcast_to_all.md) also typically has a lower memory impact.(1)
{.annotate}

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
    writing to a single stream and copying it to each player. This process is done through stream queries internally. To
    learn more about how Light dynamically groups streams for broadcasting, check out
    [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function light.broadcast_to_all`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_to_all<T>(
   message: Message<T>,
   data: T
)
```
