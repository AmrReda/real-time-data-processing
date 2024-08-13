import { API } from "aws-amplify";

export async function fetchData() {
  try {
    const data = await API.get("dataAPI", "/data");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
