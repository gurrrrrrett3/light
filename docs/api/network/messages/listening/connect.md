# Connect

Connect sets a callback for a given message when it is fired. A message can only have one connection, but you can always
connect your messages into a choice signal implementation. Callbacks can be removed with
[`#!luau light.disconnect()`](./disconnect.md). Message callbacks will be spawned asynchronously with thread reuse, to
create a non-yielding callback you can use [`#!luau light.connect_sync()`](./connect_sync.md)

!!! tip "This function can error if there is already a callback connected."

    Consider calling [`#!luau light.disconnect()`](./disconnect.md) first if this is an issue.

## `#!luau function light.connect`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span> <span class="md-tag md-tag-icon md-tag--errors">Errors</span>'
function connect<T>(
    message: Message<T>,
    callback: (T) -> ()
): ()
```

## `#!luau function light.connect`

```luau title='<span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span> <span class="md-tag md-tag-icon md-tag--errors">Errors</span>'
function connect<T>(
    message: Message<T>,
    callback: (Player, T) -> ()
): ()
```

Some example code using [`#!luau light.connect()`](./connect.md):

```luau
light.connect(messages.ping, function(player)
    print("pong!")
end)
```
