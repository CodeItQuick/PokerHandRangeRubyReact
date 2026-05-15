# Phase 1 — Scope and Read

1. Identify the target scope: a single file, a module directory, or the full codebase. If the user doesn't specify, default to the full codebase.
2. Read every file in scope: source files, test files, type definition files, and index/barrel files.
3. Build a list of every identifier: `const`/`let`/`var` declarations, function parameters, callback arguments, destructured names, class fields, and exported names.
4. Note what each one actually holds — not just its declared type, but its domain meaning in context.