# Agent: `component-story`

## Description

The `component-story` agent generates stories for a React component in Storybook. It uses the component's props interface and the canonical mock data to create a visual representation of the component in all its different states. This is a crucial step for visual testing, design reviews, and interactive documentation.

## Purpose

- **Visualizes Component States**: Creates stories that showcase the component with valid data, invalid data, empty states, and various edge cases.
- **Enables Interactive Development**: The generated stories use Storybook's "Controls" addon, allowing developers and designers to interactively modify component props and see the results in real-time.
- **Follows Component Story Format (CSF)**: Generates stories using the modern, export-based CSF standard.
- **Uses Canonical Data**: Ensures that the component visualizations in Storybook are based on the same mock data used in automated tests.

## Inputs

- The name of the component.
- The path to the component's props interface.
- The path to the component's mock data file.

## Outputs

- **/packages/ui/src/component/{ComponentName}/{ComponentName}.stories.ts**: A Storybook stories file.

## Example Prompt

This is the standardized prompt for generating stories for the `UserProfile` component.

```markdown
Generate Storybook stories for the "UserProfile" component.

**Sources of Truth**:
-   Component: `UserProfile` from `/packages/ui/src/component/UserProfile/UserProfile.tsx`.
-   Props Interface: `UserProfile` from `/packages/contracts/interfaces/UserProfile.ts`.
-   Mock Data: All exports from `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`.

**Output File**:
-   `/packages/ui/src/component/UserProfile/UserProfile.stories.ts`

**Story Requirements**:

1.  **Default Story**: Create a primary story that renders the component in its most common state, using `mocks.valid.admin` as the default data.
2.  **Modes**:
    *   **ReadOnly**: A story that explicitly sets `isEditable={false}`.
    *   **Editable**: A story that sets `isEditable={true}`.
3.  **Data Scenarios**:
    *   **Invalid State**: A story for the editable form pre-filled with `mocks.invalid.badEmail` to show how validation errors appear.
    *   **Viewer Role**: A story showing the read-only view for a 'viewer' user, using `mocks.valid.viewer`.
    *   **Empty Optional Fields**: A story showing the read-only view for a user with all optional fields empty, using `mocks.edgeCases.allOptionalNull`.
4.  **Args and Controls**:
    *   Pass all component props (`userProfile`, `isEditable`, etc.) through Storybook `args`.
    *   Ensure all props are automatically configurable via the Storybook Controls addon.
    *   Use the imported mock data objects directly in the `args` for each story.
```
