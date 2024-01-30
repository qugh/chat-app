import { useMutation } from '@tanstack/react-query';
import { signUpProvider } from '@client/shared/providers/Auth';
import { FormEvent } from 'react';

export const useRegister = () => {
  const signUpMutation = useMutation({
    mutationFn: signUpProvider,
  });

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({ email: e.currentTarget.email.value, password: e.currentTarget.password.value });
  };

  return { handleSignUp };
};
