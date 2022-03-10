const passport = require("passport")

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

module.exports = { login, loginCkeck, logout }
