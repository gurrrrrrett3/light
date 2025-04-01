local ReplicatedStorage = game:GetService("ReplicatedStorage")

for _, test_module in ReplicatedStorage:WaitForChild("test"):WaitForChild("cases"):GetChildren() do
	(require)(test_module)
end
