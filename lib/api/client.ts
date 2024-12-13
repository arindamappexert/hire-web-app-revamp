import { API_CONFIG } from "@/config/api";
import axios from "axios";

export const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
