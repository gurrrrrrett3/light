# Make Nilable

Allows you to register a datatype as nilable.

## `#!luau function light.internal.make_nilable()`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- experimental --> <!-- sync --> <!-- internal -->'
function make_nilable(
    datatype: Datatype<number>
)
```

This will register the [Datatype](../../datatypes/index.md) as nilable, meaning it could or always does return nil.
I.e., you're re-implementing an optional datatype.
