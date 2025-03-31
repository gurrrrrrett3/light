# Send Unreliably

Identical behavior to [`#!luau light.send()`](./send.md), except the event is
<a href="https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent" target="_blank">unreliable</a>.
There is no size limit on light unreliable sending, however sending
[instances](../../../constants/datatypes/instance.md) /
[unknowns](../../../constants/datatypes/unknown.md) can cause it to fail.

## `#!luau function light.send_unreliably` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send_unreliably<T>(
    message: Message<T>,
    data: T
): ()
```

## `#!luau function light.send_unreliably` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send_unreliably<T>(
    message: Message<T>,
    to: Player | { Player },
    data: T
): ()
```
