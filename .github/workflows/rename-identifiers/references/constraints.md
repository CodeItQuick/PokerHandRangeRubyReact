# Constraints — What NOT to Do

- **Don't rename everything.** Only rename identifiers that received a severity label (CRITICAL, HIGH, MEDIUM, or LOW). Skip unlabeled names.
- **Don't change logic.** Rename only. No restructuring, no extracting, no "while I'm here" fixes.
- **Don't rename a production export without updating every consumer.** A broken import is worse than a bad name.
- **Don't rename a class/module without renaming the file.** Renaming the identifier but leaving the old filename creates a mismatch that confuses every future reader navigating by filename.
- **Don't apply rules robotically.** `err` in a `.catch(err => ...)` is fine. `e` in `.catch(e => ...)` is not. Use judgment.
- **Don't rename test `describe`/`it` strings.** Those are documentation strings, not identifiers.
- **Don't let test and production names diverge.** If a value is the same concept in both contexts, its name should be consistent across both.