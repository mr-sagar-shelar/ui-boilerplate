# Agent: `component-validations`

## Description

The `component-validations` agent is responsible for creating a runtime validation schema based on the static TypeScript interface created by the `component-interface` agent. It reads the structured `@validation` comments from the interface file and translates them into a Zod schema.

## Purpose

- **Automates Validation Logic**: Prevents manual duplication of validation rules between static types and runtime logic.
- **Ensures Consistency**: Guarantees that the runtime validation schema is always in sync with the TypeScript interface.
- **Generates Zod Schema**: Produces a `*.schema.ts` file containing a Zod object schema that can be used for form validation, API input validation, and more.

## Inputs

- The path to a TypeScript interface file that contains structured `@validation` comments.

## Outputs

- **/packages/contracts/validation/{ComponentName}.schema.ts**: A TypeScript file exporting a Zod schema and its inferred type.

## Example Prompt

This is the standardized prompt for generating the Zod schema for the `UserProfile` component.

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
