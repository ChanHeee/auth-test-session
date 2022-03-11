const passport = require("passport")
const { User } = require("../models")
const local = require("./localStrategy")

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("SerializeUser!")
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
      })
      done(null, user)
    } catch (error) {
      console.error(error)
      done(error)
    }
  })
  local()
}
