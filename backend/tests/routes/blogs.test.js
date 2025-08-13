const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const blogRoutes = require('../../routes/blogs');

const app = express();
app.use(express.json());
app.use('/api/blogs', blogRoutes);

describe('Blog Routes Integration Tests', () => {
  let testUser;
  let testBlog;

  beforeEach(async () => {
    testUser = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Test author',
      profile_pic_url: 'https://example.com/john.jpg',
    });

    testBlog = await Blog.create({
      title: 'Test Blog',
      sub_title: 'Test Subtitle',
      content: 'Test content',
      slug: 'test-blog',
      tags: ['test', 'blog'],
      author: testUser._id,
    });
  });

  describe('GET /api/blogs', () => {
    it('should return blogs with pagination', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('blogs');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination.current_page).toBe(1);
      expect(response.body.blogs).toHaveLength(1);
    });

    it('should filter blogs by tags', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .query({ tags: 'test' })
        .expect(200);

      expect(response.body.blogs).toHaveLength(1);
      expect(response.body.blogs[0].tags).toContain('test');
    });

    it('should return empty array for non-matching tags', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .query({ tags: 'nonexistent' })
        .expect(200);

      expect(response.body.blogs).toHaveLength(0);
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should return a blog by id', async () => {
      const response = await request(app)
        .get(`/api/blogs/${testBlog._id}`)
        .expect(200);

      expect(response.body._id).toBe(testBlog._id.toString());
      expect(response.body.title).toBe('Test Blog');
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app).get(`/api/blogs/${fakeId}`).expect(404);
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog', async () => {
      const blogData = {
        title: 'New Blog',
        sub_title: 'New Subtitle',
        content: 'New content',
        slug: 'new-blog',
        tags: ['new', 'blog'],
        author: testUser._id,
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(blogData)
        .expect(201);

      expect(response.body.title).toBe('New Blog');
      expect(response.body.slug).toBe('new-blog');
    });

    it('should return 400 for duplicate slug', async () => {
      const blogData = {
        title: 'Duplicate Blog',
        content: 'Content',
        slug: 'test-blog',
        author: testUser._id,
      };

      await request(app).post('/api/blogs').send(blogData).expect(400);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update an existing blog', async () => {
      const updateData = {
        title: 'Updated Blog',
        content: 'Updated content',
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe('Updated Blog');
      expect(response.body.content).toBe('Updated content');
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/blogs/${fakeId}`)
        .send({ title: 'Updated' })
        .expect(404);
    });

    it('should return 400 for duplicate slug', async () => {
      const anotherBlog = await Blog.create({
        title: 'Another Blog',
        content: 'Content',
        slug: 'another-blog',
        author: testUser._id,
      });

      await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .send({ slug: 'another-blog' })
        .expect(400);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete an existing blog', async () => {
      await request(app).delete(`/api/blogs/${testBlog._id}`).expect(200);

      const deletedBlog = await Blog.findById(testBlog._id);
      expect(deletedBlog).toBeNull();
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app).delete(`/api/blogs/${fakeId}`).expect(404);
    });
  });
});
