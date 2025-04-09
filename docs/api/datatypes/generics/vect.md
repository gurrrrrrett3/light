# Vect

[`#!luau light.vect()`](./vect.md) is a 3-wide constructed
<a href="https://luau.org/typecheck#builtin-types" target="_blank">luau `vector`</a> [Datatype](../index.md).

## `#!luau function light.vect`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function vect(
    coord: Datatype<number>?
): Datatype<vector>
```

The `coord` parameter defines how each coordinate of [`#!luau light.vect()`](./vect.md) will be encoded. If left unselected, it
will choose [`float32`](../numbers/floats.md) by default. Luau cannot represent floats beyond'
[`f32`](../numbers/floats.md) in vectors, so using a [`f64`](../numbers/floats.md) for this would be wasteful.
