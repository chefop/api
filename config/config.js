require('dotenv').config();

const configServ = process.env;
const env = configServ.SERV_ENV;

const dev = {
  app: {
    port: configServ.APP_PORT,
  },
  db: {
    host: configServ.DB_HOST,
    port: configServ.DB_PORT,
    name: configServ.DB_NAME_DEV,
  },
};

const test = {
  app: {
    port: configServ.APP_PORT,
  },
  db: {
    host: configServ.DB_HOST,
    port: configServ.DB_PORT,
    name: configServ.DB_NAME_TEST,
  },
};

const config = {
  dev,
  test,
};

module.exports = config[env];
