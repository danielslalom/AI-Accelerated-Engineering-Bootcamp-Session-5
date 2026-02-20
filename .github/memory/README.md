# Development Memory System

## Purpose

This memory system tracks patterns, decisions, and lessons learned during development. It serves as a knowledge base that helps both human developers and AI assistants understand the project's evolution, make consistent decisions, and avoid repeating past mistakes.

## Memory Architecture

The project uses two types of memory:

### Persistent Memory
- **Location**: `.github/copilot-instructions.md`
- **Content**: Foundational principles, workflows, and permanent guidelines
- **Lifecycle**: Rarely changes; represents core project standards
- **Git**: Always committed

### Working Memory
- **Location**: `.github/memory/` directory
- **Content**: Development discoveries, patterns, session notes, and active work
- **Lifecycle**: Evolves continuously as the project grows
- **Git**: Most files committed; scratch/ is ephemeral

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical summaries of completed sessions (COMMITTED)
├── patterns-discovered.md       # Accumulated code patterns and practices (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all scratch files
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Committed)
- **Purpose**: Historical record of completed development sessions
- **When to Update**: At the END of each development session
- **Content**: Summary of what was accomplished, key findings, decisions made, and outcomes
- **Why Committed**: Preserves institutional knowledge over time

#### `patterns-discovered.md` (Committed)
- **Purpose**: Document recurring code patterns, best practices, and architectural decisions
- **When to Update**: When you discover a pattern worth documenting or make an architectural decision
- **Content**: Pattern name, context, problem, solution, example code, and related files
- **Why Committed**: Ensures consistency across the codebase

#### `scratch/working-notes.md` (NOT Committed)
- **Purpose**: Active development notes for the current session
- **When to Update**: Throughout your development session as you work
- **Content**: Current task, approach, findings, decisions, blockers, next steps
- **Why Not Committed**: Ephemeral work-in-progress notes; key findings migrate to session-notes.md

## Workflow Integration

### During TDD Development

**Red Phase (Test Fails)**:
```markdown
# In scratch/working-notes.md

## Current Task
Implement DELETE /todos/:id endpoint

## Approach
- Write test first for successful deletion
- Write test for 404 when todo not found

## Key Findings
- Existing GET returns 404 with specific message format
- Should follow same pattern for DELETE
```

**Green Phase (Test Passes)**:
```markdown
## Decisions Made
- DELETE returns 204 No Content on success (REST convention)
- DELETE returns 404 with {error: "message"} when not found
- Follows existing error handling pattern from GET endpoint
```

**Refactor Phase**:
```markdown
## Patterns Observed
- All endpoints use consistent error response format
- 404 handling could be extracted to middleware
→ Add to patterns-discovered.md if this pattern repeats
```

### During Code Quality / Linting

```markdown
# In scratch/working-notes.md

## Current Task
Fix ESLint errors in frontend components

## Approach
1. Run lint to identify all issues
2. Categorize by type (unused vars, missing deps, etc.)
3. Fix systematically by category

## Key Findings
- useEffect dependencies frequently missing
- Pattern: All data fetching effects need proper deps

## Decisions Made
- Add exhaustive-deps rule explanation to patterns-discovered.md
- Document proper useEffect pattern for data fetching
```

### During Debugging

```markdown
# In scratch/working-notes.md

## Current Task
Fix: Todos not loading on frontend

## Key Findings
- Backend API works in manual tests (curl)
- Frontend fetch URL missing port number
- Root cause: REACT_APP_API_URL env var not set

## Decisions Made
- Add .env.example file to frontend
- Document environment setup in README
- Add to patterns-discovered.md: Environment configuration pattern
```

### End of Session Workflow

1. **Review** `scratch/working-notes.md` for key insights
2. **Extract** important findings into `session-notes.md` as a new session entry
3. **Document** any recurring patterns in `patterns-discovered.md`
4. **Clear** or archive `scratch/working-notes.md` for next session
5. **Commit** updates to `session-notes.md` and `patterns-discovered.md`

## How AI Uses This Memory

When GitHub Copilot or other AI assistants work on this project, they:

1. **Read Persistent Memory** (`.github/copilot-instructions.md`) to understand foundational principles
2. **Read Working Memory** (`.github/memory/`) to understand context-specific discoveries
3. **Apply Patterns** from `patterns-discovered.md` when generating code
4. **Reference Session Notes** to understand recent changes and decisions
5. **Update Working Notes** during active development to track reasoning

### AI Benefits

- **Consistency**: Follows established patterns automatically
- **Awareness**: Knows recent decisions and why they were made
- **Efficiency**: Doesn't suggest approaches already tried and rejected
- **Learning**: Accumulates knowledge over time instead of starting fresh each session

## Example: Pattern Discovery Flow

1. **During TDD** (in `scratch/working-notes.md`):
   - Notice: "Service initialization uses empty array [] instead of null"
   - Question: "Should all collections default to empty array?"

2. **After Research** (in `scratch/working-notes.md`):
   - Finding: "Empty arrays avoid null checks in map operations"
   - Decision: "Use [] for collections, null for single optional values"

3. **Document Pattern** (in `patterns-discovered.md`):
   - Add "Service State Initialization" pattern
   - Include rationale and examples

4. **Session Summary** (in `session-notes.md`):
   - "Standardized service initialization pattern"
   - Reference the new pattern entry

5. **Future Development**:
   - AI sees pattern in `patterns-discovered.md`
   - Automatically suggests `const todos = []` instead of `const todos = null`

## Best Practices

### Do

- ✅ Take notes in `scratch/working-notes.md` as you work
- ✅ Document patterns when you notice them repeating
- ✅ Summarize sessions with key outcomes, not just activities
- ✅ Include code examples in pattern documentation
- ✅ Reference file paths when documenting patterns
- ✅ Commit session-notes.md and patterns-discovered.md regularly

### Don't

- ❌ Commit `scratch/working-notes.md` (it's for active work only)
- ❌ Document every tiny detail (focus on significant findings)
- ❌ Copy-paste large code blocks (link to files instead)
- ❌ Let patterns-discovered.md become disorganized (group by category)
- ❌ Skip session summaries (they're valuable for future context)

## Quick Reference

| Task | File | Action |
|------|------|--------|
| Start new work | `scratch/working-notes.md` | Document current task and approach |
| Find a pattern | `scratch/working-notes.md` | Note the pattern in findings |
| Pattern repeats | `patterns-discovered.md` | Document formal pattern entry |
| Session complete | `session-notes.md` | Add session summary entry |
| Need context | All `.md` files | Read to understand history |

## Summary

This memory system transforms development experience into institutional knowledge. By maintaining both ephemeral working notes and committed historical records, the project builds a knowledge base that makes both human developers and AI assistants more effective over time.

**Remember**: The goal is not perfect documentation, but capturing insights that would otherwise be lost between sessions.
