require("dotenv").config()

const env = process.env

const DEV = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: "auth-app",
  host: "127.0.0.1",
  dialect: "mysql",
}

const PROD = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: "auth-app",
  host: "mysql",
  dialect: "mysql",
}

module.exports = { DEV, PROD }
