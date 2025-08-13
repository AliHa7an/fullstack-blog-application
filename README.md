# Blog Application

A full-stack blog application with Node.js backend, React frontend, and React Native mobile app.

## Project Structure

```
blog-application/
├── backend/          # Node.js API with Express and MongoDB
│   ├── controllers/  # Business logic controllers
│   ├── middleware/   # Custom middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── tests/        # Unit and integration tests
├── frontend/         # React web application
└── app/             # React Native mobile application
```

## Backend Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/SampleBlogs
PORT=5000
```

### Database Setup
```bash
# Seed the database with sample data
node seed.js
```

### Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Blogs
- `GET /api/blogs` - List blogs with pagination and tag filtering
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog by ID
- `DELETE /api/blogs/:id` - Delete blog by ID

### Users
- `GET /api/users` - List users with pagination
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)

### Installation
```bash
cd frontend
npm install
```

### Start the Application
```bash
npm start
```

The web application will be available at `http://localhost:3000`

## Mobile App Setup

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
```bash
cd app
npm install
```

### Start the Mobile App
```bash
npm start
```

This will open the Expo development server. You can run the app on:
- iOS Simulator: Press `i`
- Android Emulator: Press `a`
- Physical device: Scan the QR code with Expo Go app

## Features

### Backend
- Express.js REST API with MVC architecture
- MongoDB with Mongoose ODM
- Controllers for business logic separation
- Middleware for error handling and async operations
- Comprehensive unit and integration tests
- Pagination support
- Tag filtering
- Blog and User CRUD operations

### Frontend (React)
- Modern React with hooks
- Redux Toolkit for state management
- Responsive design
- Tag filtering
- Pagination
- Clean and modern UI

### Mobile App (React Native)
- Cross-platform mobile app
- Redux Toolkit for state management
- Pull-to-refresh
- Infinite scrolling
- Tag filtering
- Native mobile UI

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest (Testing)
- Supertest (Integration Testing)
- CORS

### Frontend
- React.js
- Redux Toolkit
- React Router
- Axios
- CSS3

### Mobile
- React Native
- Expo
- Redux Toolkit
- React Navigation
- Axios

## Testing

The backend includes comprehensive testing:

- **Unit Tests**: Test individual controller functions and model validation
- **Integration Tests**: Test API endpoints using supertest
- **Model Tests**: Test Mongoose schema validation and methods

Run tests with:
```bash
cd backend
npm test
``` 