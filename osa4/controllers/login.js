const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body

  // Get a correct user from database
  const user = await User.findOne({ username: body.username })

  // Check if password is correct by comparing it to the bcrypt generated hash
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.hash)

  // Send error JSON to client if there is a problem
  if (!(user && passwordIsCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
    })
  }

  // Crate a token which includes username and id
  const t = {
    username: user.username,
    id: user._id,
  }

  console.log(t)

  // Create and sign a JWT with a secret key
  const token = jwt.sign(t, process.env.SECRET_KEY, {
    expiresIn: 60 * 60,
  })

  // Send token to client
  response.send({ token, username: user.username, name: user.name })
})

module.exports = router
