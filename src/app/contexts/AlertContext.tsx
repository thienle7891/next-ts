'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

interface AlertProviderType {
  children: ReactNode;
}

interface TAlertContent {
  icon?: ReactNode;
  isOpen?: boolean;
  title?: string;
  description?: string;
  cancelButton?: string;
  confirmButton?: string;
  cancelFunc?: () => void;
  confirmFunc?: () => void;
}
interface TContextFunc {
  showAlert: (data: TAlertContent) => void;
  hideAlert: () => void;
}
interface TValueContext extends TAlertContent, TContextFunc {}

const initAlertData = {
  icon: null,
  title: '',
  description: '',
  cancelButton: '',
  confirmButton: '',
  cancelFunc: () => {},
  confirmFunc: () => {},
};

const AlertContext = createContext<TValueContext>({
  isOpen: false,
  ...initAlertData,
  showAlert: (data: TAlertContent) => {},
  hideAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: AlertProviderType) => {
  const [alertContent, setAlertContent] = useState<TAlertContent>({
    ...initAlertData,
    isOpen: false,
  });
  const {
    icon,
    isOpen,
    title,
    description,
    cancelButton,
    confirmButton,
    cancelFunc,
    confirmFunc,
  } = alertContent;
  const valueContext: TValueContext = useMemo(
    () => ({
      icon,
      isOpen,
      title,
      description,
      cancelButton,
      confirmButton,
      cancelFunc,
      confirmFunc,
      showAlert: (data) =>
        setAlertContent({
          ...data,
          isOpen: true,
        }),
      hideAlert: () => setAlertContent({ ...initAlertData, isOpen: false }),
    }),
    [isOpen]
  );

  return (
    <AlertContext.Provider value={valueContext}>
      {children}
    </AlertContext.Provider>
  );
};
