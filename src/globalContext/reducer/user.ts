import { TUser } from '@/app/types/user';
import { TAction } from '../type';

export const userReducer = (state: TUser, action: TAction) => {
  switch (action.type) {
    case 'CREATE_PRODUCT':
      return action.payload;
    default:
      return state;
  }
};
