# Datatypes

## Intro

Light has lots of Datatypes you can define to use in messages.
These Datatypes usually come in the form of numeric IDs under the hood, with some casual lying to luau.
Here's an example of one:

[`#!luau local u8 = light.u8`](./numbers/uints.md),

`u8` can be understood by splitting up its name:

- u: unsigned integer (minimum value 0, no decimal places)

- 8: 8 bits, or 1 byte of accuracy/space (maximum value 255)

## Luau Tables

A luau table can also be a valid Datatype under [certain circumstances](./generics/tables/index.md).

## Lying to luau

Generally, places where you see `#!luau Datatype<T>` in these docs, you will only see `#!luau T` or a type in your
editor / LSP. This is to avoid needing to use type functions for every function, which would break compatability with
luau's old type solver.

## Why use Datatypes like this?

Clamping numbers or values to be within a certain range of values allows us to save a lot of bandwidth and performance, since we
send the number directly as binary over the network. If we don't say what type something is beforehand, the network has
to include the type of the packet in the packet, which isn't efficient. When you use
[`#!luau unknown`](./unknown.md) in light, you lose the benefits of static serialization.
