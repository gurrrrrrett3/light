# Strings

## `#!luau function light.str`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function str(
    length: Datatype<number>?
): Datatype<string>
```

!!!tip "[`#!luau light.strptr()`](./strptr.md) can have better performance if you serialize a lot of the same "arbitrary" string."

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
