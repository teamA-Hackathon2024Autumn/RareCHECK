import axios from "axios";

export const ApiTest = async () => {
  const response = await axios.get("/api/items");
  return response.data;
};
