import axios from "axios";

export const unsplashAPI = axios.create({
  baseURL: "https://api.unsplash.com",
});

unsplashAPI.interceptors.request.use((fulfilled) => {
  fulfilled.params = {
    ...fulfilled.params,
    client_id: import.meta.env.VITE_UNSPLASH_KEY,
  };
  return fulfilled;
});
