# Cached

In light, you can use luau [arrays](./arr.md), [maps](./map.md), and [structs](./struct.md)
to define a message [Datatype](../index.md).

This API exists to cache the result of a [Datatype](../index.md). This will internally turn it into a numeric ID if it
isn't one already, rendering it unusable for anything other than ser/des and events. Events cache their
[Datatypes](../index.md) automatically, but this can be useful in conjunction with other features like
[Computed Datatypes](./computed.md).

## `#!luau function cached` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function cached<T>(
   value: Datatype<T>
): Datatype<T>
```

An example
<a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a> [Datatype](../index.md)
using [`#!luau light.cached()`](./cached.md) and [Computed Datatypes](./computed.md):

!!! dragons "Here be dragons, thou art forewarned."

    Computed datatypes are currently untested. You may run into unexpected behavior, edge cases, and more "fun" issues.
    Use them at your own risk.

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

!!! danger "You should never yield from within [`#!luau light.computed()`](./computed.md)'s lambda callback(s). This is considered undefined behavior."

!!! danger "You should never fire any event from within [`#!luau light.computed()`](./computed.md)'s lambda callback(s). This is considered undefined behavior."

!!! danger "[`#!luau light.computed()`](./computed.md) allows for recursive types. If you pass a self-referential table, serialization may hang forever."
