const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = _.maxBy(blogs, (b) => b.likes)

  return favorite === undefined
    ? null
    : {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes,
    }
}

const mostBlogs = (blogs) => {
  const blogsByAuthors = _.countBy(blogs, 'author')

  if (_.isEmpty(blogsByAuthors)) return null

  const counts = Object.values(blogsByAuthors)
  const i = counts.indexOf(Math.max(...counts))
  const authors = Object.keys(blogsByAuthors)

  return {
    author: authors[i],
    blogs: counts[i]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const o = {}

  blogs.forEach((b) => {
    if (!o[b.author]) {
      o[b.author] = 0
    }

    o[b.author] += b.likes
  })

  const authors = Object.keys(o)
  const likes = Object.values(o)
  const i = likes.indexOf(Math.max(...likes))
  const mostLikedAuthor = authors[i]
  const mostLikes = likes[i]

  return {
    author: mostLikedAuthor,
    likes: mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
