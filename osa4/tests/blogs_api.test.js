const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)

describe('when there are blogs in the database', () => {
  let token

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const result = await api
      .post('/api/login')
      .send({ username: 'tepavi', password: 'tiikeri' })
      .expect(200)

    token = result.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs are returned', async () => {
    const blogs = helper.initialBlogs
    const res = await api
      .get('/api/blogs')
      .set('authorization', `bearer ${token}`)
    expect(res.body).toHaveLength(blogs.length)
  })

  test('blogs have a property of id', async () => {
    const res = await api
      .get('/api/blogs')
      .set('authorization', `bearer ${token}`)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBeDefined()
  })

  test('blogs have a user', async () => {
    await Blog.deleteMany({})
    const users = await api.get('/api/users')
    const id = users.body[0].id

    const b = {
      title: 'FACEBOOK for Media',
      author: 'Facebook',
      url: 'https://www.facebook.com/formedia/blog',
      likes: 0,
      user: id,
    }

    await api.post('/api/blogs').set('authorization', `bearer ${token}`).send(b)

    const res = await api
      .get('/api/blogs')
      .set('authorization', `bearer ${token}`)

    expect(res.body[0].user).toBeDefined()
    expect(res.body[0].user.username).toBe('tepavi')
  })

  describe('adding of a new blog', () => {
    test('is successful and the new blog is returned', async () => {
      const users = await api.get('/api/users')
      const id = users.body[0].id

      const b = {
        title: 'FACEBOOK for Media',
        author: 'Facebook',
        url: 'https://www.facebook.com/formedia/blog',
        likes: 0,
        user: id,
      }

      const res = await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(b)
        .expect(200)

      const dbBeforeAdding = helper.initialBlogs
      const dbAfterAdding = await helper.blogsInDb()

      expect(dbAfterAdding).toHaveLength(dbBeforeAdding.length + 1)
      expect(_.omit(res.body, 'id')).toEqual(b)
    })

    test('assigns likes with value 0 to a blog without one', async () => {
      const users = await api.get('/api/users')
      const id = users.body[0].id

      const b = {
        title: 'Test blog',
        author: 'Tester',
        url: 'https://test.blog.com',
        user: id,
      }

      const res = await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(b)
        .expect(200)
      expect(res.body.likes).toBeDefined()
      expect(res.body.likes).toBe(0)
    })

    test('returns status 400 when no title or url given', async () => {
      const b = {
        author: 'Bad tester',
      }

      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(b)
        .expect(400)
    })

    test('fails if request was made without authorization token', async () => {
      const users = await api.get('/api/users')
      const id = users.body[0].id

      const b = {
        title: 'Test blog',
        author: 'Tester',
        url: 'https://test.blog.com',
        user: id,
      }

      await api
        .post('/api/blogs')
        .send(b)
        .expect(401)
    })
  })

  describe('deleting a blog', () => {
    test('is successful and database size has been decresed by one', async () => {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const id = decoded.id

      const b = {
        title: 'Test blog',
        author: 'Tester',
        url: 'https://test.blog.com',
        user: id,
      }

      const addResult = await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(b)
        .expect(200)
      const blogId = addResult.body.id

      const dbBeforeDeleting = await helper.blogsInDb()

      await api
        .delete(`/api/blogs/${blogId}`)
        .set('authorization', `bearer ${token}`)
        .expect(204)

      const dbAfterDeleting = await helper.blogsInDb()

      expect(dbAfterDeleting).toHaveLength(dbBeforeDeleting.length - 1)
    })
  })

  describe('editing a blog', () => {
    test('is successful and amount of likes has changed', async () => {
      const dbBeforeDeleting = await helper.blogsInDb()
      // Do this to deep copy the array of blog objects excluding references
      var blogs = JSON.parse(JSON.stringify(dbBeforeDeleting))
      const b = blogs[0]

      b.likes = 1

      const res = await api
        .put(`/api/blogs/${b.id}`)
        .set('authorization', `bearer ${token}`)
        .send(b)
        .expect(200)
      expect(res.body.likes).toBe(1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
