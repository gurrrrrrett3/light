# Structs

Structs are quite simple.
<br>Structs in light are a fixed set of string keys and values.
<br>Structs are not guaranteed to have the field order you defined them with, but ordering is identical on client and
server. They can also be assumed to be the same order for every struct with the exact same keys and values provided,
even if they're provided in different orders.

You can define a valid struct [Datatype](../../index.md) using a simple table, just like luau:

```luau
local some_struct = {
    foo_field = light.u8,
    bar_field = light.i16,
    baz_field = light.str()
}
```

Using the above table syntax will behave the same as the API shown below.

## `#!luau function light.struct`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function struct<T>(
    map: T & { [string]: Datatype },
): Datatype<T>
```
