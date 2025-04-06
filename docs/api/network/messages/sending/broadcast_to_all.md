# Broadcast To All

[`#!luau light.broadcast_to_all()`](./broadcast_to_all.md) sends a message to all players who are ingame when the
network batch is stepped.

## `#!luau function light.broadcast_to_all`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_to_all<T>(
   message: Message<T>,
   data: T
)
```
