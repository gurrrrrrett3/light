# Try Realloc

## `#!luau function light.internal.try_realloc()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function try_realloc(
    writer: Writer | DynamicWriter,
    target_ptr: number
)
```

Will make sure the Writer has the amount of space specified.

!!! danger "The buffer may change"

    After calling [`#!luau light.internal.try_realloc()`](./try_realloc.md), the buffer the writer contains may change
    because it had to be resized. Do not hold onto buffers when using this API, each time you call it assume the only
    safe way to get the buffer is with [`#!luau light.io.get_writer_buff()`](./get_writer_buff.md).
