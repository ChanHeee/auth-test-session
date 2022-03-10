const express = require("express")
const {
  login,
  loginCkeck,
  logout,
  join,
} = require("../controllers/authController")
const router = express.Router()

router.get("/", (req, res) => {
  res.send("/auth is running...")
})

router.post("/login", login)

router.get("/logincheck", loginCkeck)

router.get("/logout", logout)

router.post("/join", join)

module.exports = router
