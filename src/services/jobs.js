import Http from "../api/http";

export const getOfferWithoutLogin = async (payload) => {
  try {
    const result = await Http.get("/job/list_offer", { params: payload });
    return result;
  } catch ({ response }) {
    return response;
  }
};

export const getOfferWithLogin = async (payload) => {
  try {
    const result = await Http.get("/job/list_offer_with_login", {
      params: payload,
    });
    return result;
  } catch ({ response }) {
    return response;
  }
};

export const getJobOfferDetail = async (orderId, shiftPatternId, payload) => {
  try {
    const data = await Http.get(`/job/detail/${orderId}/${shiftPatternId}`, {
      params: payload,
    });
    return data;
  } catch ({ response }) {
    return response.data;
  }
};
