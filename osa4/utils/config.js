// Import dotenv
require('dotenv').config()

// MongoDB URI for the blog database
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
// Server port number
let PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT,
}
