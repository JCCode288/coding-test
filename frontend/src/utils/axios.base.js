const { default: axios } = require("axios");
const { cookies } = require("next/headers");

const Axios = axios.create({
   baseURL: process.env.BE_URL,
});

Axios.interceptors.request.use(async (req) => {
   const cookie = await cookies();
   const token = cookie.get("auth_token");

   if (token) req.headers.Authorization = `Bearer ${token}`;

   return req;
});

export default Axios;
