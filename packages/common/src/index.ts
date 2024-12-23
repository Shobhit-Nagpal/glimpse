import dotenv from "dotenv";

dotenv.config();

const API_VERSION = process.env.API_VERSION;
const DEVELOPMENT_URL = process.env.DEVELOPMENT_URL;
const PRODUCTION_URL = process.env.PRODUCTION_URL;

if (!API_VERSION || !DEVELOPMENT_URL || !PRODUCTION_URL) {
  throw new Error("[common]: Configuration details missing");
}

type Environment = "development" | "production";

interface Config {
  apiBaseUrl: string;
  apiVersion: string;
}

const development = {
  apiBaseUrl: DEVELOPMENT_URL,
  apiVersion: API_VERSION,
};

const production = {
  apiBaseUrl: PRODUCTION_URL,
  apiVersion: API_VERSION,
};

const config: Record<Environment, Config> = {
  development,
  production,
};

function getConfig() {
  const environment = (process.env.NODE_ENV || "development") as Environment;
  return config[environment];
}

export default getConfig();
