const notFound = (req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
}

const errorHandler = (err, req, res, next) => {
  res.json({
    error: {
      message: err.message,
    },
  })
}

module.exports = { notFound, errorHandler }
