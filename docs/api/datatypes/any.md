# Any

!!!danger Consider alternatives

    Consider using [Instances](./instances.md) or [Checked](./checked.md) over `any`. `any` can not validate that the
    type sent over the network is correct, and can be manipulated by exploiters.

Any is a [Datatype](./index.md) that represents a value which should be serialized with the format Roblox's Remote
Events use. Using this while [sending unreliably](../network/messages/sending/send_unreliably.md) can cause issues
if the packet is too large.
