import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()

    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title:
            <input
              className='titleInput'
              type='text'
              name='title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              className='authorInput'
              type='text'
              name='author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              className='urlInput'
              type='text'
              name='url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <input type='submit' value='create' />
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default CreateForm
