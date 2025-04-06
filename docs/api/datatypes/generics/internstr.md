# Intern String

Behaves identically to [`#!luau light.str()`](./str.md), except the datatype will be "Interned."(1) This effectively means
repeating the same "arbitrary" string multiple times in a frame has significant performance and bandwidth improvements.
{.annotate}

1. To learn more about how Light's Intern Strings work, check out
   [The Internals Blog](../../../blog/internals/intern_strings.md) on the topic.

## `#!luau function light.internstr`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function internstr(
    length: Datatype<number>?
): Datatype<string>
```

`length` will default to [`#!luau light.vlq()`](./vlq.md).

First argument represents how the length is encoded. A couple of ways you can use the optional `length` parameter:

```luau
local some_str = light.internstr( light.u8 ) -- length between 0-255
```

```luau
local some_str = light.internstr( light.range(0, 50) ) -- String should be between length 0 and 50.
```

```luau
local some_str = light.internstr( light.literal(3) ) -- A string of length 3.
```
