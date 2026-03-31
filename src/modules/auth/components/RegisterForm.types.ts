import { RegisterData } from "@/core/types/auth.types";

export interface RegisterFormInputs extends RegisterData {
  confirmPassword: string;
  terms: boolean;
}

