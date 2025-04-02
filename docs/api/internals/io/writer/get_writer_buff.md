# Get Buffer

## `#!luau function light.internal.get_writer_buff()`

```luau title=' <!-- client --> <!-- server --> <!-- shared --> <!-- sync --> <!-- internal -->'
function get_writer_buff(
    writer: Writer | DynamicWriter
): buffer
```

Requires a valid [DynamicWriter](./index.md) or Writer, returns its buffer.

!!! tip

    <!-- experimental --> You can do the same thing by indexing `writer[1]`. This is **not recommended** and the
    behavior could break in future updates.
