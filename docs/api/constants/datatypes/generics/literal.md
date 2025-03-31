# Literals

Literals represent a value which is "literally" something. Pass in any valid luau value, and it'll be seen as a constant
costing zero bytes.

## `#!luau function light.literal`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function literal<Value>(
    value: Value
): Datatype<Value>
```
