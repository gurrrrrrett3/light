# Connect Sync

[`#!luau light.connect_sync()`](./connect_sync.md) does the same thing as [`#!luau light.connect()`](./connect.md)
with one major difference. Thread reuse will not be used with [`#!luau light.connect_sync()`](./connect_sync.md), and
the function will be called directly. This means if you yield in your callback, you could get a buffer access out of
bounds or cause other unexpected internal issues. If you don't know what that implies, use
[`#!luau light.connect()`](./connect.md). There is little to no downside of using
[`#!luau light.connect()`](./connect.md), this function exists for optimizing frequently fired events in potentially
large servers (or memory usage).

!!! tip "This function can error if there is already a callback connected."

    Consider calling [`#!luau light.disconnect()`](./disconnect.md) first if this is an issue.

## `#!luau function light.connect_sync`

```luau title='<!-- b:client --> <!-- b:sync --> <!-- b:errors -->'
function connect_sync<T>(
   message: Message<T>,
   callback: (T) -> ()
): ()
```

## `#!luau function light.connect_sync`

```luau title='<!-- b:server --> <!-- b:sync --> <!-- b:errors -->'
function connect_sync<T>(
   message: Message<T>,
   callback: (Player, T) -> ()
): ()
```

An example client-side event polling utility using [`#!luau light.connect_sync()`](./connect_sync.md):

```luau title="polling.luau"
local function poll<T>(message: Message<T>)
   local data = {}
   local next_insert = 1

   light.connect_sync(message, function(data)
      data[next_insert] = data
      next_insert += 1
   end)

   local next_index = 1
   local function iter_next(): T?
      if next_index >= next_insert then

         next_index = 1
         next_insert = 1
         data = {}

         return nil
      end

      return data[next_index]
   end

   return iter_next
end
```

And an example on how to use the above poll util:

```luau title="attack_handler.client.luau"
local attacks = poll(messages.attack)

RunService.PreRender:Connect(function()
   for attack_data in attacks do
      print(`{attack_data.plr} attacked at {attack_data.pos}!`)
   end
end)
```
