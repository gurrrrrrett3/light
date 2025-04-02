# Input

[`#!luau light.input()`](./input.md) is a function which allows you to use light's internal serialization on your own
[Writer](./writer/index.md).

## `#!luau function light.internal.input`

```luau title='<!-- errors --> <!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function input<T>(
    writer: DynamicWriter,
    type: Datatype<T>,
    data: T
)
```

You'll need to provide a valid [Writer](./writer/index.md), [Datatype](../../datatypes/index.md), and some
data to serialize. You can deserialize the data with [Output](./output.md).

!!! danger "Use correct data"

    If the data is incorrect, this function may error.

!!! danger "The buffer may change"

    After calling light.input, the buffer the writer contains may change because it had to be resized. Do not hold onto
    buffers when using this API, each time you call it assume the only safe way to get the buffer is with
    [`#!luau light.io.get_writer_buff()`](./writer/get_writer_buff.md).
