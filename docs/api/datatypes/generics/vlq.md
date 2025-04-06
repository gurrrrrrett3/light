# Variable Length Quantity

<a href="https://en.wikipedia.org/wiki/Variable-length_quantity" target="_blank">Variable Length Quantities</a>
allow you to encode a number which takes more space as it gets bigger.

## `#!luau function light.vlq`

```luau title='<!-- client --> <!-- server --> <!-- shared --> <!-- sync -->'
function light.vlq(
    max_bytes: number?--(1)!
): Datatype<number>
```

1. `max_bytes` will default to 3.

Returns a vlq number [Datatype](../index.md). Ranges for each `max_bytes` value are shown below:

| Name   | Size        | Minimum Int    | Maximum Int   |
| -----: | :---------- | -------------- | ------------- |
| vlq(1) | 1 byte      | 0              | 128           |
| vlq(2) | 1-2 byte(s) | 0              | 16,384        |
| vlq(3) | 1-3 byte(s) | 0              | 2,097,152     |
| vlq(4) | 1-4 byte(s) | 0              | 268,435,456   |
| vlq(5) | 1-5 byte(s) | 0              | 34,359,738,368|
| vlq(6) | 1-6 byte(s) | 0              | 128^6         |
| vlq(7) | 1-7 byte(s) | 0              | 128^7         |
