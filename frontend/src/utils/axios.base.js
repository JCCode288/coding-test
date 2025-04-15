import axios from "axios";

const Axios = axios.create({
   baseURL: process.env.BE_URL,
});

export default Axios;
