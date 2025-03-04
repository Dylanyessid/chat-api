# Chat API

This project is a Node.js-based chat API that allows users to send and receive messages in real-time.

## Features

- Real-time messaging
- User authentication
- Message history
- RESTful API

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chat-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd chat-api
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/messages` - Get message history
- `POST /api/messages` - Send a new message


## License

This project is licensed under the MIT License.
