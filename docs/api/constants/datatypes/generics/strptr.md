# String Pointers

Behaves identically to [`#!luau light.str()`](./str.md), except the datatype is static, will not serialize duplicates,
and allocated per-stream.(1) This functionally means repeating the same "arbitrary" string multiple times in a frame has
massive performance gains.
{.annotate}

1. To learn more about how Light's String Pointers work, check out
   [The Internals Blog](../../../../blog/internals/string_pointers.md) on the topic.

## `#!luau function light.strptr`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>'
function strptr(
    length: Datatype<number>?
): Datatype<string>
```

`length` will default to [`#!luau light.vlq`](../numbers/uints.md).

First argument represents how the length is encoded. A couple of ways you can use the optional `length` parameter:

```luau
local some_str = light.strptr( light.u8 ) -- length between 0-255
```

```luau
local some_str = light.strptr( light.range(0, 50) ) -- String should be between length 0 and 50.
```

```luau
local some_str = light.strptr( light.literal(3) ) -- A string of length 3.
```
