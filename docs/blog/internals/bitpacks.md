# Light's Bitpacks

```luau title='bitpack_type.luau'
type Bitpacker = {
    arr: {u32},
    current: typeof(0b0) & u32
    increment: typeof(0b1) & u32
}
```

## Serialization

To serialize a bitpack (boolean), I used incremental serialization with a table of "complete" data.

```luau title='write_bitpack.luau'
local increment = bitpack.increment

if bool then
   bitpack.current += increment
end

if increment <= 2^32 then
   bitpack.increment = increment * 0b10
else
   bitpack.increment = 1

   table.insert(bitpack.array, bitpack.current)

   bitpack.current = 0
end
```

When "Finalizing" the bitpack to an allocation, I multiply the array by u32, and check the size of the `increment` to figure out how many bytes are in the "in-progress" pack.

```luau
function bitpack_arr_bytes(bitpack: Bitpacker): number
    local arr_length = bitpack.arr / 2
    return arr_length * U32_SIZE
end
function bitpack_remainder_bytes(bitpack: Bitpacker): number
    -- divide by 2 since increment represents the next number to add
    local current_size = bitpack.increment / 2
    local num_bits = math.log(current_size, 2)
    local num_bytes = math.ceil(num_bits / 8)
    return num_bytes
end
function bitpack_bytes(bitpack: Bitpacker): number
    local arr_bytes = bitpack_arr_bytes(bitpack)
    local remainder_bytes = bitpack_remainder_bytes(bitpack)
    return arr_bytes + remainder_bytes
end
```

## Deserialization

To deserialize a table of bitpacks (booleans), I used a constant lookup table moving 8 booleans at a time to an output
bool table with [`#!luau table.move()`](https://create.roblox.com/docs/reference/engine/libraries/table#move). Here's
how the constant lookup table is generated:

```luau
local constant_bitfield_lookup: { boolean }
do
    constant_bitfield_lookup = table.create( (2 ^ 8) * 8 )

    local index
    for encoded = 0, ((2 ^ 8) * 8) - 1 do
        index = encoded * 8

        for bit = 1, 8 do
            constant_bitfield_lookup[index + bit] = encoded % 2
            encoded //= 2
        end
    end
end
```

A luau value takes up 16 bytes of memory, so this table should occupy 31-33kb (16\*2^8\*8) of memory statically. For
reference &mdash; last I checked, this is a bit less than roblox's voice chat ui assets take up.
