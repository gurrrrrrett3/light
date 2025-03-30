# Range

## `#!luau function range` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function range(
   minimum: number,
   maximum: number
): Datatype<number>
```

Returns a number [Datatype](../index.md) which clamps to the given range. Minimum can be negative. Represented in memory
as a static number with the minimum number of bytes for the full range.
