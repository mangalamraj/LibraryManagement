# Library Management

This project is a Library Management system built using Swagger, Express, Prisma, PostgreSQL, and Docker.

## Setup Instructions

Follow these steps to set up the project:

1. **Clone the repository**

   ```bash
   git clone https://github.com/mangalamraj/LibraryManagement.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd LibraryManagement
   ```

3. **Install the dependencies**

   ```bash
   npm install
   ```

4. **Add your database URL**

   In the project directory, create a `.env` file and add your database URL:

   ```env
   DATABASE_URL=your_database_url
   ```
4. **Change the url in docker-compose and in index.js too**

   

5. **Run Docker Compose**

   ```bash
   docker-compose up
   ```

## Technologies Used

- **Swagger**: API documentation
- **Express**: Web framework for Node.js
- **Prisma**: ORM for database management
- **PostgreSQL**: Relational database
- **Docker**: Containerization platform

# API Documentation

To access the API documentation, open your browser and navigate to:

    ```bash
   http://localhost:3000/api-docs/
   ```

The API documentation includes the following endpoints for managing authors, books, borrowing records, and users:

## Author Endpoints

- **Add Author:** `POST /authors`
- **Show All Authors:** `GET /authors`
- **Show Author by ID:** `GET /authors/{id}`
- **Update Author:** `PUT /authors/{id}`
- **Delete Author:** `DELETE /authors/{id}`

## Book Endpoints

- **Add Book:** `POST /books`
- **Show All Books:** `GET /books`
- **Show Book by ID:** `GET /books/{id}`
- **Update Book:** `PUT /books/{id}`
- **Delete Book:** `DELETE /books/{id}`

## User Endpoints

- **Add User:** `POST /users`
- **Show All Users:** `GET /users`
- **Show User by ID:** `GET /users/{id}`
- **Update User:** `PUT /users/{id}`
- **Delete User:** `DELETE /users/{id}`

## Borrowing Endpoints

- **Borrow a Book:** `POST /borrowings`
- **Return a Book:** `PUT /borrowings/{id}/return`
- **List of Borrowed Books:** `GET /borrowings`

## Repository

[Library Management GitHub Repository](https://github.com/mangalamraj/LibraryManagement.git)
