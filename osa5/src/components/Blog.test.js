import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mLike

  const blog = {
    title: 'Test title',
    author: 'Tester',
    url: 'www.test.com',
    likes: 0,
    user: {
      name: 'Test user',
      username: 'test',
    },
  }

  const user = {
    username: 'test',
  }

  beforeEach(() => {
    mLike = jest.fn()
    component = render(
      <Blog className='blog' blog={blog} user={user} updateBlog={mLike} />
    )
  })

  test('renders only title and author', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('url and likes are shown when view button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.user.name)
  })

  test('mock handler confirms like button is pressed twice', () => {
    const show = component.getByText('view')
    fireEvent.click(show)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mLike.mock.calls).toHaveLength(2)
  })
})
