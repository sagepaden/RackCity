import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
const config = {
  apiBasePath: 'http://localhost:8000',
  reactAppMode: process.env.REACT_APP_MODE || 'dev',
};

export default config;
