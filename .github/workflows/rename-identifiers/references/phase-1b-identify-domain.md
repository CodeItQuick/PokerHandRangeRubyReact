# Phase 1b — Identify the Domain

Before scoring any name, establish the domain vocabulary the codebase uses. Do this by:

1. Reading `describe`/`it` strings in test files, external API names, README/docs, and file path segments — these are written for humans and tend to use real domain language.
2. Reading method *implementations* (what they compute and return) rather than their names — the code tells the truth even when the name lies.
3. Extracting the recurring nouns and verbs — these are the domain terms. Examples: a billing system uses *invoice*, *ledger*, *charge*, *refund*, *payment*; a poker app uses *startingHand*, *holeCards*, *range*, *rangeGroup*, *suit*, *rank*.
4. Writing down the domain term list. Every replacement name must be drawn from or composed of these terms. If a name you're considering isn't derivable from this vocabulary, it's the wrong name.

**Existing identifiers are suspects, not authorities.** Class names, function names, and variable names in the codebase may themselves be mis-named — that is the entire point of this skill. Do not treat them as proof that a term belongs to the domain vocabulary. A class named `CardHandSuit` does not establish that "CardHandSuit" is a real domain concept; read the implementation to determine what concept the class actually models, then check whether the name matches.

**Concatenated noun-phrases are a red flag.** A name like `CardHandSuit` (Card + Hand + Suit) or `UserDataManager` (User + Data + Manager) jams multiple terms together without expressing a coherent concept. Treat these as candidates for HIGH severity scoring regardless of whether each constituent word is a valid domain term.

**Behavior-derived terms.** For each non-trivial function or method, read its implementation and ask: *what does this compute or produce, independent of what it is called?* Trace data transformations — if a function divides one number by another and multiplies by 100, the result is a *rate* or *percentage* regardless of the variable name. If a function filters a list to items matching a predicate and returns the first, it is *finding* or *selecting* something — name the concept from the operation, not the label. Record the concept you infer, not the name you observed.

**Infer terms from behavior using Claude.** For any function or data structure whose purpose is unclear from its name alone, explicitly ask: *"Given only what this code computes, what would a domain expert call this concept?"* Treat Claude's answer as a candidate term. Cross-check it against behavior-derived terms and any user-facing text — if multiple sources converge on the same word, it is likely correct. If Claude's inferred term conflicts with the existing name, the existing name is the suspect, not the inferred term.

If the domain is ambiguous (a utility module, a generic adapter), use the closest enclosing product concept visible in the file path or package name.