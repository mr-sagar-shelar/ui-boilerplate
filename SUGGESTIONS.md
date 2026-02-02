# Agent Prompt Suggestions

This document contains a review of the AI agent prompts located in the `.github/agents` directory. It highlights discrepancies between agent instructions and provides suggestions for improvement to create a more consistent, clear, and efficient workflow.

---

##  हाई-लेवल के सुझाव

The most significant issue is the conflicting responsibilities between the `component-develop` and `component-form` agents. The `Figma_To_UI_AI_Workflow.md` does not include the `component-form` agent, indicating it's either deprecated or intended for a different, undocumented workflow.

**Recommendation:**

1.  **Clarify the Role of `component-form`**: Decide on a single path for form generation.
    *   **Option A (Recommended)**: Deprecate the `component-form` agent. Enhance the `component-develop` agent to explicitly use `React Hook Form` and `zodResolver` when generating its "editable" mode. This creates a single, streamlined path for component creation.
    *   **Option B**: Keep both agents but clearly define their roles. For example, `component-develop` creates only the pure, uncontrolled UI elements, and `component-form` is a separate, subsequent step that wraps them with `React Hook Form` `Controller` components. This would require updating the main workflow document.

---

## Agent-Specific Feedback

### 1. `component-interface`

-   **Inconsistency**: The validation comment format described in this agent's prompt is verbose and differs from the more direct, actionable format used in the updated `Figma_To_UI_AI_Workflow.md` examples. The old format specified a multi-line block with `type:` and `rules:`, whereas the new examples use single, direct lines like `@validation min 3 Must be at least 3 characters.`.
-   **Suggestion**: Update the `component-interface` prompt to enforce the simpler, direct `@validation` comment style. This makes the prompt easier for the LLM to parse and aligns it with the `component-validations` agent's expectations.

-   **Inconsistency**: The prompt states the output interface should be named `{COMPONENT_NAME}Props`, but downstream agents and examples refer to the interface simply as `{COMPONENT_NAME}`.
-   **Suggestion**: Standardize the interface name to be `{COMPONENT_NAME}` for consistency across the entire workflow. For example, `interface UserProfile { ... }` not `interface UserProfileProps { ... }`.

### 2. `component-validations`

-   **Improvement**: The prompt mentions that a helper file can be created at `/packages/contracts/validation/helper.ts`. This is good practice for shared validation logic (e.g., `isPastDate`).
-   **Suggestion**: Explicitly state that if a helper function is needed and the file doesn't exist, the agent should create it. This makes the instruction more robust.

### 3. `component-mock-data`

-   **Inconsistency**: The prompt specifies the output file as `{COMPONENT_NAME}.mock-data.ts`. However, the workflow document examples now use `{ComponentName}.mock.ts`. Other generated files follow a similar pattern (e.g., `.stories.ts`, `.handlers.ts`).
-   **Suggestion**: Change the output file name in the agent prompt to `{COMPONENT_NAME}.mock.ts` to align with the naming convention of other test-related artifacts.

### 4. `component-api`

-   **Improvement**: The agent is instructed to place common constants in `/packages/api/constants.ts`. This is a good, reusable pattern.
-   **Suggestion**: No change needed, but this is a good example of a cross-cutting concern that is well-defined in one agent. Ensure other agents that might need shared constants are aware of this location.

### 5. `component-form`

-   **Discrepancy (Major)**: As noted in the high-level summary, this agent's entire purpose overlaps significantly with the "editable" mode responsibility of the `component-develop` agent. It creates confusion about which agent should be used to create forms.
-   **Suggestion**: Address this via the high-level recommendation to either merge its responsibilities into `component-develop` or clearly define a multi-step process where `component-develop` builds the UI and `component-form` adds the form logic.
