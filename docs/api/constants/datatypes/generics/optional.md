# Optionals

Optionals represent a value which could be `#!luau nil`.

## `#!luau function light.optional`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function optional<Inner>(
    inner: Datatype<Inner>
): Datatype<Inner?>
```
