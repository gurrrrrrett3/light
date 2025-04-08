local tool = script.Parent
local Anim = Instance.new("Animation")
Anim.AnimationId = "rbxassetid://18222829786"
local track

local function createdamagebox(cframe)

local cooldown = false
tool.Activated:Connect(function()
end)
    local player = game:GetService("Players").LocalPlayer
    local character = player.Character or player.Character:Wait()
    local rootpart = character:WaitForChild("HumanoidRootPart")
    if rootpart then 
        createdamagebox(rootpart.Position, rootpart.Orientation)
    if cooldown then return end
    
    createdamagebox(rootpart.CFrame * CFrame.new(0, 0, -5))
    local damagebox = Instance.new("Part")
    damagebox.Size = Vector3.new(5,5,5)
    damagebox.CFrame = cframe
    damagebox.Anchored = true
    damagebox.CanCollide = false
    damagebox.Parent = workspace
    track = script.Parent.Parent.Humanoid:LoadAnimation(Anim)
    track.Priority = Enum.AnimationPriority.Action
    track.Looped = false
    
    cooldown = true
    
    track:Play()
    track.Ended:Wait()
    
    cooldown = false
    
    print("Animation Has Stopped")
    end
end

tool.Unequipped:Connect(function()
    end)
    if track then
        track:Stop()
    end