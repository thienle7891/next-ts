'use client';
import React, { FC, ReactNode, Ref, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FieldError } from 'react-hook-form';

interface IUnderLineInput {
  placeholder?: string;
  icon?: ReactNode;
  type?: string;
  className?: string;
  fontSize?: string | number;
  errorMsg?: string | undefined;
}

const UnderLineInput: FC<IUnderLineInput> = React.forwardRef(
  (
    {
      placeholder = '',
      icon,
      type = 'text',
      className = '',
      fontSize,
      errorMsg,
      ...props
    }: IUnderLineInput,
    ref: Ref<HTMLDivElement>
  ) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const isPasswordInput = type === 'password';
    return (
      <div className={className} ref={ref}>
        <div className='flex px-3 items-center'>
          {icon && <span>{icon}</span>}
          <input
            className='outline-none ml-2 flex-1 bg-white'
            placeholder={placeholder}
            type={
              !isPasswordInput ? 'text' : isShowPassword ? 'text' : 'password'
            }
            style={{ fontSize }}
            {...props}
          />
          {isPasswordInput && (
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className='cursor-pointer'
            >
              {!isShowPassword ? (
                <VisibilityIcon sx={{ fontSize: 20 }} />
              ) : (
                <VisibilityOffIcon sx={{ fontSize: 20 }} />
              )}
            </span>
          )}
        </div>
        <div className='h-[2px] w-full bg-gray mt-1'></div>
        <p className='text-red px-2 text-sm h-4'>{errorMsg || ' '}</p>
      </div>
    );
  }
);
UnderLineInput.displayName = 'UnderLineInput';

export default UnderLineInput;
