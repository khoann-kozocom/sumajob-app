import Http from "../api/http";

export async function getSumajobStaffDetail() {
  try {
    const result = await Http.get("/sumajob-staff");
    return result;
  } catch ({ response }) {
    return response;
  }
}
