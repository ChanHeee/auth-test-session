const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { User } = require("../models")

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log("dasdassdd")
        try {
          const exUser = await User.findOne({ where: { email } })
          if (exUser) {
            const passwordCheck = await bcrypt.compare(
              password,
              exUser.password
            )
            if (passwordCheck) {
              done(null, exUser)
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." })
            }
          } else {
            done(null, false, { message: "가입되지 않은 이메일입니다." })
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
