# Optionals

Optionals represent a value which could be `#!luau nil`.

## `#!luau function light.optional`

```luau title='<span class="md-tag md-tag-icon md-tag--client">Client</span> <span class="md-tag md-tag-icon md-tag--server">Server</span> <span class="md-tag md-tag-icon md-tag--shared">Shared</span> <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span>'
function optional<Inner>(
    inner: Datatype<Inner>
): Datatype<Inner?>
```
