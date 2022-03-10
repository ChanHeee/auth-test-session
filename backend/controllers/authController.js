const passport = require("passport")
const { User } = require("../models")
const bcrypt = require("bcrypt")

//*  @desc    Login
//*  @route   Post /auth
//*  @access  Public
const login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (!user) {
      const error = new Error(info.message)
      return next(error)
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      }

      return res.json({ user })
    })
  })(req, res, next)
}

//*  @desc    Login Check
//*  @route   Post /auth/logincheck
//*  @access  Public
const loginCkeck = (req, res, next) => {
  if ("passport" in req.session) {
    res.json({ user: req.user })
  } else {
    const err = new Error("not logged in")
    next(err)
  }
}

//*  @desc    Logout
//*  @route   Post /auth/logout
//*  @access  Public
const logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.json({ logout: true })
}

//*  @desc    Logout
//*  @route   Post /auth/logout
//*  @access  Public
const join = async (req, res, next) => {
  const { email, nick, password, passwordCheck } = req.body
  try {
    const exEmail = await User.findOne({ where: { email } })
    if (exEmail) {
      const error = new Error("This email is already registered.")
      return next(error)
    }
    const exNick = await User.findOne({ where: { nick } })
    if (exNick) {
      const error = new Error("this nickname is already taken")
      return next(error)
    }
    const newUser = await User.create({
      email,
      nick,
      password: bcrypt.hashSync(password, 10),
    })
    res.json({ user: newUser })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { login, loginCkeck, logout, join }
