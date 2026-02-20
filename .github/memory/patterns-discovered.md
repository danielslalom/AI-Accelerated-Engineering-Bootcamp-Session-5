# Discovered Code Patterns

## Purpose

This file documents recurring patterns, best practices, and architectural decisions discovered during development. These patterns help maintain consistency across the codebase and guide future implementation decisions.

## Pattern Template

```markdown
### [Pattern Name]

**Context**: When does this pattern apply?

**Problem**: What problem does this pattern solve?

**Solution**: How should this be implemented?

**Example**:
```javascript
// Code example demonstrating the pattern
```

**Related Files**:
- `path/to/file.js` - Where this pattern is used

**Notes**: Additional considerations or edge cases
```

---

## Patterns

### Service State Initialization

**Context**: When initializing state for collections (arrays) vs single optional values in services or components.

**Problem**: Inconsistent initialization can lead to null pointer errors and unnecessary null checks throughout the codebase. Choosing between `null`, `undefined`, and empty array `[]` for initial state affects how the data is consumed.

**Solution**: 
- Use **empty arrays `[]`** for collections that will be iterated (e.g., todos list)
- Use **`null`** for single optional values that may or may not exist
- Avoid `undefined` as an intentional initial state value

**Rationale**:
- Empty arrays allow safe `.map()`, `.filter()`, and `.length` operations without null checks
- `null` explicitly signals "no value yet" for single entities
- Consistent pattern reduces cognitive load and prevents bugs

**Example**:

```javascript
// ✅ Good: Collections initialized as empty arrays
class TodoService {
  constructor() {
    this.todos = [];  // Safe to iterate immediately
  }
  
  getAllTodos() {
    return this.todos;  // Can safely map/filter
  }
}

// ✅ Good: Optional single values initialized as null
class UserService {
  constructor() {
    this.currentUser = null;  // Explicitly no user yet
  }
  
  getCurrentUser() {
    return this.currentUser;  // Clear null check needed
  }
}

// ❌ Bad: Collection initialized as null
class TodoService {
  constructor() {
    this.todos = null;  // Requires null checks before every operation
  }
  
  getAllTodos() {
    return this.todos || [];  // Defensive code needed everywhere
  }
}
```

**Related Files**:
- `packages/backend/src/services/TodoService.js` - Service initialization
- `packages/frontend/src/App.js` - Component state initialization

**Notes**: 
- For React state, `useState([])` for collections is idiomatic
- For async operations, consider loading states: `{ data: [], loading: false, error: null }`

---

## [Your Next Pattern]

### [Pattern Name]

**Context**: 

**Problem**: 

**Solution**: 

**Example**:
```javascript
// Your example
```

**Related Files**:
- 

**Notes**: 
