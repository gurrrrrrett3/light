# Broadcast Unreliably To All

Identical behavior to [`#!luau light.broadcast_to_all()`](./broadcast_to_all.md), except the message is
<a href="https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent" target="_blank">unreliable</a>.
There is no size limit on light unreliable sending &mdash; however, sending
[instances](../../../datatypes/instance.md) /
[unknowns](../../../datatypes/unknown.md) can cause it to exceed size thresholds and fail to send.

## `#!luau function light.broadcast_unreliably_to_all`

```luau title='<!-- server --> <!-- sync -->'
function broadcast_unreliably_to_all<T>(
    message: Message<T>,
    data: T
): ()
```
