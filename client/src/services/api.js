import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL; // from your .env

export const createChannel = async (data, token) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/channels/createChannel`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // if you're using cookies
    }
  );
  return response.data;
};
