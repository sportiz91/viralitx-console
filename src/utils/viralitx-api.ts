import axios, { AxiosInstance } from "axios";

import { serializeRequest } from "@/utils/forms";
import config from "@/config/config";

const viralitxClient: AxiosInstance = axios.create({
  baseURL: config.viralitx.apiUrl,
  timeout: 10000,
  transformRequest: [serializeRequest],
});

["post", "put", "patch"].forEach((method) => {
  if (viralitxClient.defaults.headers[method]) {
    delete (viralitxClient.defaults.headers[method] as Record<string, string>)[
      "Content-Type"
    ];
  }
});

export const viralitxApi = {
  get: (url: string, params = {}) => viralitxClient.get(url, { params }),

  post: (url: string, data = {}, params = {}) =>
    viralitxClient.post(url, data, { params }),

  put: (url: string, data = {}, params = {}) =>
    viralitxClient.put(url, data, { params }),

  patch: (url: string, data = {}, params = {}) =>
    viralitxClient.patch(url, data, { params }),

  delete: (url: string, params = {}) => viralitxClient.delete(url, { params }),
};
