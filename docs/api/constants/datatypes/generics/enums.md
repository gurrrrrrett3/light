# Enums

An enum represents a set of possible values. Light's enums are generally only available in the
[Luau Inference Engine V2](https://devforum.roblox.com/t/new-type-solver-beta/3155804). Because of limitations with
string types, to get full type info from some enums you will need to [typecast](https://luau.org/typecheck#type-casts)
into a [string singleton type](https://luau.org/typecheck#singleton-types-aka-literal-types).

## `#!luau function enum` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function enum<Units>(
   units: { Units } & { string }
): Datatype<Units>
```

```luau
function enum<Name, T>(
   tag_name: Name
   datatypes: T & { [string]: Datatype }
): Datatype<T>
```

## Unit Enums

Unit enums are a set of possible strings, and can be accessed by calling `#!luau light.enum()` with one parameter.

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
