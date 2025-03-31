# Enums

An enum represents a set of possible values. Because of limitations with string types, to get full type info from some
enums you will need to [typecast](https://luau.org/typecheck#type-casts) into a
[string singleton type](https://luau.org/typecheck#singleton-types-aka-literal-types).

## `#!luau function enum` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function enum<Identifier>(
    identifiers: { Identifier }
): Datatype<Identifier>
```

!!! tip "Light's tagged enums are generally only available in the [Luau Inference Engine V2](https://devforum.roblox.com/t/new-type-solver-beta/3155804)."

    Identifier enums do not have this restriction.

```luau
function enum<IdentifierName, Identifier, T>(
    tag_name: IdentifierName & string
    datatypes: { [Identifier]: Datatype<T> }
): Datatype<T & { [IdentifierName]: Identifier }>
```

## Identifier Enums

Identifier enums are a set of possible literal values, and can be accessed by calling `#!luau light.enum()` with one
parameter.

```luau
local state = light.enum({
    "Starting" :: "Starting",
    "Started" :: "Started",
    "Stopping" :: "Stopping",
    "Stopped" :: "Stopped",
})
```

!!! info "It's worth noting that Light's identifier/tagged enums can also hold non-text identifiers if needbe."

!!! danger "Identifier encoding will not do a deep equality check."

    If an identifier isn't "literally" an option in the enum, it will error when you try to encode.

Another way you could use an Identifier Enum, this time with instances:

```luau
local assets = ReplicatedStorage:WaitForChild("assets")

local item_model = light.enum({
    -- swords
    assets:WaitForChild("stone_sword"),
    assets:WaitForChild("iron_sword"),
    assets:WaitForChild("gold_sword"),
    -- potions
    assets:WaitForChild("health_potion"),
    assets:WaitForChild("invisibility_potion"),
})

return light.container({
    broadcast_player_equipped_item = {
        player = light.str(light.range(0, 20)),
        item_model = item_model
    }
})
```

## Tagged Enums

Tagged enums are a set of structs, with the first parameter for an identifier name. Here's an example `mouse_event`:

```luau
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
        click_button = light.enum({ -- using an identifier enum for the button
            "Left" :: "Left",
            "Right" :: "Right",
            "Middle" :: "Middle",
        }),
        position = light.vect2()
    }
})
```

Here's a vfx replication example using tagged enums:

```luau title="net/vfx_replication (ModuleScript)"
local network_id = require("./network_id")

local assets = ReplicatedStorage:WaitForChild("assets")

local vfx = light.enum("kind"::"kind", {
    explosion = {
        particle = light.enum({
            assets:WaitForChild("explosion_flash"),
            assets:WaitForChild("explosion_frag"),
            assets:WaitForChild("explosion_big"),
        }),
        magnitude = light.u16,
        position = light.vect(light.f32),
    },
    scream = {
        magnitude = light.u16,
        owner = network_id,
    },
})
```
