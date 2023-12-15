import Http from "../api/http";

export const getBanner = async (type) => {
  try {
    const result = await Http.get(`image/${type}`);
    return result;
  } catch ({ response }) {
    return response;
  }
};
