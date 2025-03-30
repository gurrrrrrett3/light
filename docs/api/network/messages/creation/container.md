# Containers

Containers are the recommended and easy way to group together messages in light by name. These function similarly to
ByteNet's namespaces, if you're familiar.

Container inputs should be a map of string message-names to any valid [Datatype](../../../constants/datatypes/index.md).
This includes [Datatypes](../../../constants/datatypes/index.md) like arrays or maps being defined with luau tables like
`#!luau { light.u8 }` for example. Including [Datatypes](../../../constants/datatypes/index.md) defined with luau tables
in this API is by design, and meant to make defining messages easy.

If messages inside are already synchronized beforehand, the container will not yield.
The server defines the messages immediately, so `#!luau container {}` will never yield on the server.

## `#!luau function container` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span> <span class="md-tag md-tag-icon md-tag--async">Yielding</span>

```luau
function container<T>(
   message_names: T & { [string]: Datatype },
   namespace: string?
): (T)
```

## `#!luau function container` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function container<T>(
   message_names: T & { [string]: Datatype },
   namespace: string?
): (T)
```

Some example code using containers:

```luau
local light = require(ReplicatedStorage.light).shared

return light.container({
   ping = light.literal(nil),
}, "some-cool-namespace")
```

You can replicate the above code 1:1 with [`#!luau light.message()`](./message.md)
