# Agent: `component-unit-test`

## Description

The `component-unit-test` agent generates unit tests for a single, isolated UI component. It focuses on testing the component's behavior in response to props changes and user interactions, using the canonical mock data and MSW handlers to create a controlled test environment.

## Purpose

- **Validates Component Behavior**: Creates tests to verify that the component renders correctly in its different modes (`readonly`, `editable`) and that it emits the correct data when users interact with it.
- **Enforces Test Isolation**: Generates true unit tests that focus solely on the component, mocking any external dependencies like API calls.
- **Uses Scenario-Based Testing**: Leverages the pre-defined mock data scenarios (`valid`, `invalid`, etc.) and their corresponding MSW handlers to test the component's response to different situations.
- **Follows Best Practices**: Adheres to the Arrange-Act-Assert pattern, uses accessible queries from React Testing Library, and avoids implementation-detail testing.

## Inputs

- The name of the component to be tested.
- The agent will automatically reference the component's interface, mock data, and MSW handlers.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.unit.test.tsx**: A Vitest test file containing the unit tests for the component.

## Example Prompt

This is the standardized prompt for generating unit tests for the `UserProfile` component.

```markdown
Write comprehensive unit tests for the "UserProfile" component.

**Scope**:
-   This is a UNIT test. Test only the `UserProfile` component in isolation.
-   Do not test API logic; assume props are passed correctly.

**Sources of Truth**:
1.  Component Interface: `/packages/contracts/interfaces/UserProfile.ts`
2.  Mock Data: `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`
3.  Component File: `/packages/ui/src/component/UserProfile/UserProfile.tsx`

**Testing Framework & Tools**:
-   Vitest
-   React Testing Library
-   jsdom environment

**Test Cases**:

1.  **Read-Only Mode**:
    *   Given `isEditable={false}` and `mocks.valid.admin`, assert that all data (username, email, etc.) is rendered correctly in non-input elements.
    *   Assert that input fields (like `textbox`, `combobox`) are NOT present.
2.  **Editable Mode**:
    *   Given `isEditable={true}` and `mocks.valid.admin`, assert that all form fields are rendered with their correct initial values.
    *   Assert that an `input` with the label "Username" has the value from the mock data.
3.  **User Interaction**:
    *   Simulate a user typing a new `firstName` into the corresponding `TextField`.
    *   Assert that the `onChange` prop is called with the updated `userProfile` object.
4.  **Validation State**:
    *   Given `isEditable={true}`, simulate changing the email to an invalid format.
    *   Assert that the `onValidityChange` prop is called with `false`.
    *   Simulate changing the email back to a valid format.
    *   Assert that the `onValidityChange` prop is called with `true`.
5.  **Props Handling**:
    *   Assert that when no `userProfile` prop is provided, the component renders a fallback or empty state without crashing.
```
