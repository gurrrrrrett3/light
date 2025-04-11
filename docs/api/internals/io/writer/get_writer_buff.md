# Get Buffer

## `#!luau function light.internal.get_writer_buff()`

```luau title=' <!-- client --> <!-- server --> <!-- shared --> <!-- sync --> <!-- internal -->'
function get_writer_buff(
    writer: DynamicWriter | HolyWriter
): buffer
```

Requires a valid [DynamicWriter](./index.md) or HolyWriter, returns its buffer.
