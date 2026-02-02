# Agent: `component-develop`

## Description

The `component-develop` agent is a powerful tool responsible for generating a complete, pure, presentational React component using Material-UI. It creates a component that has two modes: a `readonly` view for displaying data, and a validation-aware `editable` mode for modifying data, powered by `React Hook Form`.

This agent is central to the workflow, taking the data contracts and validation schemas from previous steps and producing a fully functional UI component.

## Purpose

- **Generates UI Code**: Creates the `.tsx` file for a React component.
- **Enforces Separation of Concerns**: The generated component is purely presentational (`dumb`). It contains no business logic, data fetching, or global state management.
- **Builds Integrated Forms**: For its `editable` mode, it uses `React Hook Form` and the component's `Zod` schema (via `zodResolver`) to create a robust and validation-aware form.
- **Supports Multiple Modes**: The component is built to support both a `readonly` view and an `editable` form view, controlled by an `isEditable` prop.
- **Standardizes Data Flow**: Implements a standard pattern of receiving data and validity state via props, and emitting changes via callbacks (`onChange`, `onValidityChange`).

## Inputs

- The name of the component.
- The agent will automatically reference the component's TypeScript interface and Zod validation schema.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.tsx**: The implemented React component file.

## Example Prompt

This is the standardized prompt for developing the `UserProfile` React component.

```markdown
Develop the React UI component for "UserProfile".

**Source of Truth**:
-   Use the data structure defined in the `UserProfile` interface at `/packages/contracts/interfaces/UserProfile.ts`.
-   Use the Zod schema from `/packages/contracts/validation/UserProfile.schema.ts`.

**Component Requirements**:

1.  **File Location**: Create the component at `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
2.  **Modes**: The component must support two distinct modes, controlled by an `isEditable` prop (boolean):
    *   **Read-Only Mode**: Display all user profile data using appropriate, non-interactive Material-UI components (e.g., `Typography`, `Chip`).
    *   **Editable Mode**: Render a form using `React Hook Form` and `zodResolver` for validation. All inputs must be MUI components wrapped in an RHF `Controller`.
3.  **Data Flow**:
    *   Accept a `userProfile` prop containing the data to display or edit.
    *   Accept an `onChange` callback function. In editable mode, this function should be called with the entire updated `userProfile` object whenever any form field's value changes.
    *   Accept an `onValidityChange` callback. This function should be called with `true` if the form is valid and `false` otherwise, based on the form's state.
4.  **Layout**:
    *   Use Material-UI's grid system (`Grid`) to create a responsive layout that works well on both desktop and mobile screens.
    *   Group related fields logically (e.g., personal details, address, account status).
```
