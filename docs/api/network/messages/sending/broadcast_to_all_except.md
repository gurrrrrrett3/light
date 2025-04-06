# Broadcast To All Except

Broadcast To All Except is identical to calling
[`#!luau light.broadcast()`](./broadcast.md) to all players except a player or list of players.

## `#!luau function light.broadcast_to_all_except`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_to_all_except<T>(
   message: Message<T>,
   exclude: Player | { Player },
   data: T
)
```
