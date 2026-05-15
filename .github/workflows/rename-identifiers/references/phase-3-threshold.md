# Phase 3 — Threshold

**Rename every identifier assigned a category in Phase 2** (VOID, LIE, CHIMERA, CIPHER, FRAGMENT, or SERIES).

Do not apply a count limit — if there are 20 VOID identifiers, rename all 20. The category assignment is the filter, not file size or gut feeling.

**Production code gets stricter scrutiny than tests.** An identifier in production that forces readers to trace call chains is a higher-severity problem than the equivalent in a test, because it affects every future maintainer. When a production identifier is borderline, classify it; do not leave it unlabeled.