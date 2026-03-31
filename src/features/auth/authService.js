import axios from "axios";

export const loginUser = async (data) => {
  const res = await axios.post(
     "https://dummyjson.com/auth/login",
    {
      username: data.username,
      password: data.password,
    }
  );
    
  return res.data;
};