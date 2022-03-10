const notFound = (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  console.log(err.name, ": ", err.message)
  if (process.env.NODE_ENV === "DEV") {
    res.send(`<h1>${err.message}</h1>
          <h2>${err.status}</h2>
          <pre>${err.stack}</pre>`)
  }
}

module.exports = { notFound, errorHandler }
