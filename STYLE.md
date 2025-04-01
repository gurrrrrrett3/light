# Style

```none
Inline documentation follows these rules:

- Follow your discretion when styling inline docs. Punctuation and grammar is preferred for large or important comments,
but you shouldn't need to think about these rules much. I can't promise I always follow them to a T myself. If a PR
comes in and they aren't followed to my liking, there's a good chance I'll fix it myself. (feel free to comment on pr if
you have reasoning for breaking such rules, or believe they should be changed.) Also feel free to contribute styling
changes / fixes in a PR with appropriate tags.

- Light is not designed for moonwave or other docgen in mind. This decision was made because I find it inconvenient and
prefer to use mkdocs for the site.

- Function docs should always use --[=[ comments.

- Explanations for multiple lines of code must be enclosed in a multiline comment --[[ or --[=[ even if the explanation
is only a single line.

- In contrast, all lines explaining/documenting a single pattern or line of code should use multiple comments:
--- foo
--- bar
--- baz

- Descriptions of item(s) should begin with an indented line of some kind (hyphens / regular comment or tab acceptable),
followed by unindented lines. This helps readability in my opinion, and helps keep column/width of large comments lower.

- Inline Documentation should always be no more than 120 columns wide. Wrapping should always and only happen at the
latest applicable boundary.

- For blocks / multilines of variables and types, prefer multiple fields being documented in one "list" comment block,
as opposed to docs interleaved with each variable. This makes it easy to collapse large docs when not reading.

- It is recommended documentation blocks have a title which should be on the same line that the comment block begins.

- Items/descriptions in documentation lists should always be followed by a newline.

- Boundaries in inline documentation topics should always be separated by a new multiline comment.

```
