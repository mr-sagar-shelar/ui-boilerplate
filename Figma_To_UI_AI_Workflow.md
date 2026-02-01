# 🎨 Figma → Production UI

## AI-Assisted Frontend Development Workflow

This document defines the **standard, mandatory sequence** every developer must follow to convert **UX designs (Figma)** into **production-ready UI code** using the custom AI agent commands available in this repository.

---

## 🧠 Core Principle

> Design is the source of truth for structure.  
> Contracts are the source of truth for data.  
> Containers orchestrate.  
> Components render.  
> Tests validate behavior.

---

## 🧭 High-Level Flow

Figma UX  
→ 1. Contracts (interfaces)  
→ 2. Validation (Zod)  
→ 3. Component (UI)  
→ 4. Mock Data  
→ 5. Handlers
→ 6. Stories  
→ 7. APIs
→ 8. Containers
→ 9. Component Unit tests  
→ 10. Container Unit tests  
→ 11. Container E2E tests

---

## 1️⃣ Create Component Interface

Defines the data structure for a UI component.

**Output**

- /packages/contracts/interfaces/{Component}.ts
- API request/response skeletons

<details>

<summary>Example Prompt For `component-interface`</summary>

```markdown
Create component named "UserProfile".

Fields:

- userId: string, required, must be uuid
- firstName: string, required
- lastName: string, required
- email: string, must be valid email
- dateOfBirth: date, must be past date
- age: number, minimum 18
- role: enum, admin | analyst | user
- phoneNumber: optional string, digits only
- isActive: boolean
- createdAt: datetime, required
```

</details>

---

## 2️⃣ Create component validations

Generates Zod schema from interface comments.

**Output**

- /packages/contracts/validation/{Component}.schema.ts

<details>

<summary>Example Prompt For `component-validations`</summary>

```markdown
Generate Zod validation schema for component "UserProfile"
using the interface defined in:

/packages/contracts/interfaces/UserProfile.ts

Requirements:

- Read validation rules ONLY from @validation comments
- Implement nested object validations
- Implement array item validations
- Implement cross-field validations if present
- Generate form-level schema suitable for UI forms
- Follow standard error message conventions
```

</details>

---

## 3️⃣ Develop UI Component

Creates a pure MUI-based component supporting readonly/editable modes.

**Output**

- /packages/ui/src/component/{Component}/{Component}.tsx

<details>

<summary>Example Prompt For `component-develop`</summary>

```markdown
Generate UI component for "PersonalInfo".

Use interface from:

- /packages/contracts/interfaces/PersonalInfo.ts

Component requirements:

- Render all fields defined in interface
- Support readonly and editable modes
- Emit onChange and onValidityChange events
- Use Material UI
- Responsive layout
```

</details>

---

## 4️⃣ Generate Component Mock Data

Creates canonical mock data for all scenarios of a component.

**Output**

- /packages/ui/src/component/{Component}/{Component}.mock-data.ts

<details>

<summary>Example Prompt For `component-mock-data`</summary>

```markdown
Generate mock data for component "UserProfile".

Use all available references:

- Interface
- Zod validation schema
- Form behavior

The mock data must:

- Cover positive, negative, empty, and edge cases
- Be reusable across unit and E2E tests
- Be defined in a single file
```

</details>

---

## 5️⃣ Generate Component Handlers

Creates MSW handlers for mock scenarios.

**Output**

- /packages/ui/src/component/{Component}/{Component}.handlers.ts

<details>

<summary>Example Prompt For `component-handlers`</summary>

```markdown
Generate API handlers for component "UserProfile".

Use mock data from:

- /packages/ui/src/component/UserProfile/UserProfile.mock-data.ts

Handlers must:

- Support positive, negative, empty, and edge cases
- Be reusable by unit tests and E2E tests
- Use MSW
- Match REST semantics
```

</details>

---

## 6️⃣ Create Component Stories

Visualizes all component states using mock data.

**Output**

- /packages/ui/src/component/{Component}/{Component}.stories.ts

<details>

<summary>Example Prompt For `component-strories`</summary>

```markdown
Generate Storybook stories for component "UserProfile".

Use:

- Props interface from /packages/contracts/interfaces/UserProfile.ts
- Mock data from /packages/ui/src/component/UserProfile/UserProfile.mock-data.ts

Story requirements:

- Create stories for valid, invalid, empty, and edge cases
- Pass all props via args
- Expose all props in Storybook Controls
- Use mock data as default args
```

</details>

---

## 7️⃣ Create API Hooks

Generates TanStack Query hooks with caching & pagination.

**Output**

- /packages/api/{Component}/{Component}.api.ts

<details>

<summary>Example Prompt For `component-api`</summary>

```markdown
Create API hooks for component "UserProfile".

Use:

- Interface from /packages/contracts/interfaces/UserProfile.ts
- Zod schema from /packages/contracts/validation/UserProfile.schema.ts

API endpoints:

- GET /api/user-profile
- GET /api/user-profile/{id}
- POST /api/user-profile
- PUT /api/user-profile/{id}
- DELETE /api/user-profile/{id}

Requirements:

- Enable pagination for GET list
- Use shared pagination config
- Cache responses in memory for 1 minute
- Invalidate list and detail queries on mutation
```

</details>

---

## 8️⃣ Build Container

Orchestrates multiple components, state, edit flow, and submission.

**Output**

- /packages/ui/{Container}/{Container}.tsx
- /packages/ui/{Container}/{Container}.store.ts
- /packages/ui/{Container}/{Container}.api.ts

<details>

<summary>Example Prompt For `container`</summary>

```markdown
Create container named "UserProfileContainer"
using the following components:

- PersonalInfo
- AddressInfo
- Preferences

The container must:

- Fetch data for all components
- Coordinate edit / submit flow
- Maintain component-level state and validity
- Prevent unnecessary re-renders
```

</details>

---

## 9️⃣ Component Unit Tests

Tests component behavior using mock data and handlers.

<details>

<summary>Example Prompt For `component-unit-test`</summary>

```markdown
Write comprehensive unit tests for the "UserProfile" component.

Scope:

- This is a UNIT test, not integration or E2E.
- Test only the UserProfile component in isolation.
- Do not test API implementation or backend logic.
- Use MSW for mocking API responses.

Sources of truth:

1. Component interface:
   /packages/contracts/interfaces/UserProfile.ts

2. Zod validation schema:
   /packages/contracts/validation/UserProfile.schema.ts

3. Form component:
   /packages/ui/src/component/UserProfile/UserProfile.form.tsx

Testing framework & tools:

- Vitest
- React Testing Library
- jsdom environment
- MSW for API mocks

General testing rules:

- Follow Arrange → Act → Assert pattern in every test
- One behavior per test case
- Use accessible queries only (getByRole, getByLabelText, getByPlaceholderText)
- Do NOT use class selectors or implementation details
- Do NOT use snapshot testing
- Do NOT use arbitrary timeouts
```

</details>

---

## 🔟 Container Unit Tests

Tests orchestration logic and cross-component flows.

<details>

<summary>Example Prompt For `container-unit-test`</summary>

```markdown
Write unit tests for container "UserProfileContainer"
which uses components:

- PersonalInfo
- AddressInfo
- Preferences

Tests must:

- Use mock data and handlers from each component
- Cover positive, negative, empty, and edge scenarios
- Validate edit / submit orchestration
- Use USE_MOCK_API flag
- Follow Arrange Act Assert pattern
```

</details>

---

## 1️⃣1️⃣ Container End-to-End Tests

Validates real user journeys using Playwright + MSW.

<details>

<summary>Example Prompt For `container-e2e-test`</summary>

```markdown
Write end-to-end tests for container "UserProfileContainer"
which uses components:

- PersonalInfo
- AddressInfo
- Preferences

Tests must:

- Use mock data and handlers from each component
- Cover positive, negative, empty, and edge scenarios
- Validate edit / submit orchestration
- Use USE_MOCK_API flag to control mocking
```

</details>

---

## ✅ Mandatory Rules

- Interfaces are the single source of truth
- No inline mock data in tests
- No business logic in components
- Containers manage orchestration only
- Same mock data reused everywhere

---

## 🎯 Outcome

Following this sequence guarantees:

- Predictable UI development
- AI-safe generation
- Full test coverage
- Maintainable architecture

This workflow is **mandatory** for all frontend development in this repository.
