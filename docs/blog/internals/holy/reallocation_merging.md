# Holy's Reallocation Merging

## Summary

Merge together consecutive reallocations of datatypes during ser/des to prevent multiple reallocations and allow special
cases to skip reallocating logic in datatypes.

## Motivation

One of the biggest performance costs when it comes to serializing our events is reallocations. Pretty much every
datatype we write to a buffer has some form of reallocation. But, when we use a lot of these datatypes consecutively and
we know how big they are beforehand, we can squash those allocations together and write a version of that datatype
without any of the spooky logic included for reallocating. Other programs like
<a href="https://github.com/1Axen/blink" target="_blank">Blink</a>, and
<a href="https://github.com/Data-Oriented-House/Squash" target="_blank">Squash</a> already implement this.

## Design

Holy (and by extension, light) implements reallocation merging by storing the following "extra" data about its ser/des
types:

```luau
local static_size: { [Shape]: number? }
local static_ser: { [Shape]: SerFunction }
```

`#!luau local static_ser` is an extra serialization function for types with a fixed size in bytes. The
`#!luau local static_ser` [SerFunction](./index.md)s won't try to resize any buffers, they serialize their raw data with
no extra logic. Essentially, calling a `#!luau local static_ser` [SerFunction](./index.md) internally means whoever is
calling the function will take care of allocations. In practice, Holy is smart enough to dynamically create closures
based on whether a generic input is static. [Structs](../../../api/constants/datatypes/generics/struct.md) will
merge all static fields first. If all fields of a struct are static, the struct itself becomes a static type with a size
and `#!luau local static_ser` [SerFunction](./index.md). [Arrays](../../../api/constants/datatypes/generics/arr.md), and
[Maps](../../../api/constants/datatypes/generics/map.md) with Static Parameters will generate serde
[special-cases](./special_cased_generics.md) to allocate the product of the data length with the static size of each
item.
