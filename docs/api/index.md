# API Documentation

This part of the documentation is for light's user-facing APIs.

## Tags Reference

### <!-- client -->

This can be called on the client: `#!luau require(ReplicatedStorage.light).client`

### <!-- server -->

This can be called on the server: `#!luau require(ReplicatedStorage.light).server`

### <!-- shared -->

This can be called in a shared context: `#!luau require(ReplicatedStorage.light).shared`

### <!-- sync -->

This call can run without yielding the current thread.

### <!-- async -->

This call can yield the current thread.

### <!-- errors -->

This call can error under specific circumstances. This tag does not include errors from issues like passing in the wrong
type.

### <!-- experimental -->

This part of the API is considered experimental for now, and may change or be removed at any point.

### <!-- internal -->

The internals of Light are exposed in `light.internal` and the [internal section](./internals/index.md) of the docs. However, they should never be necessities for ordinary users.
Instead, they are present for "power users", people developing wrappers, or people developing light itself. Internal APIs are subject
to more frequent breaking changes.
