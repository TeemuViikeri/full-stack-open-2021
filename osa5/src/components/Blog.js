import React, { useState } from 'react'
export default function Blog({ blog, updateBlog, deleteBlog, user }) {
  const [isOpen, setIsOpen] = useState(false)

  const blogStyle = {
    padding: '8px 4px',
    border: 'solid 1px black',
    marginBottom: 5,
  }

  return (
    <div data-cy="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button data-cy='view-btn' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'hide' : 'view'}
      </button>
      {isOpen ? (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}{' '}
            <button
              data-cy='like-btn'
              onClick={() => {
                const b = {
                  ...blog,
                  likes: blog.likes + 1,
                  user: blog.user.id,
                }
                updateBlog(b)
              }}
            >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username ? (
            <button
              data-cy='delete-btn'
              onClick={() => {
                if (
                  window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
                ) {
                  deleteBlog(blog)
                }
              }}
            >
              remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
