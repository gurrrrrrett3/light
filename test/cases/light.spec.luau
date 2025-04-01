local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local test_kit = require(ReplicatedStorage:WaitForChild("test"):WaitForChild("testkit"))

local IS_SERVER = RunService:IsServer()

local TEST, CASE, CHECK, FINISH = test_kit.test()

TEST("Message Synchronization", function()
	-- hihi
end)

return nil
