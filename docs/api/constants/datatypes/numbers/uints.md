# Unsigned Integers

An integer being "unsigned" says that it does not have a sign, so it should not be negative.
The number you see to the right of "u" indicates how many bits each [Datatype](../index.md) takes up.

| Name | Size      | Minimum Int    | Maximum Int   |
| ---: | :-------- | -------------- | ------------- |
| u8   | 1 byte    | 0              | 255           |
| u16  | 2 bytes   | 0              | 65,535        |
| u24  | 3 bytes   | 0              | 16,777,215    |
| u32  | 4 bytes   | 0              | 4,294,967,295 |
| u40  | 5 bytes   | 0              | 2^40-1        |
| u48  | 6 bytes   | 0              | 2^48-1        |
| u53  | 7 bytes   | 0              | 2^53          |
| vlq  | 1-8 bytes | 0              | 2^49 i think. |
