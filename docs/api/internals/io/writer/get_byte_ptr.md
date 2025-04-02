# Get Byte Ptr

## `#!luau function light.internal.get_byte_ptr()`

```luau title=' <!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function get_byte_ptr(
    writer: DynamicWriter
): number
```

Requires a valid [DynamicWriter](./index.md), returns its current byte_ptr.
