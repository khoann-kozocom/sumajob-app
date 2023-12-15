import Http from "../api/http";

export async function getDataNews(page) {
  try {
    const rs = await Http.get(`/news?page=${page}`);
    return rs;
  } catch (error) {
    return error;
  }
}
export async function getNewsDetail(idNews) {
  try {
    const rs = Http.get(`/news/${idNews}`);
    return rs;
  } catch (error) {
    return error;
  }
}
