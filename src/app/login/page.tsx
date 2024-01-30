'use client';

/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UnderLineInput from '@/components/form/UnderLineInput';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { LoginSchemaType, loginSchema } from '@/validate/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '@/api/login';
import Link from 'next/link';
import routePaths from '@/constants/routes';
import { useAlert } from '../contexts/AlertContext';
import { useLoading } from '../contexts/LoadingContext';
import { setStorage } from '@/utils/storage';
import storageKeys from '@/constants/storageKeys';

const Login = () => {
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  const { mutateAsync } = useMutation(loginApi, {
    onSuccess: (res) => {
      if (res.token) {
        setStorage(storageKeys.ACCESS_TOKEN, res.token);
        console.log(res.token);
      }
      hideLoading();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginSchemaType) => {
    showLoading();
    await mutateAsync(data);
  };

  return (
    <div className='body-full flex items-center justify-center'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[350px] h-[60vh] px-4'
      >
        <CardHeader className='mb-3'>
          <CardTitle className='text-center'>SIGN IN</CardTitle>
        </CardHeader>
        <UnderLineInput
          placeholder='Username'
          icon={<PermIdentityIcon sx={{ fontSize: 26 }} />}
          fontSize={14}
          className='my-6'
          errorMsg={errors?.username?.message}
          {...register('username')}
        />
        <UnderLineInput
          placeholder='Password'
          icon={<LockOpenIcon sx={{ fontSize: 26 }} />}
          type='password'
          className='my-6'
          fontSize={14}
          errorMsg={errors?.password?.message}
          {...register('password')}
        />
        <CardDescription className='mt-2 text-center'>
          Don't have an account?{' '}
          <Link href={routePaths.REGISTER}>
            <span className='text-blue font-medium cursor-pointer'>
              Register Here
            </span>
          </Link>
        </CardDescription>
        <div className='flex justify-center mt-8'>
          <Button type='submit' className='px-10'>
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
