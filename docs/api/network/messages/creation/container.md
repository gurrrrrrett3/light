# Containers

Containers are the recommended and easy way to group together messages in light by name.

Container inputs should be a map of string message-names to any valid [Datatype](../../../datatypes/index.md).
This includes [Datatypes](../../../datatypes/index.md) like arrays or maps that are defined with luau tables.
I.e., `#!luau { light.u8 }`

!!! info "If messages inside are already synchronized beforehand, the container will not yield."

    The server defines the messages immediately, so `#!luau container {...}` will never yield on the server.

## `#!luau function light.container`

```luau title='<!-- client --> <!-- shared --> <!-- sync --> <!-- async -->'
function container<T>(
    message_names: T & { [string]: Datatype },
    namespace: string? --(1)!
): (T)
```

1. The "namespace" parameter exists to allow you to have multiple containers with overlapping message names.

## `#!luau function light.container`

```luau title='<!-- server --> <!-- sync -->'
function container<T>(
    message_names: T & { [string]: Datatype },
    namespace: string? --(1)!
): (T)
```

1. The "namespace" parameter exists to allow you to have multiple containers with overlapping message names.

Some example code using containers:

```luau
local light = require(ReplicatedStorage.light).shared

return light.container({
    ping = light.literal(nil),
}, "some-cool-namespace")
```

!!! tip "You can replicate the above code 1:1 with [`#!luau light.message()`](./message.md)"
