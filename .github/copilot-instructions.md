# GitHub Copilot Instructions

## Project Context

This is a full-stack TODO application with a React frontend and Express backend. Development follows an iterative, feedback-driven approach with emphasis on systematic testing and incremental improvements.

**Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Refer to these documents to understand the project architecture and development practices:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles when working on this project:

- **Test-Driven Development**: Follow the Red-Green-Refactor cycle
- **Incremental Changes**: Make small, testable modifications
- **Systematic Debugging**: Use test failures as guides to identify and fix issues
- **Validation Before Commit**: Ensure all tests pass and no lint errors exist

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

- **Backend**: Jest + Supertest for API testing
- **Frontend**: React Testing Library for component unit/integration tests
- **Manual Testing**: Browser testing for full UI verification

**Important Constraints**:

- ❌ DO NOT suggest or implement e2e test frameworks (Playwright, Cypress, Selenium)
- ❌ DO NOT suggest browser automation tools
- ✅ Reason: Keep lab focused on unit/integration tests without e2e complexity

**Testing Approach by Context**:

- **Backend API changes**: Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)
- **Frontend component features**: Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR). Follow with manual browser testing for full UI flows.

**This is true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these development workflows systematically:

### 1. TDD Workflow (Red-Green-Refactor)
1. Write or fix tests
2. Run tests → See them fail (RED)
3. Implement minimal code to pass tests
4. Run tests → See them pass (GREEN)
5. Refactor for quality and maintainability
6. Validate tests still pass

### 2. Code Quality Workflow
1. Run lint command
2. Categorize issues by type/severity
3. Fix systematically (one category at a time)
4. Re-validate with lint
5. Ensure no new issues introduced

### 3. Integration Workflow
1. Identify issue through testing or observation
2. Debug to locate root cause
3. Write/update tests to cover the issue
4. Implement fix
5. Verify end-to-end functionality

## Agent Usage

Use specialized agents for specific workflows:

- **`@tdd-developer`**: For all test-related work and Red-Green-Refactor cycles
- **`@code-reviewer`**: For addressing lint errors and code quality improvements

## Memory System

This project uses a structured memory system to track development discoveries and patterns:

- **Persistent Memory**: This file (`.github/copilot-instructions.md`) contains foundational principles and workflows
- **Working Memory**: `.github/memory/` directory contains discoveries and patterns
- **During active development**: Take notes in `.github/memory/scratch/working-notes.md` (not committed)
- **At end of session**: Summarize key findings into `.github/memory/session-notes.md` (committed)
- **Document recurring patterns**: Add to `.github/memory/patterns-discovered.md` (committed)
- **Reference these files**: AI assistants read these to provide context-aware suggestions

**See [.github/memory/README.md](memory/README.md) for detailed usage instructions.**

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

**List open issues**:
```bash
gh issue list --state open
```

**Get issue details**:
```bash
gh issue view <issue-number>
```

**Get issue with comments**:
```bash
gh issue view <issue-number> --comments
```

**Navigation Tips**:
- The main exercise issue will have "Exercise:" in the title
- Steps are posted as comments on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

Follow these Git conventions:

**Conventional Commits**:
- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without functional changes

**Branch Strategy**:
- Feature branches: `feature/<descriptive-name>`
- Always stage all changes before committing: `git add .`
- Push to the correct branch: `git push origin <branch-name>`

**Example**:
```bash
git checkout -b feature/add-todo-filtering
# ... make changes ...
git add .
git commit -m "feat: add filtering capability to todo list"
git push origin feature/add-todo-filtering
```
