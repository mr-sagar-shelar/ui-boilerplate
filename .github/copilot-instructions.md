# Copilot Instructions for UI Boilerplate

## Architecture Overview

**Monorepo Structure:** Turborepo-based monorepo with npm workspaces. Two main categories:
- `packages/`: Reusable libraries and shared configs (ui components, contracts, hooks, store, utils, eslint-config, typescript-config)
- `apps/`: Applications that consume packages (storybook for component development, e2e for testing)

**Key Principle:** Shared code lives in `packages/`, applications import and compose these packages.

## Critical Build & Development Commands

| Task | Command | Notes |
|------|---------|-------|
| Development | `npm run dev` | Starts Storybook + watches all packages (from root) |
| Build all | `npm run build` | Builds all packages with Turbo caching |
| Type check | `npm run check-types` | TypeScript validation across monorepo |
| Lint | `npm run lint` | ESLint across all packages |
| Format | `npm run format` | Prettier formatting for `.ts`, `.tsx`, `.md` |
| Generate component | `npm run generate:component` | Turbo generator for new UI components |

Turbo caches outputs (`build`, `lint`, `check-types`). Use `turbo run <task> --no-cache` to force rebuild.

## Project-Specific Patterns

### UI Component Pattern
All components live in `packages/ui/src/<component-name>/`:
```
packages/ui/src/button/
├── Button.tsx          # Component with exported interface Props
├── button.css          # Scoped styles (currently basic CSS, ready for Tailwind)
```

**Props Pattern:** Every component exports a `ComponentNameProps` interface with JSDoc comments:
```tsx
export interface ButtonProps {
  /** Primary action? */
  primary?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}
```

**Styling:** Basic CSS files alongside components. Project is Tailwind-ready (see commented Tailwind usage in Button.tsx).

**Exports:** `packages/ui/package.json` exports via `"./*": "./src/*.tsx"` pattern, enabling imports like `@repo/ui/button/Button`.

### Stories Pattern (Storybook)
Stories in `apps/storybook/src/stories/`:
```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from '@repo/ui/button/Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],  // Auto-generate docs from component props
  args: { onClick: fn() },  // Spy on actions
} satisfies Meta<typeof Button>;
```

**Key:** Use `fn()` for event handlers to track calls in Actions panel. Add Figma design URLs in parameters.

### Contracts/Types Layer
`packages/contracts/` holds shared TypeScript interfaces:
- `common/`: Pagination, shared types across all apps
- `GQ/`, `DQ/`, `BQ/`: App-specific request/response/context types (prepare for API integration)

Currently mostly empty; follow naming: `GQApiRequest.ts`, `GQApiResponse.ts`, `GQContext.ts`.

### App Initialization Pattern
Embedded apps in Storybook (`src/apps/GQ/`, `BQ/`, `DQ/`) expose `window.initialize<APPNAME>` functions. Each app:
- Has `App.tsx` as root component
- Has `index.tsx` exporting initialization function
- Has `index.css` for app-level styles
- Builds to separate bundles via `vite.apps.config.ts`

Build script: `for app_dir in src/apps/*/; do export VITE_APP_NAME=$(basename $app_dir); vite build --config vite.apps.config.ts; done`

## Configuration References

- **ESLint:** `packages/eslint-config/base.js` (turbo plugin, TypeScript, Prettier-aware). React-specific: `react-internal.js`.
- **TypeScript:** `packages/typescript-config/base.json` (strict mode), `react-library.json` for UI package.
- **Vite:** `apps/storybook/vite.config.ts` (Storybook), `vite.apps.config.ts` (embedded apps).
- **Prettier:** Configured in root `package.json` for `.ts`, `.tsx`, `.md`. Auto-applied in CI.

## Development Workflow for Common Tasks

**Adding a UI Component:**
1. Create `packages/ui/src/<component>/Component.tsx` with exported Props interface
2. Add `packages/ui/src/<component>/component.css`
3. Export from `packages/ui/package.json` via `"./*": "./src/*.tsx"`
4. Create `apps/storybook/src/stories/Component.stories.ts` with multiple Story exports
5. Run `npm run dev` to see in Storybook

**Adding a New App:**
1. Create `apps/storybook/src/apps/<AppName>/App.tsx`
2. Create `index.tsx` exporting `window.initialize<AppName>` function
3. Add `index.css` for styles
4. Update `build:apps` script if special handling needed

**Type Integration:**
- Add shared types to `packages/contracts/common/` for cross-app usage
- Add app-specific types to `packages/contracts/<AppName>/`
- Import in components/apps via `import type { Type } from '@repo/contracts'` (export needed)

## Integration Points & Dependencies

- **React 18.3.1** across all packages
- **Storybook 10.2.0** for component dev/testing (includes Vitest for component testing)
- **Vite** for app builds (Storybook + embedded apps)
- **TypeScript 5.9.2** strict mode
- **Turbo** for task orchestration and caching

**Cross-Package:** Import from `@repo/<package-name>` (e.g., `@repo/ui/button/Button`, `@repo/contracts/common/Pagination`).

## Conventions to Follow

1. **Naming:** PascalCase for components, camelCase for utilities. Use descriptive JSDoc for props.
2. **Testing:** Use Storybook's `expect`, `fn`, `userEvent`, `within` from `storybook/test` (Vitest integration).
3. **CSS:** Basic CSS files alongside components (co-locate). Comment out Tailwind example in Button.tsx shows readiness for migration.
4. **No env vars in committed code:** Turbo warns if undeclared; use `.env*` files and document in build config.
5. **Async/Turbo:** Tasks depend on `^build` (transitive deps). Monitor turbo.json for task ordering.
