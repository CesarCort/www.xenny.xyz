import { supabase } from "@/lib/supabaseClient";
import {
  LoginCredentials,
  RegisterData,
  PasswordRecoveryData,
  PasswordResetData,
  SupabaseUser,
} from "@/core/types/auth.types";

export const authService = {
  login: async ({ email, password }: LoginCredentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data?.user) {
      throw new Error(error?.message || "Error de autenticación");
    }
    return { user: mapSupabaseUser(data.user) };
  },

  register: async (data: RegisterData) => {
    const { email, password, firstName, lastName } = data;
    const { data: res, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Informar datos adicionales en user_metadata
        data: { firstName, lastName },
      },
    });
    if (error || !res?.user) {
      throw new Error(error?.message || "Error al registrar");
    }
    return { user: mapSupabaseUser(res.user) };
  },

  requestPasswordRecovery: async ({ email }: PasswordRecoveryData) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw new Error(error.message);
    return true;
  },

  resetPassword: async (_payload: PasswordResetData) => {
    // Este método depende de tu flujo de reset de Supabase
    // Puedes adaptarlo según tu manejo de link mágico
    throw new Error('No implementado: Ver documentación de Supabase para flujos custom de reset.');
  },
};

function mapSupabaseUser(suUser: {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}): SupabaseUser {
  return {
    id: suUser.id,
    email: suUser.email,
    ...suUser.user_metadata, // copia nombres/apellidos si existen
  };
}
