import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  test('blog is created with right props', () => {
    const createBlog = jest.fn()

    const component = render(<CreateForm createBlog={createBlog} />)

    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('.titleInput')
    const authorInput = component.container.querySelector('.authorInput')
    const urlInput = component.container.querySelector('.urlInput')

    fireEvent.change(titleInput, {
      target: { value: 'Test blog' },
    })
    fireEvent.change(authorInput, {
      target: { value: 'Tester' },
    })
    fireEvent.change(urlInput, {
      target: { value: 'www.test.com' },
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('Test blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Tester')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
  })
})
