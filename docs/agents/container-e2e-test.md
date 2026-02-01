# Agent: `container-e2e-test`

## Description

The `container-e2e-test` agent is the final step in the testing process. It generates end-to-end (E2E) tests using Playwright to validate complete user journeys within a container. These tests simulate real user interactions in a browser environment, ensuring that the entire system—from the UI to the mocked API layer—works together as expected.

## Purpose

- **Validates User Journeys**: Tests the full, realistic workflow a user would follow, such as viewing data, entering edit mode, changing values, and saving or canceling the changes.
- **Tests Real Browser Behavior**: Runs tests in a headless Chromium browser using Playwright, providing high confidence that the application works as intended for the end-user.
- **Uses Consistent Mocks**: Leverages the same MSW handlers used in unit and integration tests to ensure that the E2E tests run against a consistent, predictable, and mock backend.
- **Focuses on User-Visible Outcomes**: Interacts with the page using user-centric selectors (roles, labels, text) and asserts only on visible outcomes, making the tests resilient to implementation changes.

## Inputs

- The name of the container for which to generate E2E tests.

## Outputs

- **/apps/e2e/specs/{ContainerName}.e2e.spec.ts**: A Playwright test file containing the end-to-end tests.

## Example Prompt

This is the standardized prompt for generating E2E tests for the `UserProfilePage` container.

```markdown
Write Playwright end-to-end tests for the "UserProfilePage" user journey.

**Scope**:
-   Test the complete user flow from page load to data submission from the perspective of a real user in a browser.
-   Use MSW to provide consistent API responses, allowing the test to run without a live backend.

**Sources of Truth**:
1.  Page URL: The Storybook or app URL for the `UserProfilePage` container.
2.  Component Handlers: `/packages/ui/src/component/UserProfile/UserProfile.handlers.ts` (these will be loaded by Playwright).

**Test Scenarios**:

1.  **View Profile Data**:
    *   **Arrange**: Start the MSW server with the default `userProfileHandlers`.
    *   **Act**: Navigate the browser to the `UserProfilePage`.
    *   **Assert**: Verify that the user's first name, last name, and email from `mocks.valid.admin` are visible on the page.
2.  **Full Edit and Save Journey**:
    *   **Arrange**: Start with the profile in view mode.
    *   **Act**:
        *   Click the "Edit" button.
        *   Locate the input for "First Name" and type a new name, e.g., "Jane".
        *   Locate the input for "Last Name" and type a new name, e.g., "Doette".
        *   Click the "Save" button.
    *   **Assert**:
        *   Verify the page returns to view mode.
        *   Verify the text "Jane" and "Doette" are now displayed as part of the profile.
3.  **Attempt to Save Invalid Data**:
    *   **Arrange**: Start with the profile in view mode.
    *   **Act**:
        *   Click the "Edit" button.
        *   Locate the email input and clear it, then type "invalid-email".
        *   Click the "Save" button.
    *   **Assert**:
        *   Verify the page remains in edit mode.
        *   Verify that a validation error message (e.g., "Must be a valid email address") is now visible near the email input.
4.  **Edit and Cancel Journey**:
    *   **Arrange**: Start with the profile in view mode, showing the name "John Doe".
    *   **Act**:
        *   Click the "Edit" button.
        *   Change the "First Name" input to "Richard".
        *   Click the "Cancel" button.
    *   **Assert**:
        *   Verify the page returns to view mode.
        *   Verify the name "John Doe" is still displayed, not "Richard".
```
