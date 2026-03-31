// Tipos para autenticación basada únicamente en Supabase

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Estado de autenticación simplificado (no tokens custom)
export interface AuthState {
  user: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tipo que modela el usuario recibido desde Supabase
export interface SupabaseUser {
  id: string;
  email: string;
  // Añade campos del user_metadata si quieres guardar nombre/apellido
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface PasswordRecoveryData {
  email: string;
}

export interface PasswordResetData {
  token: string;
  newPassword: string;
}
