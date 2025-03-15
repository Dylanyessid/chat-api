# Chat API

This project is a Node.js-based chat API that allows users to send and receive messages in real-time.

## Features

- Real-time messaging
- User authentication
- Message history
- RESTful API

## Prerequisites

- Node.js
- pnpm


## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3000
    MONGO_URI=your_database_url
    JWT_SECRET=your_jwt_secret
    BCRYPT_SALT_ROUNDS=your_bcrypt_salt_rounds
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

## Running the Application

1. Install pnpm (the project uses pnpm)
2. Clone the repo
3. Download the dependencies with:

    ```bash
    pnpm install 
    ```

4. Create a .env file and put the env vars there
5. Start the development server:

    ```bash
    npm run dev
    ```

6. The API will be available at `http://localhost:3000`.

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/messages` - Get message history

## License

This project is licensed under the MIT License.
