#!/bin/bash

echo "Setting up Blog Application..."

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "Installing mobile app dependencies..."
cd app
npm install
cd ..

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start MongoDB"
echo "2. Backend: cd backend && npm run dev"
echo "3. Frontend: cd frontend && npm start"
echo "4. Mobile: cd app && npm start" 