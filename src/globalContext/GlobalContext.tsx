'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useReducer,
} from 'react';
import { userReducer } from './reducer/user';
import { mainReducer } from './reducer/main';
import { TUser } from '@/app/types/user';

interface TGlobalProvider {
  children: ReactNode;
}
type InitialStateType = {
  user: TUser | null;
};

interface TGlobalContext {
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  user: null,
};

const GlobalContext = createContext<TGlobalContext>({
  state: initialState,
  dispatch: () => null,
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: TGlobalProvider) => {
  // const valueContext: TGlobalContext = useMemo(() => ({}), []);
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
