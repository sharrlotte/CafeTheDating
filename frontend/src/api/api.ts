import { env } from "../config/env";
import axios from "axios";
const api = axios.create({ baseURL: env.backend_url });
export default api;
