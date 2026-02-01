# Agent: `component-api`

## Description

The `component-api` agent is responsible for generating the data access layer for a component. It creates a set of custom React hooks using TanStack Query to handle all interactions with the component's corresponding API endpoints, including data fetching, caching, and mutations.

## Purpose

- **Abstracts API Logic**: Encapsulates all API-related logic into a set of reusable hooks, keeping the UI components clean and free of data-fetching code.
- **Manages Server State**: Leverages TanStack Query to handle caching, background refetching, and invalidation of server state.
- **Standardizes Data Access**: Creates a consistent set of hooks (`useGetList`, `useGetById`, `useCreate`, `useUpdate`, `useDelete`) for every component domain.
- **Implements Best Practices**: The generated hooks include standard practices like pagination support, request/response validation with Zod, and intelligent cache invalidation on mutations.

## Inputs

- The name of the component domain.
- The path to the component's TypeScript interface.
- The path to the component's Zod validation schema.
- A list of the API endpoints to be implemented.

## Outputs

- **/packages/api/{ComponentName}/{ComponentName}.api.ts**: A file exporting the TanStack Query hooks for the component.

## Example Prompt

This is the standardized prompt for creating the API hooks for the `UserProfile` entity.

```markdown
Create API hooks for the "UserProfile" entity using TanStack Query.

**Sources of Truth**:
-   Interface: `UserProfile` from `/packages/contracts/interfaces/UserProfile.ts`.
-   Zod Schema: `userProfileSchema` from `/packages/contracts/validation/UserProfile.schema.ts`.

**API Endpoints**:
-   `GET /api/user-profile` (List)
-   `GET /api/user-profile/:id` (Detail)
-   `POST /api/user-profile` (Create)
-   `PUT /api/user-profile/:id` (Update)
-   `DELETE /api/user-profile/:id` (Delete)

**Output File**:
-   `/packages/api/UserProfile/UserProfile.api.ts`

**Requirements**:

1.  **`useGetUserProfiles` (List)**:
    *   Implement a `useQuery` hook for the list endpoint.
    *   Support pagination using parameters from `/packages/config/pagination.ts`.
2.  **`useGetUserProfile` (Detail)**:
    *   Implement a `useQuery` hook for the detail endpoint, taking `id` as an argument.
    *   The query should be disabled if `id` is falsy.
3.  **`useCreateUserProfile` (Create)**:
    *   Implement a `useMutation` hook for creating a new profile.
    *   On success, it must invalidate the `useGetUserProfiles` query to refetch the list.
4.  **`useUpdateUserProfile` (Update)**:
    *   Implement a `useMutation` hook for updating a profile.
    *   On success, it must invalidate both the `useGetUserProfiles` list query and the specific `useGetUserProfile` detail query for the updated `id`.
5.  **`useDeleteUserProfile` (Delete)**:
    *   Implement a `useMutation` hook for deleting a profile.
    *   On success, it must invalidate the `useGetUserProfiles` list query.
6.  **Caching**:
    *   Set a `staleTime` of 60,000 milliseconds (1 minute) for all `useQuery` hooks.
```
