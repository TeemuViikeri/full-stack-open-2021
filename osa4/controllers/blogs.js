// Create an Express Router
const router = require('express').Router()
// Import Blog model
const Blog = require('../models/blog')
const User = require('../models/user')

// Returns all blogs in database
router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((b) => b.toJSON()))
})

// Saves a new blog to database
router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog(body)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// Deletes a blog from database
router.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Request made with invalid id' })
  }
})

// Edit a blog in database
router.put('/:id', async (request, response) => {
  const newBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
    }
  )

  response.json(newBlog.toJSON())
})

// Delete all blogs in database
router.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.sendStatus(204)
})

module.exports = router
