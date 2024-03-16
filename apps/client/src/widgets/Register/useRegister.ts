import { useMutation } from '@tanstack/react-query';
import { signInProvider, signUpProvider } from '@client/shared/providers/Auth';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { User } from '@server/users/users.model';
import { CreateUserDto } from '@server/users/dto/create-user.dto';

type InputErrors = Partial<{ email: string; password: string }>;

export const useRegister = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [inputErrors, setInputErrors] = useState<InputErrors>({});

  const signUpMutation = useMutation<
    User | undefined,
    InputErrors,
    CreateUserDto
  >({
    mutationFn: signUpProvider,
    onSuccess: (data) => {
      if (!data) return;
      signInMutation.mutate({ email: data.email, password: data.password });
    },
    onError: (errors) => {
      setInputErrors(errors);
      const ref = errors.email ? emailRef : passwordRef;
      ref.current?.focus();
    },
  });

  const signInMutation = useMutation({
    mutationFn: signInProvider,
    onSuccess: () => {
      navigate('/chat');
    },
  });

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signUpMutation.mutate({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  const handleInput = (input: keyof InputErrors) => () => {
    setInputErrors((prev) => ({
      ...prev,
      [input]: '',
    }));
  };

  return {
    handleSignUp,
    inputErrors,
    emailRef,
    passwordRef,
    handleInput,
  };
};
