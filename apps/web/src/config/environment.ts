const Environment = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

const PROD_BASE_URL = import.meta.env.VITE_PROD_BASE_URL;
const DEV_BASE_URL = import.meta.env.VITE_DEV_BASE_URL;

const development = {
  apiUrl: `${DEV_BASE_URL}/api`,
};

const production = {
  apiUrl: `${PROD_BASE_URL}/api`,
};

function getEnvironmentConfig() {
  if (!PROD_BASE_URL || !DEV_BASE_URL) {
    throw new Error("[config]:Configuration values are not provided in .env");
  }

  if (import.meta.env.MODE === Environment.PRODUCTION) {
    console.log("[config]:Running in production mode");
    return production;
  }

  console.log("[config]:Running in development mode");
  return development;
}

export default getEnvironmentConfig();
