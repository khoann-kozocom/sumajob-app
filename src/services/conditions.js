import Http from "../api/http";
import { API_URLS } from "../config/apiUrls";

export const getConditions = async () => {
  try {
    const result = await Http.get(API_URLS.CONDITIONS);
    return result;
  } catch ({ response }) {
    return response;
  }
};

export const getBusinesses = async () => {
  try {
    const result = await Http.get(API_URLS.BUSINESSES);
    return result;
  } catch ({ response }) {
    return response;
  }
};
