# Vect

[`#!luau light.vect()`](./vect.md) is a 3-wide constructed
<a href="https://luau.org/typecheck#builtin-types" target="_blank">luau `vector`</a> [Datatype](../index.md).

## `#!luau function vect` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function vect(
    coord: Datatype<number>?
): Datatype<vector>
```

The `coord` parameter defines how each coordinate of [`#!luau light.vect()`] will be encoded. If left unselected, it
will choose [`float32`](../numbers/floats.md) by default. Luau cannot represent floats beyond'
[`f32`](../numbers/floats.md) in vectors, so using a [`f64`](../numbers/floats.md) for this would be wasteful.
