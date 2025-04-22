# Broadcast Unreliably

Identical behavior to [`#!luau light.broadcast()`](./broadcast.md), except the message is
<a href="https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent" target="_blank">unreliable</a>.
There is no size limit on light unreliable sending&mdash;however, sending
[instances](../../../datatypes/instances.md) /
[any](../../../datatypes/any.md) /
[checked](../../../datatypes/checked.md)
can cause it to exceed size thresholds and fail to send.

## `#!luau function light.broadcast_unreliably`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_unreliably<T>(
    message: Message<T>,
    to: { Player },
    data: T
): ()
```
