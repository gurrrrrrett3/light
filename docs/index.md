---
hide:
  - navigation
---

# <span style="font-family:Comic Neue; font-weight:900">:3c</span>

Light is a *light*weight, robust, and secure remote wrapper for roblox. Read below, or [get started](quick-start/index.md).

## What Light does

- Batching, to pack all of your data efficiently together each frame.

- Serializes your data into buffers with static type validation, so you always get the **type** you expect.

- Lets you broadcast large unreliable messages for tasks such as character replication or neck cframes.

- Works with no plugin or compiler. Light can be downloaded and used out-of-the-box.

- Handles all the RemoteEvent instances for you reliably.

## What Light doesn't

- Serve as a drop-in replacement for other tools, such as RemoteEvents,
<a href="https://github.com/ffrostfall/ByteNet" target="_blank">ByteNet</a>,
or <a href="https://github.com/1Axen/blink" target="_blank">Blink</a>.
Light is similar to these, but will require some work to migrate to/from.

- Secure your messages for you. Static serialization ensures you get the types you expect, but the data can still be manipulated by exploiters.

- Provide a built-in signal implementation.
Light messages can only be connected or disconnected with a single callback. For convenience, a thread reuse implementation is packaged out-of-the-box with [`#!luau light.connect()`](./api/network/messages/listening/connect.md)
[why?](#q-why-only-allow-one-callback)

## FAQ / Q&A

### Q: Does batching add extra delays or overhead to my networking?

No. Roblox does batching on its own, light does batching to group messages together and optimize bandwidth

### Q: Is event order the same as roblox?

No. Messages will be ordered per-message. This means that in an environment where you send 2 kinds of messages, you may
end up with 2 contiguous lists of calls for each type.

```luau
send(message_a)
send(message_b)
send(message_a)
```

The other side will recieve the first call to message a, the second call to message a, and then the call(s) to message
b.

### Q: Why only allow one callback?

"Message" in Light indicates that there's an intended target. I rarely see a use multiple callbacks for events. If you do, you can make your callback spawn a BindableEvent or signal. The way I see it, there's no reason for me to include bloat like a signal in the base
library. If you're interested in event profiling, the docs for [`#!luau light.disconnect()`](./api/network/messages/listening/disconnect.md) have a decent example of an event profiler.

### Q: Where can I find holy?

Holy is available on [its github repo](https://github.com/hardlyardi/holy).

## Special Thanks

Special thanks to
<a href="https://github.com/1Axen/blink" target="_blank">Blink</a>,
<a href="https://github.com/ffrostfall/ByteNet" target="_blank">ByteNet</a>,
<a href="https://github.com/Data-Oriented-House/Squash" target="_blank">Squash</a>,
and the people behind them. All of the above tools are awesome and you should absolutely check them out if you haven't
already. These tools have contributed and continue to contribute to The Roblox Networking Ecosystem. Light wouldn't be
possible without time and work from a lot of awesome people. I'd also like to personally thank the people below, as well
as anyone else who contributes to light:

- <a href="https://github.com/alicesaidhi/" target="_blank">Alice</a>: Holy-Light Icon + Helped with legacy bitpack constant lookup table
- <a href="https://github.com/lewisakura/" target="_blank">Lewi</a>: Helped develop docs :pray:
