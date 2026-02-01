# Agent: `component-mock-data`

## Description

The `component-mock-data` agent generates a comprehensive set of mock data for a component. This data is canonical and is reused across unit tests, end-to-end tests, and Storybook stories, ensuring that all parts of the system are tested against the same consistent scenarios.

## Purpose

- **Creates a Single Source of Truth for Test Data**: Centralizes all mock data into a single, version-controlled file.
- **Ensures Comprehensive Test Coverage**: Generates data for a wide range of scenarios, including valid "happy path" cases, specific invalid cases for each validation rule, empty states, and edge cases.
- **Drives Scenario-Based Testing**: The structured output (`valid`, `invalid`, `empty`, `edgeCases`) allows tests to easily import and use the exact data needed for a specific scenario.

## Inputs

- The name of the component.
- The agent will automatically reference the component's interface and Zod validation schema.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.mock.ts**: A file exporting a structured object containing all mock data scenarios.

## Example Prompt

This is the standardized prompt for generating mock data for the `UserProfile` component.

```markdown
Generate canonical mock data for the "UserProfile" component.

**Sources of Truth**:
1.  **Interface**: `/packages/contracts/interfaces/UserProfile.ts`
2.  **Validation Schema**: `/packages/contracts/validation/UserProfile.schema.ts`

**Output File**:
-   `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`

**Requirements**:

1.  **Comprehensive Scenarios**: Create a structured mock data object that covers all validation scenarios. Use a nested structure like `mocks.valid`, `mocks.invalid`, `mocks.edgeCases`.
2.  **Valid Data**:
    *   `mocks.valid.admin`: A complete, valid user profile for an 'admin' user.
    *   `mocks.valid.viewer`: A complete, valid user profile for a 'viewer' user with some optional fields omitted.
3.  **Invalid Data**:
    *   `mocks.invalid.badEmail`: A profile with an invalid email format.
    *   `mocks.invalid.tooYoung`: A profile where the age is under 18.
    *   `mocks.invalid.longBio`: A profile with a bio exceeding the 250-character limit.
    *   `mocks.invalid.badZipCode`: A profile with an incorrectly formatted zip code.
4.  **Edge Cases**:
    *   `mocks.edgeCases.allOptionalNull`: A profile where all optional fields are explicitly `null` or `undefined`.
    *   `mocks.edgeCases.emptyStrings`: A profile with empty strings for required fields.
5.  **Reusability**: The generated mock data must be easily importable and reusable across Storybook stories, unit tests, and E2E tests.
6.  **Tooling**: Use `faker-js` to generate realistic-looking data.
```
