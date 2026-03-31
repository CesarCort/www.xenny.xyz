import { PasswordResetData } from "@/core/types/auth.types";

export interface ResetPasswordFormInputs extends PasswordResetData {
  confirmPassword: string;
}

