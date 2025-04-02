# Message

Message does the same thing as a [`#!luau light.container()`](./container.md), but doesn't force you to put it in a
string map.

## `#!luau function light.message`

```luau title='<!-- client --> <!-- shared --> <!-- sync --> <!-- async -->'
function message<T>(
    name: string,
    template: Datatype<T>
): (Message<T>)
```

## `#!luau function light.message`

```luau title='<!-- server --> <!-- sync -->'
function message<T>(
    name: string,
    template: Datatype<T>
): (Message<T>)
```

`template` in both above samples should always be any valid [Datatype](../../../datatypes/index.md).
This includes [Datatypes](../../../datatypes/index.md) like arrays or maps that are defined with luau tables.
I.e., `#!luau { light.u8 }`

If you wanted to recreate the behavior of this code that uses containers:

```luau
return light.container({
    foo = { light.u8 }, -- send a table of u8 numbers
})
```

You can do that with raw message api:

```luau
return {
    foo = light.message("ping", { light.u8 })
}
```
