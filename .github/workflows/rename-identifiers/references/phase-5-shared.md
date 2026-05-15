# Phase 5 — Shared Output Rules

This is the terminal phase. No edits are made to the codebase. All prior phases always run against the full scope — flags control output only, not analysis.

## The Why sentence

Every finding must include a one-sentence reason that states the category's root cause applied to this specific identifier — concrete, not generic.

Good: `List suffix claims a collection; actually holds a scalar count`
Bad: `this name is a LIE`

The sentence must be self-contained: a reader who has not seen the taxonomy should be able to understand what is wrong and why.

## Severity filtering

If `--min-severity=HIGH` is passed, omit all MEDIUM findings from output. If `--min-severity=CRITICAL`, omit HIGH and MEDIUM findings. The flag applies to whichever format is active.

## Format selection

Read the format-specific file that matches the `--format` flag:

- `--format=report` (default) → see `phase-5-report.md`
- `--format=annotations` → see `phase-5-annotations.md`