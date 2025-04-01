# Send Unreliably To All Except

Send Unreliably To All Except is identical to calling [`#!luau light.send_unreliably()`](./send_unreliably.md) to all
players except a player or list of players.

## `#!luau function light.send_unreliably_to_all_except`

```luau title='<!-- server --> <!-- sync -->'
function send_unreliably_to_all_except<T>(
    message: Message<T>,
    exclude: Player | { Player },
    data: T
): ()
```
