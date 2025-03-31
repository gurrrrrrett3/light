# Step Replication

This function will step the network batch.

## `#!luau function light.step_replication`

```luau title='<!-- b:client --> <!-- b:server --> <!-- b:shared --> <!-- b:sync -->'
function step_replication(): ()
```

Some example code:

```luau
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local light = require(ReplicatedStorage.light).shared

-- identical to initializing without manual replication
RunService.PostSimulation:Connect(function()
    light.step_replication()
end)
```
