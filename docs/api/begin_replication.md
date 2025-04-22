# Begin Replication

This function will initialize light's core functions. You'll need to call it to start sending messages on the client or
server. Calling multiple times or from multiple files has no additional effects, and is considered "safe".

## `#!luau function light.begin_replication`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function begin_replication(): ()
```

You can use [`#!luau light.step_replication()`](./step_replication.md) instead of this if you prefer a manual
replication step.
