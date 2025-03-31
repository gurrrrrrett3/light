# Light's String Pointers

[String pointers](../../api/constants/datatypes/generics/strptr.md) are a relatively simple & lightweight datatype. They
serve to save resources on serialization/deserialization of repeated "arbitrary" strings. This is done by holding onto
an optional string pointer "index" for each [stream](./dynamic_streams.md). This looks something like:

```luau title="serialize strptr"
local value = str_ptr_index[string_data]
if not value then
    table.insert(str_ptr_batch, string_data)
    value = #str_ptr_batch
    str_ptr_index[string_data] = value
end
serialize_u16(value)
```

This means every string pointer will be a "static" datatype, allowing strings used together to be
[reallocation merged](./holy/reallocation_merging.md). In addition to this, using the same string in multiple places can
benefit compression, and speed up [serialization/deserialization](./holy/index.md), because there is only one
readstring/writestring call for each unique string with a pointer used in a [stream](./dynamic_streams.md).
