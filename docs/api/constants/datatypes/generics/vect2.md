# Vect2

[`#!luau light.vect2()`](./vect2.md) is a 2-wide constructed
<a href="https://luau.org/typecheck#builtin-types" target="_blank">luau `vector`</a>
[Datatype](../index.md). This is not to be confused with [`#!luau light.vector2()`](./vector2.md), the Roblox
[Datatype](../index.md).

## `#!luau function vect2` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function vect2(
   coord: Datatype<number>?
): Datatype<vector>
```

The `coord` parameter defines how each coordinate of [`#!luau light.vect2()`] will be encoded. If left unselected, it
will choose [`float32`](../numbers/floats.md) by default. Luau cannot represent floats beyond
[`f32`](../numbers/floats.md) in a vector, so using a [`f64`](../numbers/floats.md) for this would be wasteful.
