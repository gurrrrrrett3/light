# Send To All

Send To All function similarly to calling [`#!luau light.send()`](./send.md) on each player in the server, but will only
need to serialize once.

## Important Note

[`#!luau light.send_to_all()`](./send_to_all.md) can generally take up more memory than
[`#!luau light.broadcast_to_all()`](./broadcast_to_all.md). Consider using the latter instead.(1)
{ .annotate }

1. Light "broadcasts" can save on memory by writing data to a single stream and sending it to all players instead of
   writing to a single stream and copying it to each player. This process is done through stream queries internally. To
   learn more about how Light dynamically groups streams for broadcasting, check out
   [The Internals Blog](../../../../blog/internals/dynamic_streams.md) on the topic.

## `#!luau function light.send_to_all` <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function send_to_all<T>(
   message: Message<T>,
   data: T
): ()
```

Send a message with given data to all players, for example:

```luau
Players.PlayerAdded:Connect(function()
   light.send_to_all(messages.join_sound)
end)
```
