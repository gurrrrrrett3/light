# Send Unreliably To All Except

Send Unreliably To All Except is identical to calling [`#!luau light.send_unreliably()`](./send_unreliably.md) to all
players except a player or list of players.

## `#!luau function light.send_unreliably_to_all_except` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send_unreliably_to_all_except<T>(
    message: Message<T>,
    exclude: Player | { Player },
    data: T
): ()
```
