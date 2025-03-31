# Maps

Maps (a.k.a. Dictionaries) are quite simple.
<br>Maps in light represent the luau type: `#!luau { [Key]: Value }`.

You can define a valid map Datatype using a simple table, just like luau:

```luau
local some_map = { [light.str()] = light.u8 }
```

## `#!luau function light.map`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function map<Key, Value>(
    key: Datatype<Key>,
    value: Datatype<Value>,
    length: Datatype<number>?
): Datatype<{ [Key]: Value }>
```

`length` will default to [`#!luau light.vlq`](../numbers/uints.md).

First two arguments can be any [Datatype](../index.md). Third argument represents how the length is encoded. A couple of ways you can use
the optional `length` parameter:

```luau
local some_map = light.map( light.str(), light.u8, light.u8 ) -- between 0-255 keys.
```

```luau
local some_map = light.map( light.str(), light.u8, light.range(0, 50) ) -- Map should have between 0 and 50 keys.
```

```luau
local some_map = light.map( light.str(), light.u8, light.literal(3) ) -- Map will always have three keys.
```
