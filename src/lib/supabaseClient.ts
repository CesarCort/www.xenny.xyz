const DISABLED_MESSAGE =
  "Supabase is disabled in this project. Remove auth calls or configure another provider.";

export const supabase = {
  auth: {
    signInWithPassword: async () => ({
      data: null,
      error: { message: DISABLED_MESSAGE },
    }),
    signUp: async () => ({
      data: null,
      error: { message: DISABLED_MESSAGE },
    }),
    resetPasswordForEmail: async () => ({
      error: { message: DISABLED_MESSAGE },
    }),
  },
};