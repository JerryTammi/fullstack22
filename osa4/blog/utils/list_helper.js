const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const countLikes = (blogs) => {
        let likes = 0
        blogs.forEach(blog => {
            likes += blog.likes
        });
        return likes
    }
    return blogs.length === 0
        ? 0
        : countLikes(blogs)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return NaN
    }
    let topBlog = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > topBlog.likes) {
            topBlog = blog
        }
    })
    return topBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let authors = []
    blogs.forEach(blog => {
        const author = authors.find(a => a.author === blog.author)
        if (author === undefined) {
            const newAuthor = {
                author: blog.author,
                blogs: 1
            }
            authors.push(newAuthor)
        } else {
            const changedAuthor = {...author, blogs: author.blogs + 1}
            authors = authors.map(a => a.author !== author.author ? a : changedAuthor)
        }
    })
    let topAuthor = authors[0]
    authors.forEach(author => {
        if (author.blogs > topAuthor.blogs) {
            topAuthor = author
        }
    })
    return topAuthor
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let authors = []
    blogs.forEach(blog => {
        const author = authors.find(a => a.author === blog.author)
        if (author === undefined) {
            const newAuthor = {
                author: blog.author,
                likes: blog.likes
            }
            authors.push(newAuthor)
        } else {
            const changedAuthor = {...author, likes: author.likes + blog.likes}
            authors = authors.map(a => a.author !== author.author ? a : changedAuthor)
        }
    })
    let topAuthor = authors[0]
    authors.forEach(author => {
        if (author.likes > topAuthor.likes) {
            topAuthor = author
        }
    })
    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}