import React from 'react'
import Blog from './Blog'

export default function BlogsList({ blogs, updateBlog, deleteBlog, user }) {
  return (
    <div data-cy='blog-list'>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}
