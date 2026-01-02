//production
// export const BASE_URL = "/api";

//dev
// export const BASE_URL = "http://localhost:3000";

// dynamic
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000": "/api";
