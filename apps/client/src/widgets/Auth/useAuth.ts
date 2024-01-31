import { useMutation } from '@tanstack/react-query';
import { signInProvider } from '@client/shared/providers/Auth';
import { FormEvent } from 'react';

export const useAuth = () => {
  const signInMutation = useMutation({
    mutationFn: signInProvider,
  });

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInMutation.mutate({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  return { handleSignUp };
};
