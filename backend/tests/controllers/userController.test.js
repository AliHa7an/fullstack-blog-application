const mongoose = require('mongoose');
const User = require('../../models/User');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/userController');

describe('User Controller Tests', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Test user',
      profile_pic_url: 'https://example.com/john.jpg'
    });
  });

  describe('getUsers', () => {
    it('should return users with pagination', async () => {
      const req = {
        query: { page: 1, limit: 10 }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          users: expect.any(Array),
          pagination: expect.objectContaining({
            current_page: 1,
            total_pages: 1,
            total_users: 1,
            users_per_page: 10
          })
        })
      );
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const req = {
        params: { id: testUser._id }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: testUser._id.toString(),
          first_name: 'John',
          last_name: 'Doe'
        })
      );
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        first_name: 'Jane',
        last_name: 'Smith',
        bio: 'New user',
        profile_pic_url: 'https://example.com/jane.jpg'
      };

      const req = {
        body: userData
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          first_name: 'Jane',
          last_name: 'Smith'
        })
      );
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateData = {
        first_name: 'Updated John',
        bio: 'Updated bio'
      };

      const req = {
        params: { id: testUser._id },
        body: updateData
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await updateUser(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: testUser._id.toString(),
          first_name: 'Updated John',
          bio: 'Updated bio'
        })
      );
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId },
        body: { first_name: 'Updated' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const req = {
        params: { id: testUser._id }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: fakeId }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });
}); 