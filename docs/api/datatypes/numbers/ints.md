# Signed Integers

An integer being "signed" means it could be negative.
The number you see to the right of "i" indicates how many bits each [Datatype](../index.md) takes up.

| Name | Size    | Minimum Int    | Maximum Int   |
| ---: | :------ | -------------- | ------------- |
| i8   | 1 byte  | -128           | 127           |
| i16  | 2 bytes | -32,768        | 32,767        |
| i24  | 3 bytes | -8,388,608     | 8,388,607     |
| i32  | 4 bytes | -2,147,483,648 | 2,147,483,647 |
| i40  | 5 bytes | -2^39          | 2^39-1        |
| i48  | 6 bytes | -2^47          | 2^47-1        |

You can access each one with `light.<Name>`.
