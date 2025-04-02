# Writer

Light exposes the ability to access its internal dynamic writers. These are wrappers/compatability for buffers. You can
create one with
[`#!luau light.internal.writer_from_buff()`](./writer_from_buff.md) or
[`#!luau light.internal.writer_from_size()`](./writer_from_size.md). You can write to them with
[`#!luau light.internal.input()`](../input.md) and read their data with
[`#!luau light.internal.output()`](../output.md).
