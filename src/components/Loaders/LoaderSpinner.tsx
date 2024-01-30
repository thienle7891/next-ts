'use client';

import React, { useMemo, useRef } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { RiseLoader } from 'react-spinners';
import { useLoading } from '@/app/contexts/LoadingContext';

const LoaderSpinner = () => {
  const { loading } = useLoading();

  return (
    <AlertDialog open={loading}>
      {/* <div className=' flex justify-center items-center h-screen z-50'>
      </div> */}
      {/* <AlertDialogHeader> */}
      <AlertDialogOverlay />
      {loading && (
        <div className='z-50 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
          <RiseLoader color='#36d7b7' />
        </div>
      )}
      {/* </AlertDialogHeader> */}
      {/* <AlertDialogContent> */}
      {/* {icon && <div className=' flex justify-center'>{iconItem}</div>}
        <AlertDialogHeader>
          {title ? <AlertDialogTitle>{title}</AlertDialogTitle> : null}
          {description ? (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelButton ? (
            <AlertDialogCancel onClick={() => handleCancel()}>
              {cancelButton}
            </AlertDialogCancel>
          ) : null}
          {confirmButton ? (
            <AlertDialogAction onClick={() => handleConfirm()}>
              {confirmButton}
            </AlertDialogAction>
          ) : null}
        </AlertDialogFooter> */}
      {/* </AlertDialogContent> */}
    </AlertDialog>
  );
};

export default LoaderSpinner;
