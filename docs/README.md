# Monorepo Documentation

Welcome to the documentation for this AI-assisted frontend development monorepo. This document provides a high-level overview of the development workflow, architecture, and the suite of AI agents designed to streamline the creation of production-ready UI components.

## Development Workflow

The core of our development process is a standardized, sequential workflow that takes a UI design from Figma and transforms it into a fully implemented, tested, and documented component. This process is enforced by a series of custom AI agents, each responsible for a specific task in the development lifecycle.

The workflow is detailed in the [Figma to UI AI Workflow](./Figma_To_UI_AI_Workflow.md) document. It is mandatory for all frontend development in this repository.

## Architecture

This monorepo follows a structured architecture that separates concerns and promotes code reuse. The key architectural principles are:

- **Contracts as the Source of Truth**: All data structures are defined in TypeScript interfaces, which serve as the single source of truth for the shape of our data.
- **Containers for Orchestration**: Container components are responsible for fetching data, managing state, and orchestrating the interactions of multiple UI components.
- **Components for Rendering**: UI components are pure, presentational components that render data and emit events. They are not responsible for business logic or data fetching.
- **Comprehensive Testing**: The workflow enforces the creation of unit tests, integration tests, and end-to-end tests for all components and containers.

## AI Agents

The development process is accelerated by a suite of custom AI agents, each tailored for a specific task. These agents ensure consistency, quality, and adherence to our architectural principles.

For a detailed explanation of each agent, please see the [Agents Documentation](./agents/README.md).
