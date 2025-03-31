# API Documentation

This part of the documentation is for light's user-facing APIs.

## Tags Reference

### <span class="md-tag md-tag-icon md-tag--server">Server</span> { id="tag-server" data-toc-label="Server" }

This can be called on the server: `#!luau require(ReplicatedStorage.light).server`

### <span class="md-tag md-tag-icon md-tag--client">Client</span> { id="tag-client" data-toc-label="Client" }

This can be called on the client: `#!luau require(ReplicatedStorage.light).client`

### <span class="md-tag md-tag-icon md-tag--shared">Shared</span> { id="tag-shared" data-toc-label="Shared" }

This can be called in a shared context: `#!luau require(ReplicatedStorage.light).shared`

### <span class="md-tag md-tag-icon md-tag--sync">Synchronous</span> { id="tag-sync" data-toc-label="Synchronous" }

This call can run without yielding the current thread.

### <span class="md-tag md-tag-icon md-tag--async">Yielding</span> { id="tag-async" data-toc-label="Yielding" }

This call can yield the current thread.

### <span class="md-tag md-tag-icon md-tag--errors">Errors</span> { id="errors" data-toc-label="Errors" }

This call can error under specific circumstances. This tag does not include errors from issues like passing in the wrong
type.

### <span class="md-tag md-tag-icon md-tag--experimental">Experimental</span> { id="tag-experimental" data-toc-label="Experimental" }

This part of the API is considered experimental for now, and may change or be removed at any point.

### <span class="md-tag md-tag-icon md-tag--internal">Internal</span> { id="tag-internal" data-toc-label="Internal" }

The internals of Light are exposed in some user-facing APIs. However, they should never be necessary for an ordinary
user. Instead, they are present for people developing "extensions", or light itself. Internal APIs are subject to more
frequent breaking changes.
