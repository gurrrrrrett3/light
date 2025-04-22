# Computed Datatypes

Computed [Datatypes](../index.md) are similar to [`#!luau light.literal()`](./literal.md) and
[`#!luau light.enum()`](./enums.md), except they are a function which returns a [Datatype](../index.md). They are mostly
useful for <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a>, and are best paired with
[Cached Datatypes](./cached.md).

!!! danger "Introducing external conditionality to serialization / deserialization can be dangerous. Please be careful."

!!! danger "You should never yield from within [`#!luau datatypes.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior.

!!! danger "You should never send any message from within [`#!luau datatypes.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior.

!!! danger "[`#!luau datatypes.computed()`](./computed.md) allows for recursive types."

    If you pass a self-referential table, serialization may hang forever.

## `#!luau function light.datatypes.computed`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync -->'
function computed<Output>(
    lambda: () -> (Datatype<Output>)
): Datatype<Output>
```

An example <a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a> [Datatype](../index.md)
using [`#!luau datatypes.computed()`](./computed.md) and [Cached Datatypes](./cached.md):

```luau title="linked_list.luau"
local ty = light.datatypes

-- as a word of warning, you probably shouldn't give this a `head` field.
local function linkedlist<T>(value: Datatype<T>)
    local Datatype

    Datatype = ty.cached {
        next = ty.optional(ty.computed(function()
            return Datatype
        end)),
        
        value = value
    }
 
    return Datatype
end

return linkedlist
```
