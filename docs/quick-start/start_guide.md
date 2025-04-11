# How do I get started?

For now, I'm going to place light's `ModuleScript` in `ReplicatedStorage`, but you can place it anywhere.
There are three ways to use light's functions, properties, etc:

- `#!luau local light = require(ReplicatedStorage.light).shared`
   This should be used when defining messages in a `ModuleScript`
- `#!luau local light = require(ReplicatedStorage.light).client`
   This should be used when sending or recieving messages on the client. I.e., inside a `LocalScript`.
- `#!luau local light = require(ReplicatedStorage.light).server`
   This should be used for sending/recieving messages on the server. I.e., inside a `Script`.

## What is a message?

"Message" is light's chosen terminology for an event which can be fired to and from the server, and connected with a
single callback.

## How do I create messages?

The recommended way to create messages in light is with a simple ModuleScript.

```luau title="ReplicatedStorage.messages (ModuleScript)"
local light = require(ReplicatedStorage.light).shared

local container = light.container({
    ping = light.literal(nil),
}, "messages")

light.init()

return container
```

[`#!luau light.container(messages)`](../api/network/messages/creation/container.md) constructs a "list" of
messages from the table provided so the messages can be used. The second parameter you see is the "namespace", which you
shouldn't have to worry too much about.
[`#!luau light.literal(nil)`](../api/datatypes/generics/literal.md) means that the message doesn't
contain any data, because it is literally `#!luau nil`. [`#!luau light.init()`](../api/init.md) can be called at any time, but it's best
to get it out of the way. This will initialize roblox RemoteEvent connections, start stepping replication, etc. Calling
[`#!luau light.init()`](../api/init.md) multiple times will have no additional impact.

## Sending Messages from Client to Server

To send a message from the client to the server, use
[`#!luau light.send(message, data)`](../api/network/messages/sending/send.md)

```luau title="StarterPlayerScripts.client (LocalScript)"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).client
local messages = require(ReplicatedStorage.messages)

light.send(messages.ping)
```

## Listening For Messages on The Server

Now, we need somewhere to listen for this message. The way to listen for a message being sent is with
[`#!luau light.connect(message, callback)`](../api/network/messages/listening/connect.md)

```luau title="ServerScriptService.server (Script)"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).server
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function(player)
    print("pong!")
end)
```

## Sending Messages from Server to Client

With [`#!luau light.send()`](../api/network/messages/sending/send.md), we can modify our Script from before to respond
to ping:

```luau title="ServerScriptService.server (Script)"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).server
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function(player)
    light.send(messages.ping, player)
end)
```

## Listening to Messages on The Client

Now let's change our LocalScript to listen to the server's response:

```luau title="StarterPlayerScripts.client (LocalScript)"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).client
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function()
    print("pong!")
end)

light.send(messages.ping)
```
