// Logs normal message console
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// Logs error message to console
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

module.exports = {
  info,
  error,
}
