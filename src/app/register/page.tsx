'use client';

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import UnderLineInput from '@/components/form/UnderLineInput';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { RegisterSchemaType, registerSchema } from '@/validate/registerSchema';
import { registerApi } from '@/api/register';
import AlertCustom from '@/components/Alert/AlertCustom';
import { useAlert } from '../contexts/AlertContext';
import Link from 'next/link';
import routePaths from '@/constants/routes';
import { TResType } from '../types/TResType';
import { useRouter } from 'next/navigation';
import { useLoading } from '../contexts/LoadingContext';

const Register = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  const { mutateAsync } = useMutation<TResType, Error, RegisterSchemaType>(
    registerApi,
    {
      onSuccess: (res) => {
        if (res?.success) {
          showAlert({
            icon: 'success',
            title:
              'Registration successful, press OK to go to the login screen!',
            confirmButton: 'OK',
            confirmFunc: () => {
              router.push(routePaths.LOGIN);
            },
          });
        }
        hideLoading();
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    showLoading();
    await mutateAsync(data);
  };

  return (
    <div className='body-full flex items-center justify-center'>
      <AlertCustom />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[350px] h-[60vh] px-4'
      >
        <CardHeader className='mb-3'>
          <CardTitle className='text-center'>REGISTER</CardTitle>
        </CardHeader>
        <UnderLineInput
          placeholder='Your name'
          icon={<PermIdentityIcon sx={{ fontSize: 26 }} />}
          fontSize={14}
          className='my-6'
          errorMsg={errors?.name?.message}
          {...register('name')}
        />
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
        <UnderLineInput
          placeholder='Confirm Password'
          icon={<LockOpenIcon sx={{ fontSize: 26 }} />}
          type='password'
          className='my-6'
          fontSize={14}
          errorMsg={errors?.confirm_password?.message}
          {...register('confirm_password')}
        />
        <CardDescription className='mt-2 text-center'>
          Already have an account?{' '}
          <Link href={routePaths.LOGIN}>
            <span className='text-blue font-medium cursor-pointer'>
              Login Here
            </span>
          </Link>
        </CardDescription>
        <div className='flex justify-center mt-8'>
          <Button type='submit' className='px-10'>
            REGISTER
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
