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
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAlert } from '@/app/contexts/AlertContext';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AlertCustom = () => {
  const {
    icon,
    isOpen,
    title,
    description,
    confirmButton,
    cancelButton,
    confirmFunc,
    cancelFunc,
    hideAlert,
  } = useAlert();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const iconItem: React.ReactNode | null = useMemo(() => {
    if (icon === 'success')
      return <TaskAltIcon sx={{ fontSize: 60, color: 'green' }} />;
    if (icon === 'error')
      return (
        <ErrorOutlineIcon sx={{ fontSize: 60, color: 'var(--default-red)' }} />
      );
    return null;
  }, [icon]);
  const handleConfirm = () => {
    confirmFunc && confirmFunc();
    hideAlert();
  };
  const handleCancel = () => {
    cancelFunc && cancelFunc();
    hideAlert();
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent ref={dialogRef}>
        {icon && <div className=' flex justify-center'>{iconItem}</div>}
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCustom;
