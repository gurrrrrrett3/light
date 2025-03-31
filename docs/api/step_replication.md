# Step Replication

This function will step the network batch.

## `#!luau function light.step_replication`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>'
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
