import axios from "axios";

export const sendContent = async ({ content }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/auth/login`,
    {
      content
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};