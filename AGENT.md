# DigitaliaForge Frontend Base - AI Agent Documentation

> **SYSTEM PROMPT / CONTEXT INSTRUCTION**
> This document is designed to help AI agents understand the architecture, patterns, and conventions of this repository. When working on this codebase, prioritize these guidelines over general React knowledge.

## 0. Agent goal and process
- **Goal:** deliver fast MVP solutions while keeping modular isolation and the security rules defined here.
- **Response flow:**
  1. Read this file and the user request; state assumptions in the reply if something is missing.
  2. Identify impacted modules and prioritize parallel reads/searches before opening large files.
  3. Propose a brief plan if the change is broad; then implement the minimum needed following DDD, routes, and this repo’s patterns.
  4. If data/Supabase is involved, include the SQL with RLS (see section 6) plus the code changes.
  5. Validate: run relevant lints/tests when you change code and mention anything not executed.
  6. Always reply in Spanish, reference concrete paths/symbols, and avoid reverting user changes.

## 1. Project Overview
- **Type:** Single Page Application (SPA)
- **Stack:** React 19, TypeScript 5, Vite 6, Tailwind CSS 4.
- **State Management:** Zustand (with persistence).
- **Data Fetching:** Custom `apiClient` wrapper around `fetch` + React Query (TanStack Query) patterns.
- **Testing:** Vitest + React Testing Library.

## 2. Directory Structure & Architecture

The project follows a **Domain-Driven Design (DDD)** inspired modular structure.

```
src/
├── core/               # Cross-cutting concerns (Shared logic)
│   ├── constants/      # Global constants (e.g., storage keys, routes)
│   ├── routes/         # Routing components (ProtectedRoute)
│   └── types/          # Shared TypeScript interfaces/types
│
├── lib/                # Third-party library configurations
│   ├── http/           # API Client configuration
│   └── ...
│
├── modules/            # FEATURE MODULES (Primary code location)
│   └── [FeatureName]/  # e.g., 'auth', 'products'
│       ├── components/ # UI components specific to this feature
│       ├── hooks/      # Logic hooks (useAuth, etc.)
│       ├── services/   # API calls specific to this feature
│       ├── store/      # Zustand store for this feature
│       └── types/      # Local types for this feature
│
├── pages/              # Page-level components (Route targets)
│   # Pages should be minimal and compose components from modules.
│
└── test/               # Global test utilities
```

### 🚨 Critical Rule: Feature Isolation
- **Do not** import internal components from one module into another.
- Use the `pages/` directory to compose features together.
- Shared UI components (buttons, inputs) should go to `src/components/ui` (to be created).

## 3. Key Patterns & Conventions

### 3.1 HTTP Requests (`apiClient.ts`)
We use a custom singleton `apiClient` located in `@/lib/http/apiClient.ts`.
- **Usage:**
  ```typescript
  import { apiClient } from "@/lib/http/apiClient";
  
  // GET request
  const data = await apiClient.get<ResponseType>("/endpoint");
  
  // POST request
  const data = await apiClient.post<ResponseType>("/endpoint", { body: payload });
  ```
- **Features:**
  - Automatic Authorization header injection (Bearer token).
  - Automatic 401 handling & Token Refresh (do not re-implement this).
  - Unified error handling (`ApiError` class).

### 3.2 State Management (Zustand)
- Stores are located in `modules/[feature]/store/`.
- Use `persist` middleware only for state that survives refresh (e.g., Auth tokens).
- **Pattern:**
  ```typescript
  export const useFeatureStore = create<FeatureState>()((set) => ({
    data: null,
    setData: (data) => set({ data }),
  }));
  ```

### 3.3 Authentication Flow
- **Authentication:** handled by Supabase Auth (email/password).
- **User and state:** stored in Zustand (persist only the user profile locally, never the keys).
- **Token and session:** managed internally by the Supabase SDK; the frontend never stores them manually.
- **Protected Routes:** Use `<ProtectedRoute component={Dashboard} />`.

### 3.4 Styling (Tailwind v4)
- Use utility classes directly in JSX.
- Avoid CSS files unless for global animations/resets.
- **Convention:** Group layout classes first, then typography, then visuals.
  `className="flex items-center justify-between text-lg font-bold text-gray-800"`

## 4. Coding Standards

### 4.1 TypeScript
- **Strict Mode:** Enabled. No `any` allowed explicitly.
- **Interfaces:** Prefix with `I` is **deprecated**. Use `User` not `IUser`.
- **Path Aliases:** Always use `@/` for imports (e.g., `@/core/types/...`).

### 4.2 Testing (Vitest)
- **Location:** `__tests__` folder inside each module component/hook folder.
- **Tooling:** `vi` (Vitest) instead of `jest`.
- **Mocking:** Use `vi.mock` for modules and `vi.fn()` for functions.

## 5. Common Tasks for AI Agents

- **Creating a new feature:**
  1. Create `src/modules/[new-feature]`.
  2. Define types in `types/`.
  3. Create service in `services/`.
  4. Create store in `store/`.
  5. Build components.

- **Adding an API endpoint:**
  1. Update `services/[module].service.ts`.
  2. Use `apiClient`.
  3. Update types.

- **Refactoring:**
  1. Check for duplicate logic in `pages`. Move to `modules`.
  2. Ensure `apiClient` is used instead of raw `fetch`.

## 6. Supabase & Security: Access rules (RLS)

- **All new tables must have Row Level Security (RLS) enabled with appropriate policies.**
- When you implement a new table or functionality (e.g., events, registrations), **always include the table creation block and its security policies** along with the documentation.
- By default, tables are accessible only to the record owner;
  - For relationships, ensure only the related user can read/insert/delete their registration (e.g., `user_event_registrations`).
  - Admin privileges must be explicit.

### 6.1 Flow for model/table requests
- If the user asks to create/update/delete a model or table, always provide two things: (a) the applied code changes (with specific paths) and (b) the SQL script ready to run in Supabase (SQL editor or `supabase db remote commit`).
- The SQL must include full DDL (`CREATE/ALTER/DROP TABLE`), types with `NOT NULL`, primary keys, foreign keys, needed indexes, and `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`.
- Add explicit RLS policies for read/write/delete: at least an owner policy and, if applicable, a separate admin role policy.
- For updates or deletions, describe data impact and include `UPDATE/DELETE` or data migrations as needed; avoid orphaned data.
- Include any trigger or function involved in the same SQL block when they are part of the model.
- Explain how to keep the frontend in sync (`types/`, `services/`, stores, minimal tests) so the model stays aligned with Supabase.

## 7. Environment Variables
- Accessed via `import.meta.env`.
- `VITE_API_URL`: Backend API base URL.

