import { TAction } from '../type';
import { TUser } from './../../app/types/user';
import { userReducer } from './user';

type TMainReducer = {
  user: TUser;
};

export const mainReducer = ({ user }: TMainReducer, action: TAction) => ({
  user: userReducer(user, action),
});
