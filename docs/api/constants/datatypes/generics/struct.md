# Structs

Structs are quite simple. Structs in light are a fixed set of string keys and values.
Structs are not guaranteed to have the field order you defined them with, but they will be the same on client and
server. They can also be assumed to be the same for every struct with the exact same keys and values provided, even if
they're in different orders.

You can define a valid struct [Datatype](../index.md) using a simple table, just like luau:

```luau
local some_struct = {
    foo_field = light.u8,
    bar_field = light.i16,
    bar_field = light.str()
}
```

Using the above table syntax will behave the same as the API shown below.

## `#!luau function light.struct`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function struct<T>(
    map: T & { [string]: Datatype },
): Datatype<T>
```
