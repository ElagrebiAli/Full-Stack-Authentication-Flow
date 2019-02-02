const config = require('./env.config.json');

const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  console.log(config);
  const defaultConfig = config.development;
  const envConfig = config[env];
  const finalConfig = Object.assign(defaultConfig, envConfig);
  Object.keys(finalConfig).forEach(key => {
    process.env[key] = finalConfig[key];
  });
}
