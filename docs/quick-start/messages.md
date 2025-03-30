# What is a message?

"Message" is light's chosen terminology for an event which can be fired to and from the server, and connected with a
single callback.

## How do I create messages?

The recommended way to create messages in light is with a simple ModuleScript.

`ReplicatedStorage.messages` ModuleScript:

```luau
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
[`#!luau light.literal(nil)`](../api/constants/datatypes/generics/literal.md) means that the message doesn't
contain any data, because it is literally `#!luau nil`. [`#!luau light.init()`](../api/init.md) can be called at any time, but it's best
to get it out of the way. This will initialize roblox RemoteEvent connections, start stepping replication, etc. Calling
[`#!luau light.init()`](../api/init.md) multiple times will have no additional impact.

## Sending Messages from Client to Server

To send a message from the client to the server, use `light.send(message, data)`

`StarterPlayerScripts.client` LocalScript:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).client
local messages = require(ReplicatedStorage.messages)

light.send(messages.ping)
```

## Listening For Messages on The Server

Now, we need somewhere to listen for this message. The way to listen for a message being fired is with `light.connect(message, callback)`

`ServerScriptService.server` Script:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).server
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function(player)
   print("pong!")
end)
```

## Sending Messages from Server to Client

With `light.send`, we can modify our `ServerScriptService.server` Script from before to respond to ping:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).server
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function(player)
   light.send(messages.ping, player)
end)
```

## Listening to Messages on The Client

Now let's change our `StarterPlayerScripts.client` LocalScript from before to listen to the server's response:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).client
local messages = require(ReplicatedStorage.messages)

light.connect(messages.ping, function()
   print("pong!")
end)

light.send(messages.ping)
```
