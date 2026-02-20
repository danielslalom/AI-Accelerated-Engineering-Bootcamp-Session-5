---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ["read", "execute", "todo"]
---

# Commit and Push Changes

Analyze current changes, generate a conventional commit message, and push to a feature branch.

## Input Required

**Branch Name** (REQUIRED): ${input:branch-name:Enter feature branch name (e.g., feature/add-delete-endpoint)}

## Process

### 1. Verify Branch Name Provided

If the user did not provide a branch name, **STOP and ask for it**:
```
⚠️  Branch name is required. Please provide a branch name.

Example format: feature/<descriptive-name>
- feature/add-delete-endpoint
- feature/implement-filtering  
- fix/todo-validation-bug
```

Do not proceed without a branch name.

### 2. Analyze Changes

Review what has changed:
```bash
# See staged and unstaged changes
git status

# View detailed diff
git diff HEAD
```

Understand:
- Which files were modified, added, or deleted
- What functionality was added or changed
- The scope of the changes (feat, fix, refactor, etc.)

### 3. Generate Conventional Commit Message

Based on the changes, create a commit message following conventional commit format (from project Git Workflow):

**Format**: `<type>: <description>`

**Types**:
- `feat:` - New features
- `fix:` - Bug fixes  
- `test:` - Test additions or modifications
- `refactor:` - Code refactoring without functional changes
- `chore:` - Maintenance tasks (dependencies, config)
- `docs:` - Documentation updates

**Guidelines**:
- Use present tense: "add feature" not "added feature"
- Be concise but descriptive
- Focus on WHAT changed, not HOW
- Include scope if relevant: `feat(api): add delete endpoint`

**Examples**:
```
feat: add DELETE endpoint for todos
fix: correct validation logic for todo titles
test: add integration tests for todo filtering
refactor: extract error handling to middleware
chore: update dependencies to latest versions
```

### 4. Create or Switch to Branch

**If branch doesn't exist**, create it:
```bash
git checkout -b ${branch-name}
```

**If branch exists**, switch to it:
```bash
git checkout ${branch-name}
```

**CRITICAL**: 
- ❌ NEVER commit to `main` branch
- ✅ ONLY use the user-provided branch name
- Branch names should follow pattern: `feature/<name>` or `fix/<name>`

### 5. Stage All Changes

```bash
# Stage all modified, added, and deleted files
git add .
```

Verify what will be committed:
```bash
git status
```

### 6. Commit with Generated Message

```bash
git commit -m "<generated-conventional-commit-message>"
```

### 7. Push to Remote Branch

```bash
git push origin ${branch-name}
```

**If this is the first push** for this branch:
```bash
git push -u origin ${branch-name}
```

### 8. Confirm Completion

Report to the user:
```
✅ Changes committed and pushed successfully!

Branch: ${branch-name}
Commit: <generated-message>
Files changed: <count>

The changes are now on the remote branch and ready for:
- Pull Request creation (if needed)
- Continued development
- Review by team members
```

## Example Session

```markdown
User provides branch: feature/add-delete-endpoint

## Analyzing changes...
Modified files:
- packages/backend/src/app.js (added DELETE endpoint)
- packages/backend/__tests__/app.test.js (added tests)

## Generated commit message:
feat(api): add DELETE endpoint for todos

## Execution:
$ git checkout -b feature/add-delete-endpoint
Switched to a new branch 'feature/add-delete-endpoint'

$ git add .

$ git commit -m "feat(api): add DELETE endpoint for todos"
[feature/add-delete-endpoint abc123] feat(api): add DELETE endpoint for todos
 2 files changed, 45 insertions(+)

$ git push -u origin feature/add-delete-endpoint
Branch 'feature/add-delete-endpoint' set up to track 'origin/feature/add-delete-endpoint'

✅ Successfully committed and pushed!
```

## Safety Checks

Before pushing, verify:
- ✅ All tests are passing (run `npm test` if unsure)
- ✅ No linting errors that would break CI/CD
- ✅ Branch name is descriptive and follows conventions
- ✅ Commit message accurately describes changes

## Reference Documentation

This prompt relies on knowledge from:
- `.github/copilot-instructions.md` - Git Workflow section for conventional commits and branch strategy

Commit your changes following project standards!
