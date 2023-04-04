# Social Media API

This is a RESTful API for a social media application built using Node.js, Express.js, and MongoDB. It allows users to create and delete thoughts, react to thoughts, and add and remove friends.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set the `MONGODB_URI` environment variable to the URI of your MongoDB database.
4. Start the server using `npm start`.

## Usage

The API provides the following endpoints:

- `GET /api/users`: Get all users with their associated thoughts and friends.
- `GET /api/users/:id`: Get a single user by their id with their associated thoughts and friends.
- `POST /api/users`: Create a new user with the provided request body.
- `PUT /api/users/:id`: Update an existing user by their id with the provided request body.
- `DELETE /api/users/:id`: Delete an existing user by their id.
- `POST /api/users/:userId/thoughts`: Add a new thought to an existing user by their id with the provided request body.
- `POST /api/users/:userId/friends`: Add a new friend to an existing user by their id with the provided request body.
- `DELETE /api/users/:userId/friends/:friendId`: Delete an existing friend from an existing user by their ids.

For example, to create a new user, you can send a `POST` request to `/api/users` with a JSON object in the request body containing the new user's `username` and `email`. 

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Credits

This project was created by Kyle Roff.
