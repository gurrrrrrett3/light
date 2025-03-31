# Optionals

Optionals represent a value which could be `#!luau nil`.

## `#!luau function light.optional`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function optional<Inner>(
    inner: Datatype<Inner>
): Datatype<Inner?>
```
