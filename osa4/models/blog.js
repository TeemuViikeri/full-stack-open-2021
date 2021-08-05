// Import Mongoose
const mongoose = require('mongoose')

// Create a schema for blog objects
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// Delete _id and __v from JSON objects returned from MongoDB
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Create a blog model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
