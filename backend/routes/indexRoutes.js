const express = require("express")
const router = express.Router()

//*  @desc    Running Test
//*  @route   GET /
//*  @access  Public
router.get("/", (req, res, next) => {
  res.send("Api server is running...")
})

router.get("/error", (req, res, next) => {
  const err = new Error("error middleware test")
  err.status = 401
  next(err)
})

module.exports = router
