# Agent: `component-develop`

## Description

The `component-develop` agent generates a pure, presentational React component using Material-UI. It strictly adheres to the data contract defined in the component's TypeScript interface and is designed to be controlled by a parent container component.

## Purpose

- **Generates UI Code**: Creates the `.tsx` file for a React component.
- **Enforces Separation of Concerns**: The generated component is purely presentational (`dumb`). It contains no business logic, data fetching, or global state management.
- **Supports Multiple Modes**: The component is built to support both a `readonly` view and an `editable` form view, controlled by an `isEditable` prop.
- **Standardizes Data Flow**: Implements a standard pattern of receiving data and validity state via props, and emitting changes via callbacks (`onChange`, `onValidityChange`).

## Inputs

- The name of the component.
- The path to the component's TypeScript interface file.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.tsx**: The implemented React component file.

## Example Prompt

This is the standardized prompt for developing the `UserProfile` React component.

```markdown
Develop the React UI component for "UserProfile".

**Source of Truth**:
-   Use the data structure defined in the `UserProfile` interface at `/packages/contracts/interfaces/UserProfile.ts`.

**Component Requirements**:

1.  **File Location**: Create the component at `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
2.  **Modes**: The component must support two distinct modes, controlled by an `isEditable` prop (boolean):
    *   **Read-Only Mode**: Display all user profile data using appropriate, non-interactive Material-UI components (e.g., `Typography`, `Chip`).
    *   **Editable Mode**: Render a form with corresponding Material-UI input components (`TextField`, `DatePicker`, `Select`, `Switch`, etc.) for every field in the interface.
3.  **Data Flow**:
    *   Accept a `userProfile` prop containing the data to display or edit.
    *   Accept an `onChange` callback function. In editable mode, this function should be called with the entire updated `userProfile` object whenever any form field's value changes.
    *   Accept an `onValidityChange` callback. This function should be called with `true` if the form is valid and `false` otherwise, based on the Zod schema.
4.  **Layout**:
    *   Use Material-UI's grid system (`Grid`) to create a responsive layout that works well on both desktop and mobile screens.
    *   Group related fields logically (e.g., personal details, address, account status).
5.  **Styling**:
    *   Adhere to the project's existing styling conventions. Use `sx` prop for component-specific styles.
```
