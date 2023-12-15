import Http from "../api/http";
import { API_URLS } from "../config/apiUrls";

export const authLogin = async (params) => {
  const result = await Http.post(API_URLS.LOGIN, params);

  return result;
};
