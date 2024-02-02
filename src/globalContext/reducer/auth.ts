import { TAction, TAuthState } from '../type';

export const authReducer = (state: TAuthState, action: TAction) => {
  switch (action.type) {
    case 'SET_ACCESS_TOKEN':
      return { access_token: action.payload };
    default:
      return state;
  }
};
