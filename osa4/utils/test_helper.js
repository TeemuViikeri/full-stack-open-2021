const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'tepavi',
    name: 'Teemu Viikeri',
    hash: '$2a$10$umQKQr8mo5K58lIO0nf88..LszD3Oct7Uefrc/cnWIevG.6x8FyoW',
    blogs: [],
  },
]

const initialBlogs = [
  {
    title: 'The Keyword',
    author: 'Google',
    url: 'https://blog.google/',
    likes: 0,
    user: null
  },
  {
    title: 'Twitter Blog',
    author: 'Twitter',
    url: 'https://blog.twitter.com/',
    likes: 0,
    user: null
  },
]

const nonExistingId = async () => {
  const b = {
    title: 'Twitter Blog',
    author: 'Twitter',
    url: 'https://blog.twitter.com/',
    likes: 0,
  }

  const blog = new Blog(b)
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
