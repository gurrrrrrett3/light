# Light's Bitpacks

## Serialization

To serialize a bitpack (boolean), I used incremental serialization with a table of "complete" data. When a bitpack is
completed, it is written to a buffer.

```luau
local increment = bitpack.increment

if bool then
   bitpack.current += increment
end

if increment < 2^32 then
   bitpack.increment = increment * 0b10
else
   bitpack.increment = 1

   local byte_ptr = bitpack.byte_ptr

   -- pretend i allocate 4 bytes on this line

   buffer.writeu32(bitpack.buff, byte_ptr, bitpack)
   byte_ptr += 4

   bitpack.current = 0
end
```

When "Finalizing" the bitpack, I check the size of the "increment" to figure out how many bytes are a remainder.

```luau
-- TODO
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

A luau value takes up 16 bytes of memory, so this table should occupy 31-33kb (16\*2^8\*8) of memory statically.
