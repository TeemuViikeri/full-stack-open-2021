// Import Express application
const app = require('./app')
// Import config object
const config = require('./utils/config')
// Set constant variable for port number from config object
const PORT = config.PORT

// Listen to requests made to server on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
