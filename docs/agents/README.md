# AI Agents

This directory contains the documentation for the AI agents used in this monorepo. Each agent is a specialized AI assistant designed to perform a specific task in the UI development workflow.

The agents are designed to be used in a specific sequence, as outlined in the [Figma to UI AI Workflow](../Figma_To_UI_AI_Workflow.md). This ensures that all necessary artifacts (interfaces, validation schemas, mock data, etc.) are generated before they are needed by subsequent agents.

## Available Agents

Here is a list of the available agents and their primary responsibilities:

### Component-Level Agents

These agents operate on individual UI components.

- **[component-interface](./component-interface.md)**: Creates the initial TypeScript interface for a component from a high-level description.
- **[component-validations](./component-validations.md)**: Generates a Zod validation schema from the validation rules defined in the component's interface.
- **[component-develop](./component-develop.md)**: Develops the React UI component using Material UI, based on the component's interface, including a validation-aware editable mode.
- **[component-mock-data](./component-mock-data.md)**: Creates mock data for various scenarios (valid, invalid, empty, edge cases).
- **[component-handlers](./component-handlers.md)**: Generates MSW (Mock Service Worker) handlers for the component's API endpoints.
- **[component-story](./component-story.md)**: Creates Storybook stories for the component to visualize its different states.
- **[component-api](./component-api.md)**: Generates TanStack Query hooks for the component's API endpoints.
- **[component-unit-test](./component-unit-test.md)**: Creates unit tests for the component.

### Container-Level Agents

These agents operate on container components, which orchestrate multiple UI components.

- **[container](./container.md)**: Creates a container component that manages state and coordinates multiple UI components.
- **[container-unit-test](./container-unit-test.md)**: Creates unit tests for the container component.
- **[container-e2e-test](./container-e2e-test.md)**: Creates end-to-end tests for the container's user journeys.

