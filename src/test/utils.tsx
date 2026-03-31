import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";

// Wrapper para React Router y React Query
export const createRouterQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  return { queryClient, wrapper };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { render } from "@testing-library/react";
