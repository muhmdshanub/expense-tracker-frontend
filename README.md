# 🎨 FinTrack Frontend

A premium, lightning-fast SPA (Single Page Application) for recording and reviewing daily expenses. Built with a focus on user experience, architectural cleanliness, and real-world resilience.

---

## 🎨 Premium User Experience
-   **Glassmorphism & Micro-animations**: Subtle transitions and elevated components using Material UI (MUI).
-   **Responsive Layout**: Dual-pane layout on desktop (Fixed-height dashboard) that collapses into a scrollable mobile view perfectly.
-   **Infinite Loading**: Implemented "Load More" pagination to keep the interface snappy regardless of local data volume.

---

## 🏛️ Implementation Details

### 🏗️ Directory Structure
-   `src/api`: Centralized API client using `fetch`.
-   `src/features/expenses`: Domain-driven module containing:
    -   `ExpenseApp.jsx`: Main logic, state orchestration, and dashboard layout.
    -   `components/`: Decoupled UI components (Form, List, Filters).
-   `src/styles`: Theme configuration and global styles.

### 🔑 Implementation Strategy
1.  **Semantic HTML**: All components use semantic MUI elements (`Box` as main/section, `Typography` for proper heading hierarchy).
2.  **Optimized Rendering**: Used `useMemo` and specialized sorting/filtering logic to ensure UI stays responsive.
3.  **Error Boundaries**: Graceful error handling in the `fetch` layer with user-friendly error messages in the UI.
4.  **Pagination**: Implemented a hybrid pagination model (Client-side append with Server-side LIMIT/OFFSET) for smooth "Infinite Scroll" behavior.

### 🛠️ Tech Stack Metadata
-   **Core**: React 19, Vite 6
-   **UI Library**: Material UI (MUI) @9.0.0
-   **Icons**: MUI Icons
-   **State Management**: React Hooks (useState, useEffect, useMemo)

---

## 🧠 Strategic Choices

### What we chose and why?
-   **MUI (Material UI)**: Leveraged for its robust component ecosystem, allowing us to build a "bank-grade" UI rapidly.
-   **Vite**: The fastest modern build tool for React, crucial for a fast DX and optimized production bundles.
-   **Client-side Validation**: Instant feedback for the user before hitting the API.
-   **Idempotency Key (request_id)**: Every transaction generated a UUID on the frontend to ensure that if a user clicks "Save" twice or has a connection glitch, the server won't double-charge/duplicate.
-   **Desktop-First with Mobile Adaptability**: The dashboard uses a "fixed-viewport" strategy for desktop (like a pro banking app) but switches to a standard vertical scroll for mobile.

### What we avoided?
-   **Redux/Zustand**: Avoided state management libraries as React's native `useState` and `useMemo` were sufficient for this scope, reducing bundle size and complexity.
-   **TailwindCSS**: Chosen MUI over Tailwind to utilize pre-built, accessible component behaviors (like Modals and Selects) which are more time-consuming to build from scratch.
-   **React Query**: While powerful, simple `fetch` + `useEffect` was used to demonstrate a lean implementation and keep the project dependency footprint low.
-   **Framer Motion**: Avoided heavy animation libraries, choosing native CSS transitions and MUI's built-in `Transition` components for better performance.

---

## 🚀 Deployment Status
-   **Hosting**: Vercel
-   **Live App**: [https://expense-tracker-frontend-three.vercel.app/](https://expense-tracker-frontend-three.vercel.app/)

---

## 🚀 Environment Setup

Create a `.env` file in this directory:
```env
VITE_API_URL=https://expense-tracker-api-85d0.onrender.com
# OR for local development:
# VITE_API_URL=http://localhost:5000
```

## 🛠️ Scripts
- `npm run dev`: Starts the Vite dev server.
- `npm run build`: Generates the optimized production build.
- `npm run lint`: Runs ESLint for code quality checks.