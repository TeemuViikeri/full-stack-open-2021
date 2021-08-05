const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

describe('when there are users and blogs at db already', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const hash = await bcrypt.hash('secret key', 10)
    const user = new User({ username: 'root', hash })
    await user.save()
  })

  test('users can be fetched', async () => {
    const start = await helper.usersInDb()
    const users = await api.get('/api/users').expect(200)
    expect(users.body).toHaveLength(start.length)
  })

  describe('and users are being created', () => {
    test('a new user can be created successfully', async () => {
      const start = await helper.usersInDb()

      const user = {
        username: 'teme',
        name: 'Teemu Viikeri',
        password: 'salasana',
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const end = await helper.usersInDb()
      expect(end).toHaveLength(start.length + 1)

      const usernames = end.map((u) => u.username)
      expect(usernames).toContain(user.username)
    })

    test('a missing username results in a fail', async () => {
      const user = {
        name: 'Teemu Viikeri',
        password: 'salasana',
      }

      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toMatch(/User validation failed/)
    })

    test('a too short username results in a fail', async () => {
      const user = {
        username: 'TV',
        name: 'Teemu Viikeri',
        password: 'salasana',
      }

      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toMatch(/User validation failed/)
    })

    test('a missing password results in a fail', async () => {
      const user = {
        username: 'tepavi',
        name: 'Teemu Viikeri',
      }

      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toMatch(/password missing/)
    })

    test('a too short password results in a fail', async () => {
      const user = {
        username: 'tepavi',
        name: 'Teemu Viikeri',
        password: 'ss',
      }

      const result = await api
        .post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toMatch(/password too short/)
    })

    test('created users have blog objects populated', async () => {
      await User.deleteMany({})
      await Blog.deleteMany({})

      const user = {
        username: 'tepavi',
        name: 'Teemu Viikeri',
        password: 'salasana',
      }

      await api.post('/api/users').send(user)

      const login = await api
        .post('/api/login')
        .send({ username: 'tepavi', password: 'salasana' })
        .expect(200)

      const token = login.body.token

      const users = await helper.usersInDb()
      const id = users[0].id

      const blog = {
        title: 'FACEBOOK for Media',
        author: 'Facebook',
        url: 'https://www.facebook.com/formedia/blog',
        likes: 0,
        user: id,
      }

      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${token}`)
        .send(blog)
        .expect(200)

      const result = await api.get('/api/users').expect(200)

      expect(result.body[0].blogs).toBeDefined()
      expect(result.body[0].blogs).toHaveLength(1)
      expect(result.body[0].blogs[0].author).toBe('Facebook')
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
