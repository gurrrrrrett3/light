# DynamicWriter From Size

## `#!luau function light.internal.writer_from_size()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function writer_from_size(
    buff: buffer
): DynamicWriter
```

Allocates a buffer and returns a valid [Writer](./index.md) from a size.
