# Agent: `component-form`

## Description

The `component-form` agent specializes in creating robust, responsive, and validation-aware forms. It leverages `React Hook Form` and the previously generated `Zod` schema to build a form component that is tightly integrated with the project's data contracts and API submission logic.

## Purpose

- **Automates Form Creation**: Generates a complete form component, including field rendering, validation integration, and submission handling.
- **Integrates Validation**: Uses the `zodResolver` from `@hookform/resolvers/zod` to connect the form's state to the Zod validation schema, providing real-time validation feedback.
- **Manages Submission Lifecycle**: Implements the logic for handling form submission, including disabling buttons during API calls and displaying success or error messages.
- **Enforces Accessibility and Responsiveness**: Builds the form with Material-UI's `Grid` system for a responsive layout and ensures all inputs are accessible.

## Inputs

- The name of the component.
- The path to the component's TypeScript interface.
- The path to the component's Zod schema.
- The path to the component's API request/response contracts.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.form.tsx**: The implemented form component.

## Example Prompt

While the `Figma_To_UI_AI_Workflow.md` uses the `component-develop` agent to create a component with both read-only and editable modes, the `component-form` agent could be used to generate a more complex, standalone form. Here is an example of how it might be prompted:

```markdown
Generate a form component for "UserProfile".

**Sources of Truth**:
- **Interface**: `/packages/contracts/interfaces/UserProfile.ts`
- **Zod Schema**: `/packages/contracts/validation/UserProfile.schema.ts`
- **API Contract**: `/packages/api/UserProfile/UserProfile.api.ts`

**Requirements**:

1.  **Frameworks**: Use `React Hook Form` with the `zodResolver` for validation. Use Material-UI for all form components.
2.  **Field Generation**: Create a controlled input for every field defined in the `UserProfile` interface.
3.  **Validation**:
    *   Validation mode must be `onChange`.
    *   Display validation error messages below each field.
4.  **Submission**:
    *   The "Submit" button must be disabled if the form is invalid or if a submission is in progress.
    *   On submit, call the API using the functions defined in the API contract.
    *   Display a general API error message below the form actions if the submission fails.
5.  **Layout**: Use the MUI `Grid` component to create a responsive, two-column layout on larger screens.
```
