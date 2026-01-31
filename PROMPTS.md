# Example Prompts

## @init-component

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
