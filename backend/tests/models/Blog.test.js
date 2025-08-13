const mongoose = require('mongoose');
const Blog = require('../../models/Blog');
const User = require('../../models/User');

describe('Blog Model Test', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Test author',
      profile_pic_url: 'https://example.com/john.jpg',
    });
  });

  it('should create a blog with valid data', async () => {
    const validBlog = new Blog({
      title: 'Test Blog',
      sub_title: 'Test Subtitle',
      content: 'Test content',
      slug: 'test-blog',
      tags: ['test', 'blog'],
      author: testUser._id,
    });

    const savedBlog = await validBlog.save();
    expect(savedBlog._id).toBeDefined();
    expect(savedBlog.title).toBe(validBlog.title);
    expect(savedBlog.slug).toBe(validBlog.slug);
    expect(savedBlog.tags).toEqual(validBlog.tags);
    expect(savedBlog.author).toEqual(testUser._id);
  });

  it('should require title field', async () => {
    const blogWithoutTitle = new Blog({
      content: 'Test content',
      slug: 'test-blog',
      author: testUser._id,
    });

    let err;
    try {
      await blogWithoutTitle.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });

  it('should require content field', async () => {
    const blogWithoutContent = new Blog({
      title: 'Test Blog',
      slug: 'test-blog',
      author: testUser._id,
    });

    let err;
    try {
      await blogWithoutContent.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.content).toBeDefined();
  });

  it('should require slug field', async () => {
    const blogWithoutSlug = new Blog({
      title: 'Test Blog',
      content: 'Test content',
      author: testUser._id,
    });

    let err;
    try {
      await blogWithoutSlug.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.slug).toBeDefined();
  });

  it('should require author field', async () => {
    const blogWithoutAuthor = new Blog({
      title: 'Test Blog',
      content: 'Test content',
      slug: 'test-blog',
    });

    let err;
    try {
      await blogWithoutAuthor.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.author).toBeDefined();
  });

  it('should enforce unique slug constraint', async () => {
    const blog1 = new Blog({
      title: 'First Blog',
      content: 'First content',
      slug: 'first-blog',
      author: testUser._id,
    });

    const blog2 = new Blog({
      title: 'Second Blog',
      content: 'Second content',
      slug: 'first-blog',
      author: testUser._id,
    });

    await blog1.save();

    let err;
    try {
      await blog2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000);
  });

  it('should trim string fields', async () => {
    const blog = new Blog({
      title: '  Test Blog  ',
      sub_title: '  Test Subtitle  ',
      content: 'Test content',
      slug: 'test-blog',
      tags: ['  test  ', '  blog  '],
      author: testUser._id,
    });

    const savedBlog = await blog.save();
    expect(savedBlog.title).toBe('Test Blog');
    expect(savedBlog.sub_title).toBe('Test Subtitle');
    expect(savedBlog.tags).toEqual(['test', 'blog']);
  });

  it('should set default values for optional fields', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      content: 'Test content',
      slug: 'test-blog',
      author: testUser._id,
    });

    const savedBlog = await blog.save();
    expect(savedBlog.sub_title).toBe('');
    expect(savedBlog.tags).toEqual([]);
  });

  it('should populate author field correctly', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      content: 'Test content',
      slug: 'test-blog',
      author: testUser._id,
    });

    await blog.save();

    const populatedBlog = await Blog.findById(blog._id).populate(
      'author',
      'first_name last_name bio profile_pic_url'
    );

    expect(populatedBlog.author).toBeDefined();
    expect(populatedBlog.author.first_name).toBe('John');
    expect(populatedBlog.author.last_name).toBe('Doe');
  });

  it('should have correct timestamps', async () => {
    const blog = new Blog({
      title: 'Test Blog',
      content: 'Test content',
      slug: 'test-blog',
      author: testUser._id,
    });

    const savedBlog = await blog.save();
    expect(savedBlog.created_date).toBeDefined();
    expect(savedBlog.modified_date).toBeDefined();
    expect(savedBlog.created_date).toEqual(savedBlog.modified_date);
  });
});
