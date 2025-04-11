# Make Number

Allows you to register a datatype as a number.

## `#!luau function light.internal.make_number()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function make_number(
    datatype: Datatype<number>
)
```

This will register the [Datatype](../../datatypes/index.md) as a number so that it can be used for dynamic lengths, etc.
Any scenario where you're required to have a number datatype for a generic for example, this could be useful.
