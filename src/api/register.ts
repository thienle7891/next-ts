import { TResType } from '@/app/types/TResType';
import Http from './http';
import apiUrls from '@/constants/apiUrls';
import { RegisterSchemaType } from '@/validate/registerSchema';

export const registerApi = async (
  formValue: RegisterSchemaType
): Promise<TResType> => {
  const result = await Http.post(apiUrls.REGISTER, formValue);
  return result.data;
};
