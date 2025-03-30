# Init

This function will initialize light's core functions. This can technically be called at any time, but you should
generally do it once you're ready to start sending and recieiving events. (Don't worry, if you're late, light will
handle event queueing for you.)

## `#!luau function init` <span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>

```luau
function init(
   manual_replication: boolean?
): ()
```

If `#!luau manual_replication` is enabled, you will need to step replication each frame yourself with
[`#!luau light.step_replication()`](./step_replication.md)
