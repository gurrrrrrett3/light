# Set Byte Ptr

## `#!luau function light.internal.set_byte_ptr()`

```luau title=' <!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function set_byte_ptr(
    writer: DynamicWriter,
    byte_ptr: number
)
```

Requires a valid [DynamicWriter](./index.md), and a byte ptr.

!!! info 'No bounds check'
    No bounds check will be done on the byte ptr, it can be set to an area of the buffer that is out of bounds.
