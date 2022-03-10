const Sequelize = require("sequelize")
const User = require("./User")
const config = require("../config/config")[process.env.NODE_ENV]

const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize
db.User = User

User.init(sequelize)

module.exports = db
