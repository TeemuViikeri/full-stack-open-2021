import React, { useState, useEffect } from 'react'
import BlogsList from './components/BlogsList'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import LoggedInfo from './components/LoggedInfo'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isOperationSuccessful, setIsOperationSuccessful] = useState(true)

  useEffect(() => {
    const localUser = window.localStorage.getItem('loggedUser')

    if (localUser) {
      const parsedUser = JSON.parse(localUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const fetchData = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUserLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(null)
    } catch (e) {
      console.log(e)
      setIsOperationSuccessful(false)
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const createBlog = async (blog) => {
    try {
      await blogService.create(blog)
      setIsOperationSuccessful(true)
      setNotification(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      fetchData()
    } catch (e) {
      console.log(e)
      setIsOperationSuccessful(false)
      setNotification('An error occured during adding a new blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      await blogService.update(blog.id, blog)
      setIsOperationSuccessful(true)
      setNotification(`Blog ${blog.title} updated`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      fetchData()
    } catch (e) {
      console.log(e)
      setIsOperationSuccessful(false)
      setNotification('An error occured during updating a blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setIsOperationSuccessful(true)
      setNotification(`Blog ${blog.title} deleted`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      fetchData()
    } catch (e) {
      console.log(e)
      setIsOperationSuccessful(false)
      setNotification('An error occured during deleting a blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <Notification
            message={notification}
            success={isOperationSuccessful}
          />
          <Togglable buttonLabel='Log in'>
            <LoginForm
              handleUserLogin={handleUserLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification
            message={notification}
            success={isOperationSuccessful}
          />
          <LoggedInfo user={user} setUser={setUser} />
          <Togglable buttonLabel='Create new blog'>
            <CreateForm createBlog={createBlog} />
          </Togglable>
          <BlogsList
            blogs={blogs}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        </div>
      )}
    </div>
  )
}

export default App
