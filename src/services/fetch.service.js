import instance from "./api.service.js";

const request = (url, method = "GET", data = null) => {
  return instance({
    method,
    url,
    ...(data && { data }),
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Request error:", error);
      throw error;
    });
};

export default request;
