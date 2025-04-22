# Arrays

Arrays are quite simple.
<br>Arrays in light represent a contiguous list of "things", just like luau.
<br>An example of a contiguous array value would be `#!luau {"Hello", " ", "World!"}`.
It shouldn't have any `#!luau nil`s or "gaps", unless the [Datatype](../../index.md) provided is optional. If you want
holes in your array, use [Maps](./map.md), or [Optional Values](../optional.md).

You can define a valid array [Datatype](../../index.md) using a simple table, just like luau:

```luau
local some_array = { light.u8 }
```

Using the above table syntax will behave the same as the API shown below.

## `#!luau function light.datatypes.arr`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function arr<Item>(
    item: Datatype<Item>,
    length: Datatype<number>?
): Datatype<{T}>
```

`length` will default to [`#!luau datatypes.vlq(3)`](../vlq.md).

First argument can be any [Datatype](../../index.md). Second argument represents how the length is encoded. A couple of
ways you can use the optional `length` parameter:

```luau
local types = light.datatypes

local some_arr = types.arr( types.u8, types.range(0, 50) ) -- Array should have between 0 and 50 items.
```

```luau
local some_arr = types.arr( types.u8, types.literal(3) ) -- Array will always have three items.
```

```luau
local some_arr = types.arr( types.u8, types.u8 ) -- between 0-255 items.
```
