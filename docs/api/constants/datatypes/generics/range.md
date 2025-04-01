# Range

## `#!luau function light.range`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function range(
    minimum: number,
    maximum: number
): Datatype<number>
```

Returns a number [Datatype](../index.md) which clamps to the given range.(1) Minimum can be negative. The range clamping is fully validated.
{.annotate}

1. Represented in memory as a static uint with the minimum number of bytes for the full range. Writes to the buffer as `#!luau math.clamp(input, minimum, maximum) - minimum`.
