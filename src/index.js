const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const app = express();

app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Library Management API",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const booksRoute = require("./routes/books");
const authorsRoute = require("./routes/authors");
const userRoute = require("./routes/users")
const borrowRoute = require("./routes/borrow");

app.use("/books", booksRoute);
app.use("/authors", authorsRoute);
app.use("/users", userRoute);
app.use("/borrow", borrowRoute);


async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

main()
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
