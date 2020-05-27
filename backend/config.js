import dotenv from "dotenv";

dotenv.config();

export default {
  axiosConfig: {
    url: `http://${process.env.API_BASE}${process.env.API_PATH}`,
    proxy: process.env.USE_PROXY && {
      host: process.env.PROXY_HOST,
      port: process.env.PROXY_PORT,
    },
  },
};
