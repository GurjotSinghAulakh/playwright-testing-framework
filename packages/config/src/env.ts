export type EnvConfig = {
  ENV_NAME: string;
  BASE_URL: string;
  API_BASE_URL: string;
};

export const getEnv = (): EnvConfig => {
  return {
    ENV_NAME: process.env.ENV_NAME ?? "local",
    BASE_URL: process.env.BASE_URL ?? "https://example.com",
    API_BASE_URL:
      process.env.API_BASE_URL ?? "https://jsonplaceholder.typicode.com"
  };
};
