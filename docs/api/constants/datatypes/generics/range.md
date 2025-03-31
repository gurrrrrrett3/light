# Range

## `#!luau function light.range`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function range(
    minimum: number,
    maximum: number
): Datatype<number>
```

Returns a number [Datatype](../index.md) which clamps to the given range. Minimum can be negative. Represented in memory
as a static number with the minimum number of bytes for the full range.
