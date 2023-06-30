require('dotenv').config();

function loadConfig() {
  let env = process.env.NODE_ENV;
  let config;

  if (env === 'development') {
    config = {
      // development configuration
    };
  } else if (env === 'production') {
    config = {
      // production configuration
    };
  } else {
    config = {
      // default configuration
    };
  }

  return config;
}
