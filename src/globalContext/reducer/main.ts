import { TAction, TAuthState } from '../type';
import { TUser } from './../../app/types/user';
import { authReducer } from './auth';
import { userReducer } from './user';

type TMainReducer = {
  user: TUser;
  auth: TAuthState;
};

export const mainReducer = ({ user, auth }: TMainReducer, action: TAction) => ({
  user: userReducer(user, action),
  auth: authReducer(auth, action),
});
