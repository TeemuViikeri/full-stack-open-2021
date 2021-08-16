// Import custom logger
const logger = require('./logger')
const jwt = require('jsonwebtoken')

// Logs most relevant information about an HTTP request
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
// Informs client the HTTP request endpoint is unknown
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Error logs the error message and informs client about the reason of the error
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Authentication token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Authentication token expired',
    })
  }

  next(error)
}

// Extracts token from header and puts it into request
const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  } else {
    return next()
  }

  next()
}

// Extracts user from header and puts it into request
const userExtractor = (request, response, next) => {
  const token = request.token

  if (!token) {
    return response
      .status(401)
      .json({ error: 'Authentication token not found or invalid' })
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  request.user = decoded

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
