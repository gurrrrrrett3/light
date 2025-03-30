# Computed Datatypes

Computed [Datatypes](../index.md) are similar to [`#!luau light.literal()`](./literal.md) and
[`#!luau light.enum()`](./enums.md), except they are a function which returns a [Datatype](../index.md). These can be
dangerous, as they introduce conditionality to serialization if used incorrectly. They are mostly useful for
<a href="https://en.wikipedia.org/wiki/Linked_list" target="_blank">LinkedList</a>, and are best paired with
[Cached Datatypes](./cached.md).

## `#!luau function computed` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function computed<Output>(
   lambda: () -> (Datatype<Output>)
): Datatype<Output>
```

```luau
function computed<Output>(
   ser: (Output) -> (Datatype<Output>),
   des: (buff: buffer, buff_ptr: number): (Datatype<Output>, number)
): Datatype<Output>
```

It can also be called with two arguments as shown above for more precise control over logic. The number return is for
the new buffer byte ptr.

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
