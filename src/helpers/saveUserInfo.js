import { axiosInstance } from './axiosInstance';

export const saveUserInfo = async (displayName, email, method) => {
   const user = { displayName, email };
   const { data } = await axiosInstance({
      method,
      url: '/users',
      data: user,
   });
   console.log(data);
};
