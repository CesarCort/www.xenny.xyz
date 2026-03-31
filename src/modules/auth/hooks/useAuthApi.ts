import { useCallback, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import {
  LoginCredentials,
  RegisterData,
  PasswordRecoveryData,
  PasswordResetData,
} from "@/core/types/auth.types";
import { AUTH_ERRORS } from "@/core/constants/auth.constants";
import { useAuthStore } from "../store/useAuthStore";

export const useAuthApi = () => {
  const setAuth = useAuthStore((state) => state.login);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setError = useAuthStore((state) => state.setError);

  const handleStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, [setLoading, setError]);

  const handleFinish = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const pushError = useCallback(
    (message: string) => {
      setError(message);
    },
    [setError]
  );

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onMutate: handleStart,
    onSuccess: ({ user }) => {
      setAuth(user);
    },
    onError: (err: any) => {
      pushError(err?.message || AUTH_ERRORS.INVALID_CREDENTIALS);
    },
    onSettled: handleFinish,
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onMutate: handleStart,
    onSuccess: ({ user }) => {
      setAuth(user);
    },
    onError: (err: any) => {
      pushError(err?.message || AUTH_ERRORS.EMAIL_EXISTS);
    },
    onSettled: handleFinish,
  });

  const requestRecoveryMutation = useMutation({
    mutationFn: authService.requestPasswordRecovery,
    onMutate: handleStart,
    onError: (err: any) => {
      pushError(err?.message || AUTH_ERRORS.UNKNOWN_ERROR);
    },
    onSettled: handleFinish,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authService.resetPassword,
    onMutate: handleStart,
    onError: (err: any) => {
      pushError(err?.message || AUTH_ERRORS.INVALID_TOKEN);
    },
    onSettled: handleFinish,
  });

  const isSubmitting = useMemo(
    () =>
      loginMutation.isPending ||
      registerMutation.isPending ||
      requestRecoveryMutation.isPending ||
      resetPasswordMutation.isPending,
    [
      loginMutation.isPending,
      registerMutation.isPending,
      requestRecoveryMutation.isPending,
      resetPasswordMutation.isPending,
    ]
  );

  return {
    login: (credentials: LoginCredentials) => loginMutation.mutateAsync(credentials),
    register: (data: RegisterData) => registerMutation.mutateAsync(data),
    requestPasswordRecovery: (data: PasswordRecoveryData) => requestRecoveryMutation.mutateAsync(data),
    resetPassword: (data: PasswordResetData) => resetPasswordMutation.mutateAsync(data),
    isSubmitting,
  };
};
