# UI Boilerplate Documentation

This repository is a Turborepo-based monorepo for developing and showcasing UI components and applications using React and Storybook.

## Project Overview

This project is structured to support the development of reusable UI components and standalone applications.

- **Monorepo:** Uses [Turborepo](https://turbo.build/repo) for managing the monorepo.
- **UI Components:** Reusable React components are located in the `packages/ui` directory.
- **Storybook:** [Storybook](https://storybook.js.org/) is used for developing, testing, and showcasing components and applications. The Storybook project is in `apps/storybook`.
- **Styling:** The project is set up with basic CSS and is ready for a CSS-in-JS solution or a utility-first CSS framework like Tailwind CSS.
- **TypeScript:** The entire codebase is written in TypeScript.

## Getting Started

1.  **Install Dependencies:**
    ```sh
    npm install
    ```
2.  **Run Storybook:**
    ```sh
    npm run dev
    ```
    This will start the Storybook development server.

## Project Structure

The project is organized into two main directories: `packages` and `apps`.

- **`packages/`**
  - **`ui/`**: This is where all reusable UI components are located. Each component should have its own directory containing the component file and its CSS.
    - `src/`
      - `button/`
        - `Button.tsx`
        - `button.css`
  - **`eslint-config/`**: Contains shared ESLint configurations.
  - **`typescript-config/`**: Contains shared TypeScript configurations.

- **`apps/`**
  - **`storybook/`**: The Storybook application for visualizing and testing components and applications.
    - `src/`
      - **`stories/`**: Storybook stories for the UI components.
      - **`apps/`**: Contains standalone applications that can be rendered within Storybook.
        - `BQ/`, `DQ/`, `GQ/`: Example applications. Each application has its own `App.tsx`, `index.css`, and `index.tsx` which exposes a `window.initialize<APPNAME>` function.

## Development Workflow

### Creating a New UI Component

1.  **Create a new directory** for your component inside `packages/ui/src/`. For example, `packages/ui/src/card`.
2.  **Create the component file** (e.g., `Card.tsx`) and its CSS file (e.g., `card.css`).
3.  **Define the component's props** and implement the component logic. Follow the example of `packages/ui/src/button/Button.tsx`.

    ```tsx
    // packages/ui/src/card/Card.tsx
    import './card.css';

    export interface CardProps {
      title: string;
      children: React.ReactNode;
    }

    export const Card = ({ title, children }: CardProps) => {
      return (
        <div className="card">
          <h2>{title}</h2>
          <div>{children}</div>
        </div>
      );
    };
    ```

4.  **Export the component** from the main `ui` package entry point if you create one.

### Creating a Story for Your Component

1.  **Create a new story file** in `apps/storybook/src/stories/` with the `.stories.ts` extension (e.g., `Card.stories.ts`).
2.  **Write stories** for the different states of your component. Follow the example of `apps/storybook/src/stories/Button.stories.ts`.

    ```ts
    // apps/storybook/src/stories/Card.stories.ts
    import type { Meta, StoryObj } from '@storybook/react-vite';
    import { Card } from '@repo/ui/card/Card';

    const meta = {
      title: 'Example/Card',
      component: Card,
    } satisfies Meta<typeof Card>;

    export default meta;
    type Story = StoryObj<typeof meta>;

    export const Default: Story = {
      args: {
        title: 'Example Card',
        children: 'This is the content of the card.',
      },
    };
    ```

### Creating a New Application

1.  **Create a new directory** for your application inside `apps/storybook/src/apps/` (e.g., `MyNewApp`).
2.  **Create the following files** inside the new directory:
    - `App.tsx`: The main component for your application.
    - `index.css`: Styles for your application.
    - `index.tsx`: The entry point for your application.
3.  **Implement your application** in `App.tsx`.
4.  **Set up the entry point** in `index.tsx` to expose a `window.initialize<AppName>` function. Replace `<AppName>` with the name of your application.

    ```tsx
    // apps/storybook/src/apps/MyNewApp/index.tsx
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App.tsx';

    declare global {
      interface Window {
        initializeMyNewApp: (mountId: string) => void;
      }
    }

    function initializeMyNewApp(mountId: string) {
      if (mountId) {
        createRoot(document.getElementById(mountId)!).render(
          <StrictMode>
            <App />
          </StrictMode>,
        );
      }
    }

    window.initializeMyNewApp = initializeMyNewApp;
    ```
5. You can test your new application by adding a new HTML file in `apps/storybook/public` and mounting your app there.

---

## Instructions for Devin AI

As an AI developer, your task is to create UI components based on Figma designs. Follow these steps:

1.  **Component Implementation:**
    *   Create a new directory for the component in `packages/ui/src/`.
    *   Create the `Component.tsx` and `component.css` files.
    *   Translate the Figma design into a React component with TypeScript props.
    *   Ensure the component is fully functional and styled according to the design.

2.  **Storybook Story:**
    *   Create a `.stories.ts` file for the component in `apps/storybook/src/stories/`.
    *   Add stories for all variants and states of the component as shown in the Figma design.

3.  **Follow Conventions:**
    *   Adhere to the existing code style and structure.
    *   Use the same naming conventions as in the rest of the project.
    *   Ensure all code is typed with TypeScript.

Your goal is to produce a complete, production-ready UI component with corresponding Storybook stories.