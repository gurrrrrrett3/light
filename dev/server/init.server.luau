local ReplicatedStorage = game:GetService("ReplicatedStorage")

local light = require(ReplicatedStorage.light).server
local messages = require(ReplicatedStorage.shared.messages)

light.connect(messages.to_server.void, function(plr)
    print(plr)
end)
