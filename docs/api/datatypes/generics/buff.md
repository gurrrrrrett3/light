# Buffers

## `#!luau function light.buff`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function buff(
    length: Datatype<number>?
): Datatype<buffer>
```

`length` will default to [`#!luau light.vlq()`](./vlq.md).

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
