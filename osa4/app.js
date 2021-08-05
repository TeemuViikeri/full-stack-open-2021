// Import config vars
const config = require('./utils/config')
// Import Express function
const express = require('express')
// Import middleware that brings in Express 5 automatic error nexting feature
require('express-async-errors')
// Initialize an Express application
const app = express()
// Import CORS middleware
const cors = require('cors')
// Import HTTP request controller for login
const loginRouter = require('./controllers/login')
// Import HTTP request controller for blogs
const blogsRouter = require('./controllers/blogs')
// Import HTTP request controller for users
const usersRouter = require('./controllers/users')
// Import object including custom middlewares
const middleware = require('./utils/middleware')
// Import object including loggers
const logger = require('./utils/logger')
// Import Mongoose
const mongoose = require('mongoose')

// Log connection URL when trying to establish a connection
logger.info('Connecting to', config.MONGODB_URI)

// Connect to MongoDB database
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

// Enable CORS with CORS middlware
app.use(cors())
// Serve static frontend build folder to Express
//  app.use(express.static('build')) <-- frontend build
// Use Express' built-in json-parser middleware to populate request body with parsed data
app.use(express.json())
// Use custom request logger middleware
app.use(middleware.requestLogger)
// Use login router and set its base path
app.use('/api/login', loginRouter)
// Use blogs router and set its base path
app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
)
// Use blogs router and set its base path
app.use('/api/users', usersRouter)
// Use custom unknown endpoint middleware
app.use(middleware.unknownEndpoint)
// Use custom error handler middleware
app.use(middleware.errorHandler)

module.exports = app
