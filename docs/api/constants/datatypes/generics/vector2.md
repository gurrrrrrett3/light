# Vector2

[`#!luau light.vector2()`](./vector2.md) is a
<a href="https://create.roblox.com/docs/reference/engine/datatypes/Vector2" target="_blank">Roblox `Vector2`</a>
[Datatype](../index.md). This is not to be confused with [`#!luau light.vect2()`](./vect2.md), the luau
[Datatype](../index.md).

## `#!luau function light.vector2`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>'
function vector2(
    coord: Datatype<number>?
): Datatype<vector>
```

The `coord` parameter defines how each coordinate of [`#!luau light.vect2()`] will be encoded. If left unselected, it
will choose [`float32`](../numbers/floats.md) by default. Luau cannot represent floats beyond
[`f32`](../numbers/floats.md) in a Vector2, so using a [`f64`](../numbers/floats.md) for this would be wasteful.
