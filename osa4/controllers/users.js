const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  res.json(users.map((u) => u.toJSON()))
})

router.post('/', async (req, res) => {
  const body = req.body

  if (!body.password) {
    return res.status(400).json({ error: 'password missing' })
  }

  if (body.password.length < 3) {
    return res.status(400).json({ error: 'password too short' })
  }

  // Create a hashed password with bcrypt
  const hash = await bcrypt.hash(body.password, 10)

  // Create a new user object
  const user = new User({
    username: body.username,
    name: body.name,
    hash,
    blogs: body.blogs ? body.blogs : [],
  })

  // Save user to database
  const savedUser = await user.save()
  // Return saved user
  res.json(savedUser)
})

router.delete('/', async (req, res) => {
  await User.deleteMany({})
  res.sendStatus(204)
})

module.exports = router
