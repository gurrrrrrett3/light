# Computed Datatypes

Computed [Datatypes](../index.md) are similar to [`#!luau light.literal()`](./literal.md) and
[`#!luau light.enum()`](./enums.md), except they are a function which returns a [Datatype](../index.md). They are mostly
useful for <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a>, and are best paired with
[Cached Datatypes](./cached.md).

!!! danger "Introducing external conditionality to serialization / deserialization can be dangerous. Please be careful."

!!! danger "You should never yield from within [`#!luau light.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior."

!!! danger "You should never fire any event from within [`#!luau light.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior."

!!! danger "[`#!luau light.computed()`](./computed.md) allows for recursive types."

    If you pass a self-referential table, serialization may hang forever."

!!! dragons "Here be dragons, thou art forewarned."

    Computed datatypes are currently untested. You may run into unexpected behavior, edge cases, and more "fun" issues.
    Use them at your own risk.

## `#!luau function light.computed`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:experimental --> <!-- b:sync -->'
function computed<Output>(
    lambda: () -> (Datatype<Output>)
): Datatype<Output>
```

```luau
function computed<Output>(
    ser: (
        writer: Writer,
        byte_ptr: number,
        data: any
    ) -> (number),
    des: (
        writer: Writer,
        byte_ptr: number
    ) -> (Output, number)
): Datatype<Output>
```

!!! info "[`#!luau light.computed()`](./computed.md) can also be called with two arguments as shown above."

    You can utilize this to create a custom type, returning a number for the new buffer byte ptr. If used correctly,
    you could use this to re-implement custom dynamic types such as [Enums](./enums.md). This feature is <!-- b:experimental -->

An example <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a> [Datatype](../index.md)
using [`#!luau light.computed()`](./computed.md) and [Cached Datatypes](./cached.md):

```luau title="linked_list.luau"
-- as a word of warning, you probably shouldn't give this a `head` field.
local function linkedlist<T>(value: Datatype<T>)
    local Datatype

    Datatype = light.cached {
        next = light.optional(light.computed(function()
            return Datatype
        end)),
        
        value = value
    }
 
    return Datatype
end

return linkedlist
```
