const express = require("express")
const passport = require("passport")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("/auth is running...")
})

//*  @desc    Login
//*  @route   Post /auth
//*  @access  Public
router.post("/login", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      console.error(err)
      return next(err)
    }
    if (!user) {
      return res.json({ sucess: false, message: info.message })
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError)
        return next(loginError)
      }

      return res.json({ success: true, user })
    })
  })
})

module.exports = router
