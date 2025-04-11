# Dynamic Writer

!!! dragons "Here be dragons, thou art forewarned."
    I'm aware some of the documentation in the [DynamicWriter](./index.md) &
    [Datatypes API](../../datatypes_api/index.md) is slightly confusing at the moment. It's something that'll be
    improved as time goes on.

!!! danger "NOT to be confused with `HolyWriter`"
    `HolyWriter` is different. `HolyWriter` is what you'll be dealing with if you use
    [Datatypes API](../../datatypes_api/index.md).

Light exposes the ability to access its internal dynamic writers. These are wrappers/compatability for buffers. You can
create one with
[`#!luau light.internal.writer_from_buff()`](./writer_from_buff.md) or
[`#!luau light.internal.writer_from_size()`](./writer_from_size.md). You can write to them with
[`#!luau light.internal.input()`](../input.md) and read their data with
[`#!luau light.internal.output()`](../output.md).
