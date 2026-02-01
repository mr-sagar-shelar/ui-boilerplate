# Agent: `container-unit-test`

## Description

The `container-unit-test` agent generates unit tests for a container component. Unlike component unit tests, which focus on rendering and user interaction within a single component, these tests focus on the container's orchestration logic. They validate that the container correctly manages state, responds to events from child components, and interacts with API hooks as expected.

## Purpose

- **Tests Orchestration Logic**: Verifies that the container correctly fetches data, manages the `isEditing` state, and coordinates the submission and cancel flows.
- **Mocks Child Components**: Mocks the actual UI components to isolate the container's logic. The tests assert that the container passes the correct props (e.g., `isEditable`, data) to its children.
- **Uses Scenario-Based API Mocks**: Leverages the same MSW handlers used by other tests to simulate different API outcomes (success, failure, etc.) and asserts that the container's UI and state respond correctly.

## Inputs

- The name of the container to be tested.

## Outputs

- **/packages/ui/containers/{ContainerName}/{ContainerName}.unit.test.ts**: A Vitest test file containing the unit tests for the container.

## Example Prompt

This is the standardized prompt for generating unit tests for the `UserProfilePage` container.

```markdown
Write unit tests for the "UserProfilePage" container.

**Scope**:
-   Test the container's orchestration logic: data fetching, state changes, and interactions between the `UserProfile` component and the API hooks.
-   Mock all external dependencies including API hooks and child components.

**Sources of Truth**:
1.  Container File: `/packages/ui/containers/UserProfilePage/UserProfilePage.tsx`
2.  Component Handlers: `/packages/ui/src/component/UserProfile/UserProfile.handlers.ts`
3.  Mock Data: `/packages/ui/src/component/UserProfile/UserProfile.mock.ts`

**Testing Setup**:
-   Use Vitest and React Testing Library.
-   Use MSW to mock the API endpoints defined in `UserProfile.handlers.ts`.
-   Mock the `UserProfile` component itself (`vi.mock(...)`) to isolate the container's logic. The mock should render its props to allow asserting what the container passes to it.

**Test Cases**:

1.  **Initial Load**:
    *   Assert that the container initially calls `useGetUserProfile`.
    *   While loading, assert that a loading spinner is displayed.
    *   Once loaded, assert that the `UserProfile` mock receives the fetched data and `isEditable={false}`.
2.  **Load Failure**:
    *   Configure MSW to return a 404 error for the user profile request.
    *   Assert that an error message is displayed to the user.
3.  **Toggle to Edit Mode**:
    *   After a successful load, simulate a click on the "Edit" button.
    *   Assert that the `UserProfile` mock now receives `isEditable={true}`.
4.  **Update and Save**:
    *   In edit mode, simulate the mocked `UserProfile` component calling its `onChange` prop with updated data.
    *   Simulate a click on the "Save" button.
    *   Assert that the `useUpdateUserProfile` mutation hook is called with the correct payload.
    *   On successful mutation, assert that the `UserProfile` mock receives `isEditable={false}` again.
5.  **Cancel Edit**:
    *   In edit mode, simulate a change, then simulate a click on the "Cancel" button.
    *   Assert that the `UserProfile` mock receives `isEditable={false}`.
    *   Assert that the data passed to the `UserProfile` mock is the original, unmodified data, not the changed data.
```
