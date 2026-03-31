const DISABLED_MESSAGE =
  "Supabase is disabled in this project. Remove auth calls or configure another provider.";

type SupabaseError = {
  message: string;
};

type SupabaseAuthUser = {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
};

type SupabaseAuthResponse = {
  data: { user: SupabaseAuthUser | null } | null;
  error: SupabaseError | null;
};

type SupabaseResetResponse = {
  error: SupabaseError | null;
};

const createDisabledAuthResponse = async (): Promise<SupabaseAuthResponse> => ({
  data: null,
  error: { message: DISABLED_MESSAGE },
});

const createDisabledResetResponse = async (): Promise<SupabaseResetResponse> => ({
  error: { message: DISABLED_MESSAGE },
});

const createTableQuery = <T>() => ({
  select: (..._args: unknown[]) => ({
    order: async (..._orderArgs: unknown[]) => ({
      data: [] as T[],
      error: null as SupabaseError | null,
    }),
    eq: async (..._eqArgs: unknown[]) => ({
      data: [] as T[],
      error: null as SupabaseError | null,
    }),
    single: async () => ({
      data: null as T | null,
      error: null as SupabaseError | null,
    }),
  }),
  insert: (_rows: Partial<T>[]) => ({
    select: (..._args: unknown[]) => ({
      single: async () => ({
        data: null as T | null,
        error: { message: DISABLED_MESSAGE } as SupabaseError,
      }),
    }),
  }),
  delete: () => ({
    eq: (..._args: unknown[]) => ({
      eq: async (..._innerArgs: unknown[]) => ({
        error: null as SupabaseError | null,
      }),
    }),
  }),
});

export const supabase = {
  auth: {
    signInWithPassword: async (_credentials: {
      email: string;
      password: string;
    }) => createDisabledAuthResponse(),
    signUp: async (_payload: {
      email: string;
      password: string;
      options?: { data?: Record<string, unknown> };
    }) => createDisabledAuthResponse(),
    resetPasswordForEmail: async (_email: string) => createDisabledResetResponse(),
  },
  from: <T = unknown>(_table: string) => createTableQuery<T>(),
};
