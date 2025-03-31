# Enums

An enum represents a set of possible values. Because of limitations with string types, to get full type info from some
enums you will need to [typecast](https://luau.org/typecheck#type-casts) into a
[string singleton type](https://luau.org/typecheck#singleton-types-aka-literal-types).

## `#!luau function enum` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function enum<Units>(
    units: { Units }
): Datatype<Units>
```

!!!info "Light's tagged enums are generally only available in the [Luau Inference Engine V2](https://devforum.roblox.com/t/new-type-solver-beta/3155804). Unit enums do not have this restriction."

```luau
function enum<TagName, T>(
    tag_name: TagName & string
    datatypes: { [string]: Datatype<T> }
): Datatype<T & { [TagName]: string }>
```

## Unit Enums

Unit enums are a set of possible literal values, and can be accessed by calling `#!luau light.enum()` with one
parameter.

!!! info "It's worth noting that Light's unit enums can also hold information for things other than text if needbe."

!!! danger "Encoding will not do a deep equality check."

    If a value isn't literally an option in the unit enum, it will error when you try to encode.

```luau
local state = light.enum({
    "Starting" :: "Starting",
    "Started" :: "Started",
    "Stopping" :: "Stopping",
    "Stopped" :: "Stopped"
})
```

## Tagged Enums

Tagged enums are a set of structs, with the first parameter for an identifier name. Here's an example `mouse_event`:

```luau
local click_button = light.enum({
    "Left" :: "Left",
    "Right" :: "Right",
    "Middle" :: "Middle"
})

local mouse_event = light.enum("type", {
    move = {
        delta = light.vect2(),
        position = light.vect2()
    },
    drag = {
        delta = light.vect2(),
        position = light.vect2()
    },
    click = {
        click_button = click_button,
        position = light.vect2()
    }
})
```
