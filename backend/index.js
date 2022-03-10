//* @import middlewares
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const passport = require("passport")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

//* @import Routers
const indexRouter = require("./routes/indexRoutes")

dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/", indexRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`)
})
