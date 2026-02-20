---
description: "Validate that all success criteria for the current step are met"
agent: "code-reviewer"
tools: ["search", "read", "execute", "web", "todo"]
---

# Validate Step Success Criteria

You are validating a step's completion. This prompt automatically switches you to the **code-reviewer** agent to ensure systematic verification of all requirements.

## Objective

Check that all success criteria for a specific step have been met, providing clear feedback on completion status.

## Input Required

**Step Number** (REQUIRED): ${input:step-number:Enter step number (e.g., 5-0, 5-1, 5-2)}

## Validation Process

### 1. Locate the Main Exercise Issue

Find the exercise issue using gh CLI (from project Workflow Utilities):
```bash
# List open issues
gh issue list --state open
```

Identify the issue with "Exercise:" in the title - this contains all steps as comments.

### 2. Retrieve Issue with All Steps

Get the complete issue including all comment steps:
```bash
gh issue view <issue-number> --comments
```

### 3. Find the Specified Step

Search through the issue content for the step header:
```
# Step ${step-number}:
```

Example step headers:
- `# Step 5-0: Initialize Backend`
- `# Step 5-1: Add DELETE Endpoint`
- `# Step 5-2: Implement Filtering`

Extract the complete step content, including all sections.

### 4. Extract Success Criteria

Within the step, locate the "Success Criteria" section. It will look like:
```markdown
## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Parse all criteria items for validation.

### 5. Validate Each Criterion

For each success criterion, systematically check:

**File Existence Criteria**:
```
✅ Check: Does the file exist at the specified path?
```bash
ls -la <file-path>
```

**Test Criteria**:
```
✅ Check: Do all tests pass?
```bash
# Backend
cd packages/backend && npm test

# Frontend
cd packages/frontend && npm test
```

**Code Implementation Criteria**:
```
✅ Check: Does the code contain the expected implementation?
- Read the relevant files
- Search for expected functions, endpoints, or features
- Verify implementation matches requirements
```

**Linting Criteria** (you are in code-reviewer mode):
```
✅ Check: Are there any linting errors?
```bash
# Backend
cd packages/backend && npm run lint

# Frontend
cd packages/frontend && npm run lint
```

**API/Functionality Criteria**:
```
✅ Check: Does the API/feature work as expected?
- Review endpoint implementations
- Check for proper error handling
- Verify response formats
```

### 6. Report Validation Results

Provide a clear, structured report:

```markdown
## Step ${step-number} Validation Results

### ✅ Completed Criteria (X/Y)
- ✅ [Criterion description]: Verified
  - Details: [What was checked and confirmed]

- ✅ [Criterion description]: Verified
  - Details: [What was checked and confirmed]

### ❌ Incomplete Criteria (Y/Y)
- ❌ [Criterion description]: NOT MET
  - Issue: [What's missing or wrong]
  - Action needed: [Specific guidance to complete]

### Summary
- **Status**: [COMPLETE / INCOMPLETE]
- **Completion**: X/Y criteria met
- **Next steps**: [What to do next]
```

### 7. Provide Actionable Guidance

**If all criteria met**:
```
🎉 Step ${step-number} is COMPLETE!

All success criteria have been validated:
✅ [List all criteria]

Ready to proceed to:
1. Run /commit-and-push to save your work
2. Move to the next step
```

**If criteria not met**:
```
⚠️  Step ${step-number} is INCOMPLETE

Completed:
✅ [Completed criteria]

Still needed:
❌ [Incomplete criterion 1]
   → Action: [Specific fix needed]

❌ [Incomplete criterion 2]
   → Action: [Specific fix needed]

After addressing these issues, run /validate-step again.
```

## Example Validation Session

```markdown
Validating Step 5-1...

## Step 5-1: Add DELETE Endpoint - Validation Results

### ✅ Completed Criteria (4/5)

- ✅ DELETE endpoint implemented
  - Verified: Found endpoint in packages/backend/src/app.js:45
  - Implements: DELETE /todos/:id with proper logic

- ✅ Tests written for DELETE endpoint
  - Verified: Tests in __tests__/app.test.js
  - Covers: Success case (204) and not found case (404)

- ✅ All tests passing
  - Verified: npm test shows 15 passed, 0 failed

- ✅ No compilation errors
  - Verified: Backend starts without errors

### ❌ Incomplete Criteria (1/5)

- ❌ No linting errors
  - Issue: Found 3 linting errors:
    * no-console at app.js:46
    * no-unused-vars at app.js:52
  - Action needed: Run @code-reviewer to fix linting issues

### Summary
- **Status**: INCOMPLETE  
- **Completion**: 4/5 criteria met
- **Next steps**: 
  1. Address linting errors with @code-reviewer
  2. Re-run /validate-step 5-1
  3. When complete, run /commit-and-push
```

## Special Validation Scenarios

### Testing Criteria
- Run backend tests: `cd packages/backend && npm test`
- Run frontend tests: `cd packages/frontend && npm test`
- Check for specific test files in `__tests__/` directories
- Verify test coverage for new features

### Code Quality Criteria (you're in code-reviewer mode)
- Check for linting errors: `npm run lint`
- Look for code smells or anti-patterns
- Verify consistent coding style
- Check for unused variables or imports

### Documentation Criteria  
- Verify README updates if required
- Check for code comments where needed
- Ensure API documentation exists

## Important Notes

- **Be thorough**: Check every criterion, don't skip any
- **Be specific**: If incomplete, say exactly what's missing
- **Be helpful**: Provide actionable guidance, not just status
- **Be objective**: Base validation on observable facts (files exist, tests pass)
- **Use tools**: Actually run tests, lint, and checks - don't assume

## Reference Documentation

This prompt relies on knowledge from:
- `.github/copilot-instructions.md` - Workflow Utilities section for gh CLI commands
- `.github/agents/code-reviewer.agent.md` - Code review methodology (active agent)

Validate the step completion systematically and thoroughly!
