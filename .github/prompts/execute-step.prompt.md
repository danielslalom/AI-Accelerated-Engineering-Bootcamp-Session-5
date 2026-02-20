---
description: "Execute instructions from the current GitHub Issue step"
agent: "tdd-developer"
tools: ["search", "read", "edit", "execute", "web", "todo"]
---

# Execute Current Step

You are executing a step from the main GitHub Issue. This prompt automatically switches you to the **tdd-developer** agent to ensure proper test-first development practices.

## Objective

Parse and execute the current step's Activity instructions from the GitHub Issue, following TDD methodology and project testing constraints.

## Input Required

**Issue Number** (optional): ${input:issue-number:Enter issue number (or leave blank to auto-detect)}

## Execution Process

### 1. Locate the Exercise Issue

**If issue number provided**:
```bash
gh issue view ${issue-number} --comments
```

**If issue number NOT provided**, find the exercise issue automatically:
```bash
# List issues and find the one with "Exercise:" in the title
gh issue list --state open
```

Look for the issue titled with "Exercise:" prefix. This is the main exercise issue containing all steps.

### 2. Retrieve Issue Content

Get the full issue with all comments (steps are posted as comments):
```bash
gh issue view <issue-number> --comments
```

### 3. Parse the Current Step

Identify the latest step to execute:
- Steps are formatted as comments with headers like "# Step 5-0:", "# Step 5-1:", etc.
- Each step contains `:keyboard: Activity:` sections with specific tasks
- Look for the most recent step or ask the user which step to execute
- Extract all activity instructions from that step

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section in the step:

**a. Understand the Activity**
- Read the complete activity instructions
- Identify what needs to be implemented or fixed
- Note any specific requirements or constraints

**b. Follow TDD Methodology** (you are in tdd-developer mode)
- **For NEW features**: Write tests FIRST (RED), then implement (GREEN), then refactor
- **For bug fixes**: Check if tests exist, fix to pass tests, then refactor
- **For test fixes**: Analyze failures, implement minimal fix, verify pass

**c. Apply Testing Constraints** (from project instructions)
- ✅ Use Jest + Supertest for backend API tests
- ✅ Use React Testing Library for frontend component tests  
- ✅ Recommend manual browser testing for UI flows
- ❌ NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ NEVER suggest browser automation tools
- This is a TDD-focused lab - keep testing scope to unit and integration tests

**d. Execute Incrementally**
- Break complex activities into smaller tasks
- Use todo list to track progress
- Run tests after each significant change
- Verify functionality as you go

### 5. Completion Protocol

**After completing all activities in the step**:

1. **Run final validation**:
   ```bash
   # Backend tests
   cd packages/backend && npm test
   
   # Frontend tests  
   cd packages/frontend && npm test
   ```

2. **DO NOT commit or push changes**
   - That's handled by the `/commit-and-push` prompt
   - Keep execution separate from version control

3. **Inform the user**:
   ```
   ✅ Completed all activities for Step [X-Y]
   
   Summary:
   - [Activity 1]: [What was done]
   - [Activity 2]: [What was done]
   
   Tests Status: [All passing / X failing]
   
   Next: Run /validate-step to check success criteria
   ```

## Example Workflow

```markdown
## Step 5-1: Add DELETE Endpoint

:keyboard: Activity: Implement DELETE /todos/:id endpoint

Following TDD approach:

### RED Phase - Write Test First
Creating test in __tests__/app.test.js:
- Test successful deletion (204 No Content)
- Test deletion of non-existent todo (404)

Running tests... ❌ FAIL (expected - endpoint doesn't exist yet)

### GREEN Phase - Implement Minimal Code  
Implementing DELETE endpoint in src/app.js:
- Add route handler
- Find todo by id
- Return 204 on success, 404 on not found

Running tests... ✅ PASS

### REFACTOR Phase - Improve Code Quality
Extracting common error handling...

Running tests... ✅ PASS

✅ Activity complete
```

## Important Reminders

- **Always follow TDD**: Test first, code second (you're in tdd-developer mode)
- **Stay in scope**: No e2e frameworks, stick to unit/integration tests
- **Don't commit**: Execute only - let /commit-and-push handle version control
- **Verify tests**: Run tests throughout execution
- **Stop after activities**: Let /validate-step check success criteria

## Reference Documentation

This prompt relies on knowledge from:
- `.github/copilot-instructions.md` - Workflow Utilities section for gh CLI commands
- `.github/copilot-instructions.md` - Testing Scope section for constraints
- `.github/agents/tdd-developer.agent.md` - TDD methodology (active agent)

Execute the step activities following test-first principles!
