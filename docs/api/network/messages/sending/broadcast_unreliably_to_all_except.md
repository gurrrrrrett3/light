# Broadcast Unreliably To All Except

Identical behavior to [`#!luau light.broadcast_to_all_except()`](./broadcast_to_all_except.md), except the message is
<a href="https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent" target="_blank">unreliable</a>.
There is no size limit on light unreliable sending; However, sending
[instances](../../../datatypes/instance.md) /
[unknowns](../../../datatypes/unknown.md) can cause it to exceed size thresholds and fail to send.

## `#!luau function light.broadcast_unreliably_to_all_except`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_unreliably_to_all_except<T>(
    message: Message<T>,
    except: Player | { Player }
    data: T
): ()
```
