# Literals

Literals represent a value which is "literally" something. Pass in any valid luau value, and it'll be seen as a constant
costing zero bytes.

## `#!luau function light.literal`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>'
function literal<Value>(
    value: Value
): Datatype<Value>
```
