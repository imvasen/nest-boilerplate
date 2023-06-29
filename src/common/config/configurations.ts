export const loadConfig = () => ({
  port: parseInt(process.env.PORT, 10),
  logLevel: process.env.LOG_LEVEL,
  environment: process.env.NODE_ENV,
});
