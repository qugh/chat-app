import { useMutation } from '@tanstack/react-query';
import { signInProvider, signUpProvider } from '@client/shared/providers/Auth';
import { FormEvent } from 'react';
import { useNavigate } from "react-router";

export const useRegister = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: signUpProvider,
    onSuccess: (data) => {
      signInMutation.mutate({ email: data.email, password: data.password });
    },
  });

  const signInMutation = useMutation({
    mutationFn: signInProvider,
    onSuccess: () => {
      navigate('/chat');
    }
  });

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  return { handleSignUp };
};
