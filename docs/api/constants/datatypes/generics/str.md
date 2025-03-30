# Strings

## Important Notice

Consider using [`#!luau light.strptr()`](./strptr.md) instead if you serialize a lot of the same "arbitrary" string.

## `#!luau function str` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function str(
   length: Datatype<number>?
): Datatype<string>
```

`length` will default to [`#!luau light.vlq`](../numbers/uints.md).

First argument represents how the length is encoded. A couple of ways you can use the optional `length` parameter:

```luau
local some_str = light.str( light.u8 ) -- length between 0-255
```

```luau
local some_str = light.str( light.range(0, 50) ) -- String should be between length 0 and 50.
```

```luau
local some_str = light.str( light.literal(3) ) -- A string of length 3.
```
