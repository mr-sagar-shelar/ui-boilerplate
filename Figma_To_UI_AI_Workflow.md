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
Create a TypeScript interface named "UserProfile". This interface will be the single source of truth for the User Profile data contract.

It must include the following properties with clear validation rules in comments, which will be used later to generate a Zod schema.

- **`id`**: `string`.
  - `@validation required`.
  - `@validation uuid The user's unique identifier.`.
- **`username`**: `string`.
  - `@validation required`.
  - `@validation min 3 Must be at least 3 characters.`.
  - `@validation max 20 Cannot exceed 20 characters.`.
- **`firstName`**: `string`.
  - `@validation required`.
- **`lastName`**: `string`.
  - `@validation required`.
- **`email`**: `string`.
  - `@validation required`.
  - `@validation email Must be a valid email address.`.
- **`bio`**: `string`.
  - `@validation optional`.
  - `@validation max 250 Bio cannot exceed 250 characters.`.
- **`avatarUrl`**: `string`.
  - `@validation optional`.
  - `@validation url Must be a valid URL.`.
- **`dateOfBirth`**: `Date`.
  - `@validation required`.
  - `@validation past The date of birth must be in the past.`.
- **`age`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 18 User must be at least 18 years old.`.
- **`followers`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 0 Cannot be negative.`.
- **`following`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 0 Cannot be negative.`.
- **`isActive`**: `boolean`.
  - `@validation required`.
  - `@default true`.
- **`website`**: `string`.
  - `@validation optional`.
  - `@validation url Must be a valid URL.`.
- **`address`**: `object`.
  - `@validation required`.
  - **`street`**: `string`, `@validation required`.
  - **`city`**: `string`, `@validation required`.
  - **`zipCode`**: `string`.
    - `@validation required`.
    - `@validation regex /^\d{5}$/ Must be a 5-digit US zip code.`.
  - **`country`**: `string`, `@validation required`.
- **`tags`**: `array` of `string`.
  - `@validation optional`.
  - `@validation arrayStringEach singleWord Each tag must be a single word.`.
- **`role`**: `enum`.
  - `@validation required`.
  - `@enum admin | editor | viewer`.
- **`lastLogin`**: `Date`.
  - `@validation optional`.
  - `@validation past Must be a past datetime.`.
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
Generate the Zod validation schema for the "UserProfile" component.

Use the TypeScript interface located at:
`/packages/contracts/interfaces/UserProfile.ts`

**Requirements**:

1.  **Source of Truth**: Read all validation rules exclusively from the `@validation` and `@enum` comments in the source interface file.
2.  **Nested Objects**: Correctly implement validation for the nested `address` object.
3.  **Arrays**: Implement validation for the `tags` array, ensuring each element meets its specified string validation rule.
4.  **Cross-Field Validation**: If any cross-field rules are defined (e.g., `age` must be consistent with `dateOfBirth`), implement them using `superRefine`.
5.  **Schema Generation**: Produce a single, exported Zod schema named `userProfileSchema`. This schema should be directly usable in a form component (e.g., with `react-hook-form`).
6.  **Error Messages**: Use the descriptive error messages provided in the validation comments.
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
Develop the React UI component for "UserProfile".

**Source of Truth**:

- Use the data structure defined in the `UserProfile` interface at `/packages/contracts/interfaces/UserProfile.ts`.

**Component Requirements**:

1.  **File Location**: Create the component at `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
2.  **Modes**: The component must support two distinct modes, controlled by an `isEditable` prop (boolean):
    - **Read-Only Mode**: Display all user profile data using appropriate, non-interactive Material-UI components (e.g., `Typography`, `Chip`).
    - **Editable Mode**: Render a form with corresponding Material-UI input components (`TextField`, `DatePicker`, `Select`, `Switch`, etc.) for every field in the interface.
3.  **Data Flow**:
    - Accept a `userProfile` prop containing the data to display or edit.
    - Accept an `onChange` callback function. In editable mode, this function should be called with the entire updated `userProfile` object whenever any form field's value changes.
    - Accept an `onValidityChange` callback. This function should be called with `true` if the form is valid and `false` otherwise, based on the Zod schema.
4.  **Layout**:
    - Use Material-UI's grid system (`Grid`) to create a responsive layout that works well on both desktop and mobile screens.
    - Group related fields logically (e.g., personal details, address, account status).
5.  **Styling**:
    - Adhere to the project's existing styling conventions. Use `sx` prop for component-specific styles.
```

</details>

---

## 4️⃣ Generate Component Mock Data

Creates canonical mock data for all scenarios of a component.

**Output**

- /packages/ui/src/component/{Component}/{Component}.mock.ts

<details>
<summary>Example Prompt For `component-mock-data`</summary>

```markdown
Generate canonical mock data for the "UserProfile" component.

**Sources of Truth**:

1.  **Interface**: `/packages/contracts/interfaces/UserProfile.ts`
2.  **Validation Schema**: `/packages/contracts/validation/UserProfile.schema.ts`

**Output File**:

- `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`

**Requirements**:

1.  **Comprehensive Scenarios**: Create a structured mock data object that covers all validation scenarios. Use a nested structure like `mocks.valid`, `mocks.invalid`, `mocks.edgeCases`.
2.  **Valid Data**:
    - `mocks.valid.admin`: A complete, valid user profile for an 'admin' user.
    - `mocks.valid.viewer`: A complete, valid user profile for a 'viewer' user with some optional fields omitted.
3.  **Invalid Data**:
    - `mocks.invalid.badEmail`: A profile with an invalid email format.
    - `mocks.invalid.tooYoung`: A profile where the age is under 18.
    - `mocks.invalid.longBio`: A profile with a bio exceeding the 250-character limit.
    - `mocks.invalid.badZipCode`: A profile with an incorrectly formatted zip code.
4.  **Edge Cases**:
    - `mocks.edgeCases.allOptionalNull`: A profile where all optional fields are explicitly `null` or `undefined`.
    - `mocks.edgeCases.emptyStrings`: A profile with empty strings for required fields.
5.  **Reusability**: The generated mock data must be easily importable and reusable across Storybook stories, unit tests, and E2E tests.
6.  **Tooling**: Use `faker-js` to generate realistic-looking data.
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
Generate MSW (Mock Service Worker) API handlers for the "UserProfile" component.

**Source of Truth**:

- Mock data from `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`.

**Output File**:

- `/packages/ui/src/component/UserProfile/UserProfile.handlers.ts`

**API Endpoints to Mock**:

- `GET /api/user-profile` (List of users)
- `GET /api/user-profile/:id` (Single user)
- `PUT /api/user-profile/:id` (Update user)
- `POST /api/user-profile` (Create user)

**Requirements**:

1.  **GET (Single User)**:
    - Create a handler for `GET /api/user-profile/:id`.
    - If the ID matches `mocks.valid.admin.id`, return a 200 status with the `mocks.valid.admin` data.
    - If the ID is `'not-found'`, return a 404 status with an error message.
2.  **GET (User List)**:
    - Create a handler for `GET /api/user-profile`.
    - Return a 200 status with an array containing `mocks.valid.admin` and `mocks.valid.viewer`.
3.  **PUT (Update User)**:
    - Create a handler for `PUT /api/user-profile/:id`.
    - If the request body is valid, return a 200 status with the updated data.
    - If the request body is invalid (e.g., `mocks.invalid.badEmail`), return a 400 status with a validation error message.
4.  **POST (Create User)**:
    - Create a handler for `POST /api/user-profile`.
    - If the request is successful, return a 201 status and the newly created user data.
5.  **Organization**: Export all handlers in a single array named `userProfileHandlers`.
```

</details>

---

## 6️⃣ Create Component Stories

Visualizes all component states using mock data.

**Output**

- /packages/ui/src/component/{Component}/{Component}.stories.ts

<details>
<summary>Example Prompt For `component-story`</summary>

```markdown
Generate Storybook stories for the "UserProfile" component.

**Sources of Truth**:

- Component: `UserProfile` from `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
- Props Interface: `UserProfile` from `/packages/contracts/interfaces/UserProfile.ts`.
- Mock Data: All exports from `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`.

**Output File**:

- `/packages/ui/src/component/UserProfile/UserProfile.stories.ts`

**Story Requirements**:

1.  **Default Story**: Create a primary story that renders the component in its most common state, using `mocks.valid.admin` as the default data.
2.  **Modes**:
    - **ReadOnly**: A story that explicitly sets `isEditable={false}`.
    - **Editable**: A story that sets `isEditable={true}`.
3.  **Data Scenarios**:
    - **Invalid State**: A story for the editable form pre-filled with `mocks.invalid.badEmail` to show how validation errors appear.
    - **Viewer Role**: A story showing the read-only view for a 'viewer' user, using `mocks.valid.viewer`.
    - **Empty Optional Fields**: A story showing the read-only view for a user with all optional fields empty, using `mocks.edgeCases.allOptionalNull`.
4.  **Args and Controls**:
    - Pass all component props (`userProfile`, `isEditable`, etc.) through Storybook `args`.
    - Ensure all props are automatically configurable via the Storybook Controls addon.
    - Use the imported mock data objects directly in the `args` for each story.
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
Create API hooks for the "UserProfile" entity using TanStack Query.

**Sources of Truth**:

- Interface: `UserProfile` from `/packages/contracts/interfaces/UserProfile.ts`.
- Zod Schema: `userProfileSchema` from `/packages/contracts/validation/UserProfile.schema.ts`.

**API Endpoints**:

- `GET /api/user-profile` (List)
- `GET /api/user-profile/:id` (Detail)
- `POST /api/user-profile` (Create)
- `PUT /api/user-profile/:id` (Update)
- `DELETE /api/user-profile/:id` (Delete)

**Output File**:

- `/packages/api/UserProfile/UserProfile.api.ts`

**Requirements**:

1.  **`useGetUserProfiles` (List)**:
    - Implement a `useQuery` hook for the list endpoint.
    - Support pagination using parameters from `/packages/config/pagination.ts`.
2.  **`useGetUserProfile` (Detail)**:
    - Implement a `useQuery` hook for the detail endpoint, taking `id` as an argument.
    - The query should be disabled if `id` is falsy.
3.  **`useCreateUserProfile` (Create)**:
    - Implement a `useMutation` hook for creating a new profile.
    - On success, it must invalidate the `useGetUserProfiles` query to refetch the list.
4.  **`useUpdateUserProfile` (Update)**:
    - Implement a `useMutation` hook for updating a profile.
    - On success, it must invalidate both the `useGetUserProfiles` list query and the specific `useGetUserProfile` detail query for the updated `id`.
5.  **`useDeleteUserProfile` (Delete)**:
    - Implement a `useMutation` hook for deleting a profile.
    - On success, it must invalidate the `useGetUserProfiles` list query.
6.  **Caching**:
    - Set a `staleTime` of 60,000 milliseconds (1 minute) for all `useQuery` hooks.
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
Create a container named "UserProfilePage".

This container will orchestrate the display and editing of a user's profile.

**Components to Use**:

- `UserProfile` from `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
- `Button` from `/packages/ui/src/button/Button.tsx`.

**API Hooks to Use**:

- `useGetUserProfile` from `/packages/api/UserProfile/UserProfile.api.ts`.
- `useUpdateUserProfile` from `/packages/api/UserProfile/UserProfile.api.ts`.

**State Management**:

- Use Zustand for state management. Create a store at `/packages/ui/containers/UserProfilePage/UserProfilePage.store.ts`.
- The store should manage `isEditing` (boolean), and the current `userProfile` data being edited.

**Functional Requirements**:

1.  **Data Fetching**: On mount, use the `useGetUserProfile` hook to fetch the profile data for a given `userId` from the URL.
2.  **Initial State**: Display the `UserProfile` component in read-only mode (`isEditable={false}`). Show a loading indicator while data is being fetched. Show an error message on fetch failure.
3.  **Edit Flow**:
    - Include an "Edit" button. When clicked, it should set `isEditing` to `true` in the Zustand store.
    - When `isEditing` is true, render the `UserProfile` component in editable mode (`isEditable={true}`).
    - The editable form should be populated with the data from the store.
4.  **Submission Flow**:
    - While editing, include "Save" and "Cancel" buttons.
    - **Cancel**: Reverts any changes and sets `isEditing` back to `false`.
    - **Save**: Triggers the `useUpdateUserProfile` mutation with the updated profile data from the store. On success, set `isEditing` to `false`. Disable the save button if the form is invalid.
5.  **State Updates**: The container should listen for `onChange` events from the `UserProfile` component and update the Zustand store accordingly.
```

</details>

---

## 9️⃣ Component Unit Tests

Tests component behavior using mock data and handlers.

<details>
<summary>Example Prompt For `component-unit-test`</summary>

```markdown
Write comprehensive unit tests for the "UserProfile" component.

**Scope**:

- This is a UNIT test. Test only the `UserProfile` component in isolation.
- Do not test API logic; assume props are passed correctly.

**Sources of Truth**:

1.  Component Interface: `/packages/contracts/interfaces/UserProfile.ts`
2.  Mock Data: `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`
3.  Component File: `/packages/ui/src/component/UserProfile/UserProfile.tsx`

**Testing Framework & Tools**:

- Vitest
- React Testing Library
- jsdom environment

**Test Cases**:

1.  **Read-Only Mode**:
    - Given `isEditable={false}` and `mocks.valid.admin`, assert that all data (username, email, etc.) is rendered correctly in non-input elements.
    - Assert that input fields (like `textbox`, `combobox`) are NOT present.
2.  **Editable Mode**:
    - Given `isEditable={true}` and `mocks.valid.admin`, assert that all form fields are rendered with their correct initial values.
    - Assert that an `input` with the label "Username" has the value from the mock data.
3.  **User Interaction**:
    - Simulate a user typing a new `firstName` into the corresponding `TextField`.
    - Assert that the `onChange` prop is called with the updated `userProfile` object.
4.  **Validation State**:
    - Given `isEditable={true}`, simulate changing the email to an invalid format.
    - Assert that the `onValidityChange` prop is called with `false`.
    - Simulate changing the email back to a valid format.
    - Assert that the `onValidityChange` prop is called with `true`.
5.  **Props Handling**:
    - Assert that when no `userProfile` prop is provided, the component renders a fallback or empty state without crashing.
```

</details>

---

## 🔟 Container Unit Tests

Tests orchestration logic and cross-component flows.

<details>
<summary>Example Prompt For `container-unit-test`</summary>

```markdown
Write unit tests for the "UserProfilePage" container.

**Scope**:

- Test the container's orchestration logic: data fetching, state changes, and interactions between the `UserProfile` component and the API hooks.
- Mock all external dependencies including API hooks and child components.

**Sources of Truth**:

1.  Container File: `/packages/ui/containers/UserProfilePage/UserProfilePage.tsx`
2.  Component Handlers: `/packages/ui/src/component/UserProfile/UserProfile.handlers.ts`
3.  Mock Data: `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`

**Testing Setup**:

- Use Vitest and React Testing Library.
- Use MSW to mock the API endpoints defined in `UserProfile.handlers.ts`.
- Mock the `UserProfile` component itself (`vi.mock(...)`) to isolate the container's logic. The mock should render its props to allow asserting what the container passes to it.

**Test Cases**:

1.  **Initial Load**:
    - Assert that the container initially calls `useGetUserProfile`.
    - While loading, assert that a loading spinner is displayed.
    - Once loaded, assert that the `UserProfile` mock receives the fetched data and `isEditable={false}`.
2.  **Load Failure**:
    - Configure MSW to return a 404 error for the user profile request.
    - Assert that an error message is displayed to the user.
3.  **Toggle to Edit Mode**:
    - After a successful load, simulate a click on the "Edit" button.
    - Assert that the `UserProfile` mock now receives `isEditable={true}`.
4.  **Update and Save**:
    - In edit mode, simulate the mocked `UserProfile` component calling its `onChange` prop with updated data.
    - Simulate a click on the "Save" button.
    - Assert that the `useUpdateUserProfile` mutation hook is called with the correct payload.
    - On successful mutation, assert that the `UserProfile` mock receives `isEditable={false}` again.
5.  **Cancel Edit**:
    - In edit mode, simulate a change, then simulate a click on the "Cancel" button.
    - Assert that the `UserProfile` mock receives `isEditable={false}`.
    - Assert that the data passed to the `UserProfile` mock is the original, unmodified data, not the changed data.
```

</details>

---

## 1️⃣1️⃣ Container End-to-End Tests

Validates real user journeys using Playwright + MSW.

<details>
<summary>Example Prompt For `container-e2e-test`</summary>

```markdown
Write Playwright end-to-end tests for the "UserProfilePage" user journey.

**Scope**:

- Test the complete user flow from page load to data submission from the perspective of a real user in a browser.
- Use MSW to provide consistent API responses, allowing the test to run without a live backend.

**Sources of Truth**:

1.  Page URL: The Storybook or app URL for the `UserProfilePage` container.
2.  Component Handlers: `/packages/ui/src/component/UserProfile/UserProfile.handlers.ts` (these will be loaded by Playwright).

**Test Scenarios**:

1.  **View Profile Data**:
    - **Arrange**: Start the MSW server with the default `userProfileHandlers`.
    - **Act**: Navigate the browser to the `UserProfilePage`.
    - **Assert**: Verify that the user's first name, last name, and email from `mocks.valid.admin` are visible on the page.
2.  **Full Edit and Save Journey**:
    - **Arrange**: Start with the profile in view mode.
    - **Act**:
      - Click the "Edit" button.
      - Locate the input for "First Name" and type a new name, e.g., "Jane".
      - Locate the input for "Last Name" and type a new name, e.g., "Doette".
      - Click the "Save" button.
    - **Assert**:
      - Verify the page returns to view mode.
      - Verify the text "Jane" and "Doette" are now displayed as part of the profile.
3.  **Attempt to Save Invalid Data**:
    - **Arrange**: Start with the profile in view mode.
    - **Act**:
      - Click the "Edit" button.
      - Locate the email input and clear it, then type "invalid-email".
      - Click the "Save" button.
    - **Assert**:
      - Verify the page remains in edit mode.
      - Verify that a validation error message (e.g., "Must be a valid email address") is now visible near the email input.
4.  **Edit and Cancel Journey**:
    - **Arrange**: Start with the profile in view mode, showing the name "John Doe".
    - **Act**:
      - Click the "Edit" button.
      - Change the "First Name" input to "Richard".
      - Click the "Cancel" button.
    - **Assert**:
      - Verify the page returns to view mode.
      - Verify the name "John Doe" is still displayed, not "Richard".
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
