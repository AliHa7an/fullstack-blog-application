const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../../controllers/blogController');

const app = express();
app.use(express.json());

describe('Blog Controller Tests', () => {
  let testUser;
  let testBlog;

  beforeEach(async () => {
    testUser = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Test author',
      profile_pic_url: 'https://example.com/john.jpg'
    });

    testBlog = await Blog.create({
      title: 'Test Blog',
      sub_title: 'Test Subtitle',
      content: 'Test content',
      slug: 'test-blog',
      tags: ['test', 'blog'],
      author: testUser._id
    });
  });

  describe('getBlogs', () => {
    it('should return blogs with pagination', async () => {
      const req = {
        query: { page: 1, limit: 10 }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getBlogs(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          blogs: expect.any(Array),
          pagination: expect.objectContaining({
            current_page: 1,
            total_pages: 1,
            total_blogs: 1,
            blogs_per_page: 10
          })
        })
      );
    });

    it('should filter blogs by tags', async () => {
      const req = {
        query: { tags: 'test' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getBlogs(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          blogs: expect.arrayContaining([
            expect.objectContaining({
              title: 'Test Blog',
              tags: expect.arrayContaining(['test'])
            })
          ])
        })
      );
    });
  });

  describe('getBlogById', () => {
    it('should return a blog by id', async () => {
      const req = {
        params: { id: testBlog._id }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getBlogById(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: testBlog._id.toString(),
          title: 'Test Blog'
        })
      );
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getBlogById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blog not found' });
    });
  });

  describe('createBlog', () => {
    it('should create a new blog', async () => {
      const blogData = {
        title: 'New Blog',
        sub_title: 'New Subtitle',
        content: 'New content',
        slug: 'new-blog',
        tags: ['new', 'blog'],
        author: testUser._id
      };

      const req = {
        body: blogData
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await createBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Blog',
          slug: 'new-blog'
        })
      );
    });

    it('should return error for duplicate slug', async () => {
      const blogData = {
        title: 'Duplicate Blog',
        content: 'Content',
        slug: 'test-blog',
        author: testUser._id
      };

      const req = {
        body: blogData
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await createBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Slug already exists' });
    });
  });

  describe('updateBlog', () => {
    it('should update an existing blog', async () => {
      const updateData = {
        title: 'Updated Blog',
        content: 'Updated content'
      };

      const req = {
        params: { id: testBlog._id },
        body: updateData
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await updateBlog(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: testBlog._id.toString(),
          title: 'Updated Blog',
          content: 'Updated content'
        })
      );
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId },
        body: { title: 'Updated' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await updateBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blog not found' });
    });

    it('should return error for duplicate slug', async () => {
      const anotherBlog = await Blog.create({
        title: 'Another Blog',
        content: 'Content',
        slug: 'another-blog',
        author: testUser._id
      });

      const req = {
        params: { id: testBlog._id },
        body: { slug: 'another-blog' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await updateBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Slug already exists' });
    });
  });

  describe('deleteBlog', () => {
    it('should delete an existing blog', async () => {
      const req = {
        params: { id: testBlog._id }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await deleteBlog(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Blog deleted successfully' });
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await deleteBlog(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Blog not found' });
    });
  });
}); 