# Example Prompts

## @init-component example 1

Create a component named "UserProfile".

The component accepts the following data:

1. User identifiers

- userId: unique identifier, string, required
- externalRefId: optional identifier, string

2. Personal information

- firstName: string, required
- lastName: string, required
- middleName: optional string
- fullName: derived display value, string, readonly
- dateOfBirth: date, must be a valid past date
- age: number, must be greater than or equal to 18

3. Contact details

- email: string, must be a valid email format
- phoneNumber: string, optional, digits only
- isEmailVerified: boolean
- isPhoneVerified: boolean

4. Address information

- address: object
  - streetLine1: string
  - streetLine2: optional string
  - city: string
  - state: string
  - postalCode: string
  - country: string (ISO 2-letter country code)

5. Role and access

- role: enum, allowed values are admin, analyst, user, guest
- permissions: array of strings
- isActive: boolean
- accountStatus: enum, one of ACTIVE, SUSPENDED, DELETED

6. Preferences

- preferredLanguage: enum, one of en, fr, de, es
- preferredTheme: enum, light or dark
- notificationChannels: array, allowed values email, sms, push

7. Financial information

- annualIncome: number, must be greater than 0
- creditScore: number, range between 300 and 900
- isKycCompleted: boolean

8. Dates and audit fields

- createdAt: datetime, ISO 8601 string
- updatedAt: datetime, ISO 8601 string
- lastLoginAt: optional datetime

9. Flags and toggles

- isReadonly: boolean
- isEditable: boolean

10. Metadata

- tags: array of strings
- notes: optional string, max length 500 characters

11. Nested collections

- dependents: array of objects
  - name: string
  - relationship: enum, spouse or child
  - dateOfBirth: date

12. UI-specific behavior hints

- showAdvancedSection: boolean
- layoutVariant: enum, compact or expanded

## @init-component example 2

Create component named "UserProfile".

Fields:

- userId: string, required, must be uuid
- firstName: string, required
- lastName: string, required
- email: string, must be valid email
- dateOfBirth: date, must be past date
- age: number, minimum 18
- role: enum, admin | analyst | user
- phoneNumber: optional string, digits only
- isActive: boolean
- createdAt: datetime, required

## @validation example

Generate Zod validation schema for component "UserProfile"
using the interface defined in:

/packages/contracts/interfaces/UserProfile.ts

Requirements:

- Read validation rules ONLY from @validation comments
- Implement nested object validations
- Implement array item validations
- Implement cross-field validations if present
- Generate form-level schema suitable for UI forms
- Follow standard error message conventions

## API example

Create API hooks for component "UserProfile".

Use:

- Interface from /packages/contracts/interfaces/UserProfile.ts
- Zod schema from /packages/contracts/validation/UserProfile.schema.ts

API endpoints:

- GET /api/user-profile
- GET /api/user-profile/{id}
- POST /api/user-profile
- PUT /api/user-profile/{id}
- DELETE /api/user-profile/{id}

Requirements:

- Enable pagination for GET list
- Use shared pagination config
- Cache responses in memory for 1 minute
- Invalidate list and detail queries on mutation

## @form example

Create a responsive form component for the "UserProfile" component.

Context:

- This form is used to CREATE or UPDATE a user profile.
- It must strictly follow existing contracts and validations.
- No new fields or rules should be introduced.

Use the following sources as the single source of truth:

1. Component interface:
   /packages/contracts/interfaces/UserProfile.ts

2. Zod validation schema:
   /packages/contracts/validation/UserProfile.schema.ts

3. API contracts:
   /packages/contracts/UserProfile/UserProfile.request.ts
   /packages/contracts/UserProfile/UserProfile.response.ts

API details:

- Endpoint: POST /api/user-profile
- Payload: must match UserProfile request contract
- Response: success or error message

Form behavior requirements:

- Use React Hook Form with Zod resolver
- Validation must run on change
- Submit button must be disabled when:
  - form is invalid
  - OR submission is in progress
- Submit button must be disabled immediately after clicking
- Re-enable submit button only after API response
- Cancel button must always remain enabled
- Cancel button must call onCancel callback
- Do not reset form automatically on cancel

Error handling:

- Field-level validation errors must be shown under respective fields
- API-level error must be displayed below Submit and Cancel buttons
- API error message must be user-readable
- No alerts, no toasts, no console logs

UI & layout:

- Use Material UI components only
- Use MUI Grid for layout
- Single column layout on small screens
- Two-column layout on medium and larger screens
- Mobile-first responsive design
- No fixed widths

Accessibility:

- Every input must have a visible label
- Buttons must have explicit type attributes
- Errors must be accessible to screen readers

Output requirements:

- Generate ONLY the form component file
- File path:
  /packages/ui/src/component/UserProfile/UserProfile.form.tsx
- Do NOT modify or generate any other files
- Do NOT add business logic
- Do NOT add custom validation

## Mock data example

Generate mock data for component "UserProfile".

Use all available references:

- Interface
- Zod validation schema
- Form behavior

The mock data must:

- Cover positive, negative, empty, and edge cases
- Be reusable across unit and E2E tests
- Be defined in a single file

## Handler Example

Generate API handlers for component "UserProfile".

Use mock data from:

- /packages/ui/src/component/UserProfile/UserProfile.mock-data.ts

Handlers must:

- Support positive, negative, empty, and edge cases
- Be reusable by unit tests and E2E tests
- Use MSW
- Match REST semantics

## Unit Test Example

Write comprehensive unit tests for the "UserProfileForm" component.

Scope:

- This is a UNIT test, not integration or E2E.
- Test only the UserProfileForm component in isolation.
- Do not test API implementation or backend logic.
- Use MSW for mocking API responses.

Sources of truth:

1. Component interface:
   /packages/contracts/interfaces/UserProfile.ts

2. Zod validation schema:
   /packages/contracts/validation/UserProfile.schema.ts

3. Form component:
   /packages/ui/src/component/UserProfile/UserProfile.form.tsx

Testing framework & tools:

- Vitest
- React Testing Library
- jsdom environment
- MSW for API mocks

General testing rules:

- Follow Arrange → Act → Assert pattern in every test
- One behavior per test case
- Use accessible queries only (getByRole, getByLabelText, getByPlaceholderText)
- Do NOT use class selectors or implementation details
- Do NOT use snapshot testing
- Do NOT use arbitrary timeouts

---

### TEST CASES TO COVER

1. Rendering & Initial State (Positive)

- The form renders without crashing
- All required fields are visible
- Submit button is disabled initially
- Cancel button is enabled initially

2. Positive Validation Scenarios

- Filling all required fields with valid values enables the submit button
- Valid enum selections are accepted
- Valid date values are accepted
- Submit triggers API call with correct payload

3. Negative Validation Scenarios

- Submitting empty form shows validation errors
- Invalid email format shows correct error message
- Age below minimum value shows validation error
- Required fields display errors when left empty

4. Empty & Edge Cases

- Optional fields can be left empty without errors
- Form remains invalid when only some required fields are filled
- Submit button remains disabled when form is invalid

5. API Interaction (Mocked)

- Submit button is disabled immediately after clicking submit
- API success response re-enables submit button
- API failure response shows error message below action buttons
- API error does NOT clear form values

6. Cancel Action

- Clicking cancel calls onCancel callback
- Cancel does not trigger validation
- Cancel does not trigger API call

7. Accessibility & UX

- All fields have accessible labels
- Error messages are visible and readable
- Buttons have correct type attributes

---

### OUTPUT REQUIREMENTS

- Generate a single test file:
  /packages/ui/src/component/UserProfile/UserProfile.form.unit.test.tsx
- Use clear test descriptions
- Use Arrange / Act / Assert comments in each test
- Mock API responses deterministically
- Do NOT include explanations or markdown
- Output ONLY valid TypeScript test code

## Unit test example 2

Write comprehensive unit tests for "UserProfileForm".

Use mock data from:

- /packages/ui/src/component/UserProfile/UserProfile.mock-data.ts

Test requirements:

- Cover rendering, positive, negative, empty, and edge cases
- Use ONLY mock data (no inline test values)
- Follow Arrange Act Assert pattern
- Validate submit and cancel behavior
- Validate API error handling using mock responses

## E2E Example

Write end-to-end tests for "UserProfile" form.

Use mock data from:

- /packages/ui/src/component/UserProfile/UserProfile.mock-data.ts

Test requirements:

- Cover positive submission flow
- Cover validation errors using invalid and empty mock data
- Cover edge case values
- Cover API error scenario
- Use Playwright + MSW
- Do not define inline test data
