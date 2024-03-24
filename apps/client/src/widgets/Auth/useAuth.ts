import { useMutation } from '@tanstack/react-query';
import { signInProvider } from '@client/shared/providers/Auth';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const signInMutation = useMutation({
    mutationFn: signInProvider,
    onSuccess: handleSuccess,
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
