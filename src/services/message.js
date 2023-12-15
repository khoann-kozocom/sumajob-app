import Http from "../api/http";

export async function getDataMessages(page) {
  try {
    const rs = await Http.get(`/messages?page=${page}`);
    return rs;
  } catch (error) {
    return error;
  }
}

export async function getMessageDetail(idMessage) {
  try {
    const rs = await Http.get(`/messages/${idMessage}`);
    return rs;
  } catch (error) {
    return error;
  }
}
