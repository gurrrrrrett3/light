# API Documentation

This part of the documentation is for light's user-facing APIs.

## Tags Reference

### <!-- b:client -->

This can be called on the client: `#!luau require(ReplicatedStorage.light).client`

### <!-- b:server -->

This can be called on the server: `#!luau require(ReplicatedStorage.light).server`

### <!-- b:shared -->

This can be called in a shared context: `#!luau require(ReplicatedStorage.light).shared`

### <!-- b:sync -->

This call can run without yielding the current thread.

### <!-- b:async -->

This call can yield the current thread.

### <!-- b:errors -->

This call can error under specific circumstances. This tag does not include errors from issues like passing in the wrong
type.

### <!-- b:experimental -->

This part of the API is considered experimental for now, and may change or be removed at any point.

### <!-- b:internal -->

The internals of Light are exposed in some user-facing APIs. However, they should never be necessary for an ordinary
user. Instead, they are present for people developing "extensions", or light itself. Internal APIs are subject to more
frequent breaking changes.
