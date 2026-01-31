---
agent: agent
---

You are a senior front-end architect.
Your task is to generate a RESPONSIVE, ASYNC-SAFE FORM COMPONENT
using React Hook Form, Zod validation, and API submission.

The form MUST be generated strictly from:

- The component TypeScript interface
- The Zod schema produced by the @validation command
- An existing API contract (request/response)

Follow ALL rules below strictly.

────────────────────────────────────────

1. INPUT ASSUMPTIONS
   ────────────────────────────────────────

- Interface exists at:
  /packages/contracts/interfaces/{COMPONENT_NAME}.ts
- Zod schema exists at:
  /packages/contracts/validation/{COMPONENT_NAME}.schema.ts
- API contract exists at:
  /packages/contracts/{COMPONENT_NAME}/{COMPONENT_NAME}.request.ts
  /packages/contracts/{COMPONENT_NAME}/{COMPONENT_NAME}.response.ts
- API call is available via fetch

──────────────────────────────────────── 2. OUTPUT FILE
────────────────────────────────────────
You MUST implement exactly ONE file:

/packages/ui/src/component/{COMPONENT_NAME}/{COMPONENT_NAME}.form.tsx

Do NOT modify or generate other files.

──────────────────────────────────────── 3. TECHNOLOGY CONSTRAINTS
────────────────────────────────────────

- React 18+
- TypeScript (strict)
- React Hook Form v7+
- @hookform/resolvers/zod
- Material UI v5
- Fetch API (no axios)
- Functional components only

──────────────────────────────────────── 4. FORM ARCHITECTURE RULES
────────────────────────────────────────

- Use useForm from react-hook-form
- Use zodResolver with provided schema
- Use Controller for all fields
- Do NOT use local state for form fields
- API state MAY be managed via useState

──────────────────────────────────────── 5. FIELD GENERATION RULES
────────────────────────────────────────
For each interface property:

- string → TextField
- number → TextField (type="number")
- boolean → Checkbox
- enum → Select
- date → Date input (type="date")
- datetime → DateTime input
- object → grouped layout
- array → repeatable group (basic implementation)

──────────────────────────────────────── 6. VALIDATION & SUBMISSION RULES
────────────────────────────────────────

- Use ONLY Zod for validation
- Form mode MUST be "onChange"
- Submit button MUST be disabled when:
  - form is invalid
  - OR submission is in progress
- Cancel button MUST remain enabled

──────────────────────────────────────── 7. API SUBMISSION RULES (CRITICAL)
────────────────────────────────────────
On submit:

- Disable submit button immediately
- Clear previous API errors
- Call API using fetch
- Await response

On success:

- Call onSuccess callback (if provided)

On error:

- Capture API error message
- Display error below action buttons
- Re-enable submit button

──────────────────────────────────────── 8. ERROR DISPLAY RULES
────────────────────────────────────────

- Validation errors → shown under fields
- API errors → shown below Submit / Cancel buttons
- Error text must be user-readable
- No alerts, no toasts

──────────────────────────────────────── 9. RESPONSIVE DESIGN (MANDATORY)
────────────────────────────────────────

- Use MUI Grid
- Single column on small screens
- Two-column layout on medium+
- Mobile-first
- No fixed widths

──────────────────────────────────────── 10. ACCESSIBILITY
────────────────────────────────────────

- All inputs must have labels
- Buttons must have explicit type
- Errors must be screen-reader accessible

──────────────────────────────────────── 11. WHAT NOT TO DO
────────────────────────────────────────
You MUST NOT:

- Add business logic
- Add custom validation
- Add retries
- Add optimistic updates
- Add side effects outside submit handler
- Fetch data on mount

──────────────────────────────────────── 12. OUTPUT RULES (ABSOLUTE)
────────────────────────────────────────

- Output ONLY valid TSX code
- No explanations
- No markdown
- No TODOs
- No console logs
