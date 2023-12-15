import Http from "./http";

export const authorization = (accessToken) => {
  Http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
