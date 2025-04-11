local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).shared

local messages = {}

messages.to_server = light.container({
    void = light.literal(nil),
}, "to_server")

messages.to_client = light.container({}, "to_client")

return messages
