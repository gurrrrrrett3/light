# Cached Closures

Caching closures is a basic optimization
[Holy](https://github.com/hardlyardi/holy) and
[Squash](https://github.com/Data-Oriented-House/Squash)
to work with "generic" [Datatypes](../../../api/datatypes/index.md).(1) It works generally by storing an
"input" index based on parameters, and saving the result shape ID. This caching system is important to make sure memory
usage stays low (by not creating new serialization/deserialization functions), and to prevent ser/de IDs from getting
out of hand in size. As an example, here's the [vect3 caching](../../../api/datatypes/generics/vect3.md) src:
{.annotate}

1. Generic [Datatypes](../../../api/datatypes/index.md) are
functions which take in [Datatype(s)](../../../api/datatypes/index.md) and return a
[Datatype](../../../api/datatypes/index.md)

```luau
local vect3_shape_cache = {} :: { [Shape<any>]: Shape<any> } --(1)!
local function vect3(xyz_shape: Shape<number>?): Shape<vector>
    local coord_shape = xyz_shape or f32
    if not number_types_map[coord_shape] then
        error(debug.traceback("holy.vector must take in a number"))
    end

    local cached = vect3_shape_cache[coord_shape]
    if cached then return cached end

    local vector_shape = new_id()
    vect3_shape_cache[coord_shape] = vector_shape --(2)!

    -- ...
end
```

1. Store the input types which have generated a closure recently, as well as what id the input maps to
2. Cache the input type with the created vector id

Although caching is already done automatically for most things, there is an API for
[caching a datatype instantly as a numeric ID](../../../api/datatypes/generics/cached.md).
