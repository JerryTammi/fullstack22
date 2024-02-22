const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
//const blogRouter = require('../controllers/blogs')

const initalBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
   
    for (const blog of initalBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are six blogs in the beginning', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
})

test('blogs contain id', async () => {
    const response = await api.get('/api/blogs')
    const blog_ids = response.body.map(blog => blog.id)
    assert.strictEqual(blog_ids.length, 6)
    response.body.forEach(blog => {
        assert('id' in blog)
    })
})  

test('add new blog', async () => {
    const newBlog = {
        title: "Test Blog of add new blog test",
        author: "Test Tester",
        url: "http://test.test.com/test",
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 7)
    const blog_titles = response.body.map(blog => blog.title)
    assert(blog_titles.includes("Test Blog of add new blog test"))
})

test('add new blog with no likes', async () => {
    const newBlog = {
        title: "This blog has no likes",
        author: "Test Tester",
        url: "http://test.test.com/test"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const createdBlog = response.body.find(blog => blog.title === 'This blog has no likes')
    assert.strictEqual(createdBlog.likes, 0)
})

test('cant add blog with no title', async () => {
    const newBlog = {
        author: "Test Tester",
        url: "http://test.test.com/test",
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('cant add blog with no url', async () => {
    const newBlog = {
        title: "This blog has no likes",
        author: "Test Tester"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('delete blog', async () => {
    const response = await api.get('/api/blogs')
    const blogToDelete = response.body[0]
    assert.strictEqual(blogToDelete.title, "React patterns")
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    const newResponse = await api.get('/api/blogs')
    assert.strictEqual(newResponse.body.length, initalBlogs.length - 1)
    const blogs = newResponse.body.map(b => b.title)
    assert(!blogs.includes(blogToDelete.title))
})

test('update blog with more likes', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]
    assert.strictEqual(blogToUpdate.title, "React patterns")

    const blogToBeUpdated = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 15
    }
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToBeUpdated)
        .expect(200)

    const updateBlogs = await api.get('/api/blogs')
    assert.strictEqual(updateBlogs.body[0].likes, 15)
})

after(async () => {
    await mongoose.connection.close()
})