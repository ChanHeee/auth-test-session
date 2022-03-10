const express = require("express")
const router = express.Router()

//*  @desc    Running Test
//*  @route   GET /
//*  @access  Public
router.get("/", (req, res) => {
  res.send("Api server is running...")
})

module.exports = router
