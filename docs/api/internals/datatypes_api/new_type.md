# New Type

## Overview

[`#!luau light.new_type()`](./new_type.md) lets you create a new [Datatype](../../datatypes/index.md) with completely
custom logic.

## `#!luau type SerFunction`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- internal -->'
export type SerFunction<T> = (
    writer: HolyWriter,
    byte_ptr: number --(1)!,
    value: T
) -> (number) --(2)!
```

1. A number ptr to the current serialization location in bytes.
2. Returns the new byte ptr.

## `#!luau type DesFunction`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- internal -->'
export type DesFunction<T> = (
    writer: HolyWriter,
    byte_ptr: number --(1)!
) -> (T, number)
```

1. A number ptr to the current deserialization location in bytes.

!!! tip "There are some pretty useful utilities for interacting with writers"
    [`#!luau light.internal.try_realloc()`](../io/writer/try_realloc.md), and
    [`#!luau light.internal.get_writer_buff()`](../io/writer/get_writer_buff.md) both work with `HolyWriter`.

Returns the decoded datatype, and the new byte ptr.

## `#!luau function light.internal.new_type()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function new_type<Input>(
    ser: SerFunction<Input>,
    des: DesFunction<Input>
): Datatype<Input>
```

You can define a new type with serialization and deserialization here.

## `#!luau function light.internal.new_type()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function new_type<Input>(
    static_size: number,
    static_ser: SerFunction<Input>,
    ser: SerFunction<Input>,
    des: DesFunction<Input>
): Datatype<Input>
```

You can define a static serialization function with this overload. `static_size` represents the number of bytes that
this datatype takes up / should allocate. This enables certain optimizations on your custom datatype.
`static_ser` here should NOT [allocate](../io/writer/try_realloc.md) to the Writer. Allocation in static functions is
handled by the caller. You should still increment `byte_ptr`.
