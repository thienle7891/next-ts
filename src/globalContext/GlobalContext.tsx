'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react';
import { userReducer } from './reducer/user';
import { mainReducer } from './reducer/main';
import { TUser } from '@/app/types/user';
import { getStorage } from '@/utils/storage';
import storageKeys from '@/constants/storageKeys';
import { TAuthState } from './type';
import actionTypes from './actionTypes';
import io from 'socket.io-client';

interface TGlobalProvider {
  children: ReactNode;
}
type InitialStateType = {
  user: TUser | null;
  auth: TAuthState;
};

interface TGlobalContext {
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  auth: { access_token: '' },
  user: null,
};

const GlobalContext = createContext<TGlobalContext>({
  state: initialState,
  dispatch: () => null,
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: TGlobalProvider) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  useEffect(() => {
    const accessToken = getStorage(storageKeys.ACCESS_TOKEN);
    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, payload: accessToken });
  }, []);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:8001');

    socket.on('connected', (data) => {
      console.log('Received message:', data);
    });

    // Listen for messages from the server
    socket.on('message', (data) => {
      console.log('Received message:', data);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
