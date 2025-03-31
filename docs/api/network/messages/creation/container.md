# Containers

Containers are the recommended and easy way to group together messages in light by name. These function similarly to
ByteNet's namespaces, if you're familiar.

Container inputs should be a map of string message-names to any valid [Datatype](../../../constants/datatypes/index.md).
This includes [Datatypes](../../../constants/datatypes/index.md) like arrays or maps being defined with luau tables like
`#!luau { light.u8 }` for example. Including [Datatypes](../../../constants/datatypes/index.md) defined with luau tables
in this API is by design, and meant to make defining messages easy.

!!! info "If messages inside are already synchronized beforehand, the container will not yield."

    The server defines the messages immediately, so `#!luau container {...}` will never yield on the server.

## `#!luau function light.container`

```luau title='<!-- b:client --> <!-- b:shared --> <!-- b:sync --> <!-- b:async -->'
function container<T>(
    message_names: T & { [string]: Datatype },
    namespace: string?
): (T)
```

## `#!luau function light.container`

```luau title='<!-- b:server --> <!-- b:sync -->'
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

!!! tip "You can replicate the above code 1:1 with [`#!luau light.message()`](./message.md)"
