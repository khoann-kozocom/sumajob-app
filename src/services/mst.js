import Http from "../api/http";

export const getPrefs = async () => {
  try {
    const { data } = await Http.get("mst/prefs");
    return data;
  } catch (err) {
    return err;
  }
};
