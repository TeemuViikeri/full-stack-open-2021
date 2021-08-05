const blogs = require('../utils/mock_blogs')
const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    expect(totalLikes(listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(favoriteBlog([])).toBe(null)
  })

  test('when list has only one blog, equals that blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list returns correct blog', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(mostBlogs([])).toBe(null)
  })

  test('when list has only one blog, equals that blog\'s author', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list returns correct author', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(mostLikes([])).toBe(null)
  })

  test('when list has only one blog, equals that blog\'s author and likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      },
    ]

    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list returns correct author and likes', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
