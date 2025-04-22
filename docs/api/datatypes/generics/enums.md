# Enums

An enum represents a set of possible values. Because of limitations with string types, to get full type info from some
enums you will need to [typecast](https://luau.org/typecheck#type-casts) into a
[string singleton type](https://luau.org/typecheck#singleton-types-aka-literal-types).

!!! info "Light's enum types are generally only available in the [Luau Inference Engine V2](https://devforum.roblox.com/t/new-type-solver-beta/3155804)."

    You can still encode them, but type information will need to be provided more explicitly.

## `#!luau function light.datatypes.enum`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function enum<Identifier>(
    identifiers: { Identifier }
): Datatype<Identifier>
```

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
local ty = light.datatypes

local state = ty.enum({
    "Starting" :: "Starting",
    "Started" :: "Started",
    "Stopping" :: "Stopping",
    "Stopped" :: "Stopped",
}) --(1)!
```

1. Produces the following luau type:

    ```luau
    type state = "Starting" | "Started" | "Stopping" | "Stopped"
    ```

!!! info "It's worth noting that Light's identifier/tagged enums can also hold non-text identifiers if needbe."

!!! danger "Identifier encoding will not do a deep equality check."

    If an identifier isn't "literally" an option in the enum, it will error when you try to encode.

Another way you could use an Identifier Enum, this time with instances:

```luau
local MAX_PLAYERS = 20

local assets = ReplicatedStorage:WaitForChild("assets")
local rigs = assets:WaitForChild("rigs")

local ty = light.datatypes

local valid_character = ty.enum {
 rigs:WaitForChild("player_rig"),
 rigs:WaitForChild("hunter_rig"),
}

local player_spawned = {
 roblox_player = ty.instances.Player,
 character = valid_character,
 transform = ty.cframe,
 network_id = ty.u24,
}

return light.container {
 broadcast_player_spawned = player_spawned,
 broadcast_players_spawned = ty.arr(player_spawned, ty.range(1, MAX_PLAYERS)),
}
```

## Tagged Enums

Passing the first parameter to [`#!luau light.enum()`](./enums.md) represents a tagged enum type. Tagged enums are a set of structs, and the first parameter is the name for an identifier field. Here's an example `mouse_event`:

```luau
local ty = light.datatypes

local mouse_event = ty.enum("type"::"type", {
    move = {
        delta = ty.vect2(),
        position = ty.vect2()
    },
    drag = {
        delta = ty.vect2(),
        position = ty.vect2()
    },
    click = {
        click_button = ty.enum({ -- using an identifier enum for the button
            "Left" :: "Left",
            "Right" :: "Right",
            "Middle" :: "Middle",
        }),
        position = ty.vect2()
    }
})--(1)!
```

1. Produces the following luau type:

    ```luau
    type mouse_event = {
        type: "move",
        delta: vector,
        position: vector,
    } | {
        type: "drag",
        delta: vector,
        position: vector,
    } | {
        type: "click",
        click_button: "Left" | "Right" | "Middle",
        position: vector,
    }
    ```

Here's a networked AST using tagged enums and [`#!luau light.computed()`](./computed.md):

```luau title="net/ast (ModuleScript)"
local ty = light.datatypes

-- Q: why would you want to network an AST?
-- A: fuck if i know
local ast

local node = ty.computed(function() return ast end)

ast = light.enum("kind"::"kind", {
    number_expr = {
        value = ty.f64,
    },
    add = {
        left = node,
        right = node,
    },
    subtract = {
        left = node,
        right = node,
    },
})--(1)!
```

1. Produces the following luau type:

    ```luau
    type ast = {
        kind: "number_expr",
        value: number,
    } | {
        kind: "add",
        left: ast,
        right: ast,
    } | {
        kind: "subtract",
        left: ast,
        right: ast,
    }
    ```
