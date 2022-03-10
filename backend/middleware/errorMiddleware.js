const notFound = (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "DEV") {
    res.send(`<h1>${err.message}</h1>
          <h2>${err.status}</h2>
          <pre>${err.stack}</pre>`)
  }
}

module.exports = { notFound, errorHandler }
