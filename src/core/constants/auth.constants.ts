export const AUTH_TOKEN_EXPIRY = {
  ACCESS_TOKEN: "2d", // 2 días
  REFRESH_TOKEN: "7d", // 7 días
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_STATE: "auth_state",
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Credenciales inválidas",
  EMAIL_EXISTS: "El correo electrónico ya está registrado",
  WEAK_PASSWORD: "La contraseña debe tener al menos 8 caracteres",
  INVALID_TOKEN: "Token inválido o expirado",
  NETWORK_ERROR: "Error de conexión",
  UNKNOWN_ERROR: "Error desconocido",
};

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  RECOVERY: "/auth/recover-password",
  RESET_PASSWORD: "/auth/reset-password",
  REFRESH_TOKEN: "/auth/refresh-token",
};
