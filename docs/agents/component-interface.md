# Agent: `component-interface`

## Description

The `component-interface` agent is the first step in the UI development workflow. It takes a high-level, natural language description of a component and generates the foundational TypeScript contracts. Its most critical task is creating a TypeScript interface with structured validation comments, which serve as the single source of truth for the component's data shape and rules.

## Purpose

- **Initializes Component Contracts**: Scaffolds the necessary files for a new component.
- **Defines Data Shape**: Creates a strict TypeScript interface (`*.ts`) that defines the props for the component.
- **Captures Validation Intent**: Translates natural language validation rules (e.g., "must be a valid email") into structured `@validation` comments within the interface file. These comments are machine-readable and used by the `component-validations` agent.

## Inputs

- A plain-text description of the component, including its name, fields, and validation requirements.

## Outputs

- **/packages/contracts/interfaces/{ComponentName}.ts**: A fully implemented TypeScript interface with structured validation comments.
- **/packages/contracts/{ComponentName}/{ComponentName}.request.ts**: A scaffolded (comment-only) file for API request types.
- **/packages/contracts/{ComponentName}/{ComponentName}.response.ts**: A scaffolded (comment-only) file for API response types.
- **/packages/ui/src/component/{ComponentName}/{ComponentName}.tsx**: A scaffolded (comment-only) file for the React component.
- **/packages/ui/src/component/{ComponentName}/{ComponentName}.stories.tsx**: A scaffolded (comment-only) file for the Storybook stories.
- **/packages/ui/src/component/{ComponentName}/{ComponentName}.types.ts**: A scaffolded (comment-only) file for additional component types.

## Example Prompt

This is the standardized prompt for creating the `UserProfile` component interface.

```markdown
Create a TypeScript interface named "UserProfile". This interface will be the single source of truth for the User Profile data contract.

It must include the following properties with clear validation rules in comments, which will be used later to generate a Zod schema.

- **`id`**: `string`.
  - `@validation required`.
  - `@validation uuid The user's unique identifier.`.
- **`username`**: `string`.
  - `@validation required`.
  - `@validation min 3 Must be at least 3 characters.`.
  - `@validation max 20 Cannot exceed 20 characters.`.
- **`firstName`**: `string`.
  - `@validation required`.
- **`lastName`**: `string`.
  - `@validation required`.
- **`email`**: `string`.
  - `@validation required`.
  - `@validation email Must be a valid email address.`.
- **`bio`**: `string`.
  - `@validation optional`.
  - `@validation max 250 Bio cannot exceed 250 characters.`.
- **`avatarUrl`**: `string`.
  - `@validation optional`.
  - `@validation url Must be a valid URL.`.
- **`dateOfBirth`**: `Date`.
  - `@validation required`.
  - `@validation past The date of birth must be in the past.`.
- **`age`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 18 User must be at least 18 years old.`.
- **`followers`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 0 Cannot be negative.`.
- **`following`**: `number`.
  - `@validation required`.
  - `@validation int Must be an integer.`.
  - `@validation min 0 Cannot be negative.`.
- **`isActive`**: `boolean`.
  - `@validation required`.
  - `@default true`.
- **`website`**: `string`.
  - `@validation optional`.
  - `@validation url Must be a valid URL.`.
- **`address`**: `object`.
  - `@validation required`.
  - **`street`**: `string`, `@validation required`.
  - **`city`**: `string`, `@validation required`.
  - **`zipCode`**: `string`.
    - `@validation required`.
    - `@validation regex /^\d{5}$/ Must be a 5-digit US zip code.`.
  - **`country`**: `string`, `@validation required`.
- **`tags`**: `array` of `string`.
  - `@validation optional`.
  - `@validation arrayStringEach singleWord Each tag must be a single word.`.
- **`role`**: `enum`.
  - `@validation required`.
  - `@enum admin | editor | viewer`.
- **`lastLogin`**: `Date`.
  - `@validation optional`.
  - `@validation past Must be a past datetime.`.
```
