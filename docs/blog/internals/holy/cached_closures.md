# Cached Closures

Caching closures is a basic optimization
[Holy](https://github.com/hardlyardi/holy) and
[Squash](https://github.com/Data-Oriented-House/Squash)
do to "generic" [Datatypes](../../../api/constants/datatypes/index.md)
([Datatypes](../../../api/constants/datatypes/index.md) which take in a parameter). It works generally by storing an
"input" index based on parameters, and saving the result shape ID. This caching system is important to make sure memory
usage stays low (by not creating new serialization/deserialization functions), and to prevent ser/de IDs from getting
out of hand in size. As an example, here's the [vect caching](../../../api/constants/datatypes/generics/vect.md)

```luau
local vect3_shape_cache = {} :: { [Shape<any>]: Shape<any> }
local function vect(xyz_shape: Shape<number>?): Shape<vector>
   local coord_shape = xyz_shape or f32
   if not number_types_map[coord_shape] then
      error(debug.traceback("holy.vector must take in a number"))
   end

   local cached = vect3_shape_cache[coord_shape]
   if cached then return cached end

   local vector_shape = new_id()
   vect3_shape_cache[coord_shape] = vector_shape
end
```

Although caching is already done automatically for most things, there is an API for
[caching a datatype instantly as a numeric ID](../../../api/constants/datatypes/generics/cached.md).
