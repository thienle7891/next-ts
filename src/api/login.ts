import { LoginSchemaType } from '@/validate/loginSchema';
import Http from './http';
import apiUrls from '@/constants/apiUrls';

export const loginApi = async (formValue: LoginSchemaType) => {
  try {
    const result = await Http.post(apiUrls.LOGIN, formValue);
    return result.data;
  } catch (e) {
    return e;
  }
};
