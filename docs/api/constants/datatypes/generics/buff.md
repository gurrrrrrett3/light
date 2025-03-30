# Buffers

## `#!luau function buff` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function buff(
   length: Datatype<number>?
): Datatype<buffer>
```

`length` will default to [`#!luau light.vlq`](../numbers/uints.md).

First argument represents how the length is encoded. A couple of ways you can use the optional `length` parameter:

```luau
local some_buff = light.buff( light.u8 ) -- Buffer between 0-255 bytes
```

```luau
local some_buff = light.buff( light.range(0, 50) ) -- Buffer should be between 0 and 50 bytes.
```

```luau
local some_buff = light.buff( light.literal(3) ) -- A buffer with 3 bytes.
```
