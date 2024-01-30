'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

interface TLoadingProvider {
  children: ReactNode;
}

interface TLoadingContext {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<TLoadingContext>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: TLoadingProvider) => {
  const [loading, setLoading] = useState(false);

  const valueContext: TLoadingContext = useMemo(
    () => ({
      loading,
      showLoading: () => setLoading(true),
      hideLoading: () => setLoading(false),
    }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={valueContext}>
      {children}
    </LoadingContext.Provider>
  );
};
