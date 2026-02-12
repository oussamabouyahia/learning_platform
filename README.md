# My Learning Path 🎓

![Performance](https://img.shields.io/badge/Performance-98%25-brightgreen) ![Accessibility](https://img.shields.io/badge/Accessibility-91%25-brightgreen) ![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)

A high-performance React Dashboard for tracking learning progress, featuring optimistic UI updates, rigorous testing, and architectural best practices.

## 🚀 Key Features

- **⚡️ Optimistic UI:** "Favorite" toggles update instantly, reverting only if the server request fails.
- **🔍 Debounced Search:** Filters courses efficiently without spamming the API (500ms delay).
- **🦴 Skeleton Loading:** Prevents layout shifts (CLS) and improves perceived performance.
- **🧩 Lazy Loading:** Route-based code splitting ensures the initial bundle remains small.
- **♿️ Accessible:** Semantic HTML (`<main>`, `<article>`) and ARIA roles for keyboard navigation.

## 🛠 Tech Stack

- **Core:** React 19, TypeScript, Vite
- **State:** TanStack Query (React Query)
- **Styling:** Tailwind CSS
- **Testing:** Vitest, React Testing Library
- **Tooling:** JSON Server, ESLint, Prettier

## 🏗 Architecture

This project follows a **Feature-Based Architecture** with a strict separation of concerns:

1.  **Features (`src/features/`)**: Self-contained modules (e.g., `course`) containing their own components, hooks, and types.
2.  **Container/Presenter Pattern**:
    - **Pages** (Containers) handle data fetching and state orchestration.
    - **Components** (Presenters) are pure UI functions that receive data via props.
3.  **Services (`src/services/`)**: Isolated API layer to keep components clean of `fetch` logic.

## 🧪 Testing Strategy

The application maintains high reliability through a "Testing Pyramid" approach:

- **Unit Tests:** Verify complex business logic (e.g., progress calculation) in isolation.
  .
- **Integration Tests:** Verify the data flow between Pages and Components.
  - _Example:_ Mocking the API to ensure the Grid renders correctly after data arrival.

## 🚀 Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Start the Mock Server** (Port 3001)

    ```bash
    npm run start-api
    ```

3.  **Start the Frontend** (Port 5173)

    ```bash
    npm run dev
    ```

4.  **Run Tests**
    ```bash
    npm run test
    ```
