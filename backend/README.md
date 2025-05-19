
# ConnectShare Backend API

This is the backend API for ConnectShare, a social media application.

## Getting Started

1. Install dependencies:
```
npm install
```

2. Create a .env file in the root directory with the following variables:
```
PORT=5000
JWT_SECRET=your_jwt_secret
```

3. Start the development server:
```
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:username` - Get user by username
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/comment` - Comment on a post

## Technologies Used
- Node.js
- Express
- JWT for authentication
- Bcrypt for password hashing
