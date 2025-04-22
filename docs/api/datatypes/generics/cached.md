# Cached

In light, you can use luau [arrays](./tables/arr.md), [maps](./tables/map.md), and [structs](./tables/struct.md)
to define a message [Datatype](../index.md).

This API exists to cache the result of a [Datatype](../index.md). This will internally turn it into a numeric ID if it
isn't one already, rendering it unusable for anything other than ser/des and messages. Messages cache their
[Datatypes](../index.md) automatically, but this can be useful in conjunction with other features like
[Computed Datatypes](./computed.md).

## `#!luau function light.cached`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function cached<T>(
   value: Datatype<T>
): Datatype<T>
```

An example
<a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a> [Datatype](../index.md)
using [`#!luau datatypes.cached()`](./cached.md) and [`#!luau datatypes.computed()`](./computed.md):

```luau title="linked_list.luau"
local types = datatypes

-- as a word of warning, you probably shouldn't give this a `head` field.
local function linkedlist<T>(value: Datatype<T>)
   local Datatype

   Datatype = types.cached {
      next = types.optional(types.computed(function()
         return Datatype
      end)),
      
      value = value
   }

   return Datatype
end

return linkedlist
```

!!! danger "You should never yield from within [`#!luau datatypes.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior.

!!! danger "You should never send a message from within [`#!luau datatypes.computed()`](./computed.md)'s lambda callback(s)."

    This is considered undefined behavior.

!!! danger "[`#!luau light.computed()`](./computed.md) allows for recursive types."

    If you pass a self-referential table, serialization may hang forever.
