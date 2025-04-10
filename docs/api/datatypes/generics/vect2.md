# Vect2

[`#!luau light.vect2()`](./vect2.md) is a 2-wide constructed
<a href="https://luau.org/typecheck#builtin-types" target="_blank">luau `vector`</a>
[Datatype](../index.md). This is not to be confused with [`#!luau light.roblox_vect2()`](./roblox_vect2.md), the Roblox
[Datatype](../index.md).

## `#!luau function light.vect2`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function vect2(
    coord: Datatype<number>?
): Datatype<vector>
```

The `coord` parameter defines how each coordinate of [`#!luau light.vect2()`] will be encoded. If left unselected, it
will choose [`float32`](../numbers/floats.md) by default. Luau cannot represent floats beyond
[`f32`](../numbers/floats.md) in a vector, so using a [`f64`](../numbers/floats.md) for this would be wasteful.
