# Real-Time Polling App API Documentation

## Authentication

### Signup
- **POST** `/api/auth/signup`
- **Request Body:**
```
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
  - `201 Created`
    ```
    { "message": "User registered successfully.", "user": { "id": "<user_id>", "name": "John Doe", "email": "user@example.com" } }
    ```
  - `400 Bad Request` / `409 Conflict` / `500 Server Error`

### Signin
- **POST** `/api/auth/signin`
- **Request Body:**
```
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```
- **Response:**
  - `200 OK`
    ```
    {
      "token": "<jwt_token>",
      "refreshToken": "<refresh_token>",
      "user": { "id": "<user_id>", "name": "John Doe", "email": "user@example.com" }
    }
    ```
  - `400 Bad Request` / `401 Unauthorized` / `500 Server Error`

### Refresh Token
- **POST** `/api/auth/refresh`
- **Request Body:**
```
{
  "refreshToken": "<refresh_token>"
}
```
- **Response:**
  - `200 OK`
    ```
    { "token": "<new_jwt_token>" }
    ```
  - `400 Bad Request` / `401 Unauthorized` / `500 Server Error`

---

## Users

### Get Current User
- **GET** `/api/users/me`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - `200 OK`
    ```
    { "id": "<user_id>", "name": "John Doe", "email": "user@example.com" }
    ```
  - `401 Unauthorized` / `500 Server Error`

### Get My Polls
- **GET** `/api/users/me/polls`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - `200 OK`
    ```
    {
      "polls": [
        {
          "_id": "<poll_id>",
          "question": "...",
          "options": [ ... ],
          "createdAt": "<date>",
          "expiresAt": "<date>",
          "createdBy": "<user_id>"
        },
        ...
      ]
    }
    ```
  - `401 Unauthorized` / `500 Server Error`

---

## Polls

**Note:**
- `POST /api/polls` is rate-limited to 10 requests per 10 minutes per IP.
- `POST /api/polls/:id/vote` is rate-limited to 60 requests per minute per IP.

### Create Poll
- **POST** `/api/polls`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
```
{
  "question": "Your poll question?",
  "options": ["Option 1", "Option 2", "Option 3"],
  "expiresAt": "2025-12-31T23:59:59.000Z" // (optional, ISO date string)
}
```
- **Response:**
  - `201 Created`
    ```
    {
      "message": "Poll created successfully.",
      "poll": {
        "_id": "<poll_id>",
        "question": "Your poll question?",
        "options": [
          { "_id": "<option_id>", "text": "Option 1", "votes": 0 },
          ...
        ],
        "createdAt": "<date>",
        "expiresAt": "<date>",
        "createdBy": "<user_id>"
      }
    }
    ```
  - `400 Bad Request` (Missing question/options, or less than 2 options)
  - `429 Too Many Requests` (Rate limit exceeded)
  - `401 Unauthorized` / `500 Server Error`

### Get All Polls (Paginated)
- **GET** `/api/polls?page=1&limit=10`
- **Response:**
  - `200 OK`
    ```
    {
      "polls": [ ... ],
      "total": 100,
      "page": 1,
      "pages": 10
    }
    ```
  - `500 Server Error`

### Get Single Poll
- **GET** `/api/polls/:id`
- **Response:**
  - `200 OK`
    ```
    {
      "poll": {
        "_id": "<poll_id>",
        "question": "...",
        "options": [ ... ],
        "createdAt": "<date>",
        "expiresAt": "<date>"
      }
    }
    ```
  - `404 Not Found` / `500 Server Error`

### Vote on Poll
- **POST** `/api/polls/:id/vote`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
```
{
  "option": "Option 1"
}
```
- **Response:**
  - `200 OK` (New vote)
    ```
    {
      "message": "Vote recorded successfully.",
      "poll": { ... }
    }
    ```
  - `200 OK` (Vote changed)
    ```
    {
      "message": "Vote updated successfully.",
      "poll": { ... }
    }
    ```
  - `400 Bad Request` (Poll expired, option not found, or invalid input)
  - `404 Not Found` (Poll not found)
  - `429 Too Many Requests` (Rate limit exceeded)
  - `401 Unauthorized` / `500 Server Error`

### Get Poll Results
- **GET** `/api/polls/:id/results`
- **Response:**
  - `200 OK`
    ```
    {
      "results": [
        { "_id": "<option_id>", "text": "Option 1", "votes": 5 },
        ...
      ]
    }
    ```
  - `404 Not Found` / `500 Server Error`

### Delete Poll
- **DELETE** `/api/polls/:id`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - `200 OK`
    ```
    { "message": "Poll deleted." }
    ```
  - `403 Forbidden` (Not poll owner)
  - `404 Not Found` / `401 Unauthorized` / `500 Server Error`

---

## Error Response Format
All error responses follow this format:
```
{
  "message": "Error description."
}
```

---

## Socket.io Usage
- Connect to the server using Socket.io from the frontend.
- **JWT Authentication is required:**
  - Connect with: `io('https://your-backend-url', { query: { token: '<jwt_token>' } })`
- Join a poll room to receive real-time updates:
  - `socket.emit('join-poll', '<pollId>')`
- Listen for updates:
  - `socket.on('poll-<pollId>-updated', (options) => { ... })`
- Leave a poll room:
  - `socket.emit('leave-poll', '<pollId>')`

---

## Notes
- All protected endpoints require the `Authorization: Bearer <jwt_token>` header.
- Dates are in ISO 8601 format.
- CORS is restricted to allowed frontend domains. 