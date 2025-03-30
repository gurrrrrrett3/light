# Message

Message does the same thing as a [`#!luau light.container()`](./container.md), but doesn't force you to put it in a
string map.

## `#!luau function message` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span> <span class="md-tag md-tag-icon md-tag--async">Yielding</span>

```luau
function message<T>(
   name: string,
   template: Datatype<T>
): (Message<T>)
```

## `#!luau function message` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function message<T>(
   name: string,
   template: Datatype<T>
): (Message<T>)
```

`template` in both above samples should always be any valid [Datatype](../../../constants/datatypes/index.md).
This includes [Datatypes](../../../constants/datatypes/index.md) like arrays or maps being defined with luau tables like
`#!luau { light.u8 }` for example. Including [Datatypes](../../../constants/datatypes/index.md) defined with luau tables
in this API is by design, and meant to make defining messages easy.

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
