# Scalable URL Shortener with LRU Cache

Backend system design project demonstrating caching and low-latency URL redirection.

## Features

- URL shortening and redirection
- Custom LRU Cache using Doubly Linked List + HashMap
- O(1) cache lookup optimization
- RESTful APIs with Node.js and Express
- MongoDB persistent storage
- Click analytics tracking
- Low-latency URL redirection

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

### Shorten URL

POST /api/url/shorten

### Redirect URL

GET /api/url/:code

### Analytics

GET /api/url/analytics/:code

## Installation

```bash
npm install
node server.js
```

## License

This project is for educational and learning purposes.