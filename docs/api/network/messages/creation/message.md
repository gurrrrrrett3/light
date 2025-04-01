# Message

Message does the same thing as a [`#!luau light.container()`](./container.md), but doesn't force you to put it in a
string map.

## `#!luau function light.message`

```luau title='<!-- b:client --> <!-- b:shared --> <!-- b:sync --> <!-- b:async -->'
function message<T>(
    name: string,
    template: Datatype<T>
): (Message<T>)
```

## `#!luau function light.message`

```luau title='<!-- b:server --> <!-- b:sync -->'
function message<T>(
    name: string,
    template: Datatype<T>
): (Message<T>)
```

`template` in both above samples should always be any valid [Datatype](../../../constants/datatypes/index.md).
This includes [Datatypes](../../../constants/datatypes/index.md) like arrays or maps that are defined with luau tables.
I.e., `#!luau { light.u8 }`

If you wanted to recreate the behavior of this code:

```luau
return light.container({
    ping = light.literal(nil),
})
```

You can do that with raw message api:

```luau
return {
    ping = light.message("ping", light.literal(nil))
}
```
