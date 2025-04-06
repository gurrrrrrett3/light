# Light's Intern Strings

[Intern Strings](../../api/datatypes/generics/internstr.md) are a relatively simple & lightweight datatype. They
serve to save resources on serialization/deserialization of repeated "arbitrary" strings. This is done by holding onto
an optional intern string "index" for each [stream](./dynamic_streams.md). This looks something like:

```luau title="serialize internstr"
local index = intern_str_match[string_data]
if not index then
    table.insert(intern_str_batch, string_data)
    index = #intern_str_batch
    str_ptr_index[string_data] = index
end
serialize_u16(index)
```

This means every intern string will be a "static" datatype, allowing strings to be
[reallocation merged](./holy/reallocation_merging.md). Using the same intern string in multiple places can also help
compression, and speed up [serialization/deserialization](./holy/index.md), because there is only one
readstring/writestring call for each unique interned string used in a [stream](./dynamic_streams.md).

In the future, this might be expanded to a broader system which holds onto interned strings persistently between frames.
