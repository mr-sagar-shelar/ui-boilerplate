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
→ Contracts (interfaces)  
→ Validation (Zod)  
→ Components (UI)  
→ Container (orchestration)  
→ Mock data + handlers  
→ Stories  
→ Unit tests  
→ Container tests  
→ E2E tests

---

## 1️⃣ Create Component Contract – @init-component

Defines the data structure for a UI component.

**Output**

- /packages/contracts/interfaces/{Component}.ts
- API request/response skeletons

<details>

<summary>Example @init-component for UserProfile</summary>

```markdown
Create a component named "UserProfile".

The component accepts the following data:

1. User identifiers

- userId: unique identifier, string, required
- externalRefId: optional identifier, string

2. Personal information

- firstName: string, required
- lastName: string, required
- middleName: optional string
- fullName: derived display value, string, readonly
- dateOfBirth: date, must be a valid past date
- age: number, must be greater than or equal to 18

3. Contact details

- email: string, must be a valid email format
- phoneNumber: string, optional, digits only
- isEmailVerified: boolean
- isPhoneVerified: boolean

4. Address information

- address: object
  - streetLine1: string
  - streetLine2: optional string
  - city: string
  - state: string
  - postalCode: string
  - country: string (ISO 2-letter country code)

5. Role and access

- role: enum, allowed values are admin, analyst, user, guest
- permissions: array of strings
- isActive: boolean
- accountStatus: enum, one of ACTIVE, SUSPENDED, DELETED

6. Preferences

- preferredLanguage: enum, one of en, fr, de, es
- preferredTheme: enum, light or dark
- notificationChannels: array, allowed values email, sms, push

7. Financial information

- annualIncome: number, must be greater than 0
- creditScore: number, range between 300 and 900
- isKycCompleted: boolean

8. Dates and audit fields

- createdAt: datetime, ISO 8601 string
- updatedAt: datetime, ISO 8601 string
- lastLoginAt: optional datetime

9. Flags and toggles

- isReadonly: boolean
- isEditable: boolean

10. Metadata

- tags: array of strings
- notes: optional string, max length 500 characters

11. Nested collections

- dependents: array of objects
  - name: string
  - relationship: enum, spouse or child
  - dateOfBirth: date

12. UI-specific behavior hints

- showAdvancedSection: boolean
- layoutVariant: enum, compact or expanded
```

</details>

---

## 2️⃣ Add Validation – @validation

Generates Zod schema from interface comments.

**Output**

- /packages/contracts/validation/{Component}.schema.ts

---

## 3️⃣ Develop UI Component – @component-develop

Creates a pure MUI-based component supporting readonly/editable modes.

**Output**

- /packages/ui/src/component/{Component}/{Component}.tsx

---

## 4️⃣ Generate Mock Data – @mock

Creates canonical mock data for all scenarios.

**Output**

- /packages/ui/src/component/{Component}/{Component}.mock-data.ts

---

## 5️⃣ Generate Mock Handlers – @handler

Creates MSW handlers for mock scenarios.

**Output**

- /packages/ui/src/component/{Component}/{Component}.handlers.ts

---

## 6️⃣ Create Storybook Stories – @story

Visualizes all component states using mock data.

**Output**

- /packages/ui/src/component/{Component}/{Component}.stories.ts

---

## 7️⃣ Create API Hooks – @API

Generates TanStack Query hooks with caching & pagination.

**Output**

- /packages/api/{Component}/{Component}.api.ts

---

## 8️⃣ Build Container – @container

Orchestrates multiple components, state, edit flow, and submission.

**Output**

- /packages/ui/{Container}/{Container}.tsx
- /packages/ui/{Container}/{Container}.store.ts
- /packages/ui/{Container}/{Container}.api.ts

---

## 9️⃣ Component Unit Tests – @unit

Tests component behavior using mock data and handlers.

---

## 🔟 Container Unit Tests – @container-unit-test

Tests orchestration logic and cross-component flows.

---

## 1️⃣1️⃣ End-to-End Tests – @container-e2e

Validates real user journeys using Playwright + MSW.

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
