Excellent. Now we move to a **proper relational database implementation** of your E-commerce GraphQL system.

We’ll rebuild the same concepts using:

* 🗄 **PostgreSQL** (relational database)
* 🧠 **Prisma ORM**
* 🚀 **Apollo Server**
* 🛒 Same E-commerce domain (Users, Products, Categories, Orders)

This is production-grade backend architecture.

---

# 🏗 Final Architecture

```plaintext
React
   ↓
Apollo Client
   ↓
GraphQL (Apollo Server)
   ↓
Prisma ORM
   ↓
PostgreSQL
```

GraphQL is just the API layer.
PostgreSQL handles relational data integrity.

---

# 📦 STEP 1 — Install Dependencies

Create project:

```bash
mkdir ecommerce-graphql-sql
cd ecommerce-graphql-sql
npm init -y
```

Install:

```bash
npm install @apollo/server graphql prisma @prisma/client express cors jsonwebtoken bcryptjs dotenv
```

Initialize Prisma:

```bash
npx prisma init
```

---

# 🗄 STEP 2 — Setup PostgreSQL Database

Create database:

```sql
CREATE DATABASE ecommerce;
```

Update `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecommerce"
JWT_SECRET="supersecret"
```

---

# 🧠 STEP 3 — Define Relational Schema (Prisma)

Open `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  role     Role     @default(CUSTOMER)
  orders   Order[]
}

model Category {
  id       Int      @id @default(autoincrement())
  name     String
  products Product[]
}

model Product {
  id         Int       @id @default(autoincrement())
  name       String
  price      Float
  stock      Int
  category   Category  @relation(fields: [categoryId], references: [id])
  categoryId Int
  orderItems OrderItem[]
}

model Order {
  id        Int         @id @default(autoincrement())
  user      User        @relation(fields: [userId], references: [id])
  userId    Int
  total     Float
  status    OrderStatus @default(PENDING)
  items     OrderItem[]
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   Int
  product   Product @relation(fields: [productId], references: [id])
  productId Int
  quantity  Int
}

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

# 🔄 Run Migration

```bash
npx prisma migrate dev --name init
```

This creates all SQL tables automatically.

---

# 🚀 STEP 4 — Setup Apollo Server

Create `server.js`

```js
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
```

---

# 📜 STEP 5 — GraphQL Schema

Add:

```js
const typeDefs = `#graphql

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

type User {
  id: ID!
  name: String!
  email: String!
  role: Role!
}

type Category {
  id: ID!
  name: String!
  products: [Product!]!
}

type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
  category: Category!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
}

type Order {
  id: ID!
  total: Float!
  status: OrderStatus!
  items: [OrderItem!]!
}

type Query {
  products: [Product!]!
  categories: [Category!]!
  orders: [Order!]!
}

input CreateProductInput {
  name: String!
  price: Float!
  stock: Int!
  categoryId: Int!
}

type Mutation {
  createProduct(input: CreateProductInput!): Product!
}
`;
```

---

# ⚙ STEP 6 — Resolvers

```js
const resolvers = {
  Query: {
    products: async () => {
      return prisma.product.findMany({
        include: { category: true },
      });
    },

    categories: async () => {
      return prisma.category.findMany({
        include: { products: true },
      });
    },

    orders: async () => {
      return prisma.order.findMany({
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    },
  },

  Mutation: {
    createProduct: async (_, { input }) => {
      return prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          stock: input.stock,
          categoryId: input.categoryId,
        },
      });
    },
  },
};
```

Notice:

```js
include: { category: true }
```

This performs SQL JOIN automatically.

---

# 🔌 STEP 7 — Start Server

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server)
);

app.listen(4000, () =>
  console.log("Server running at http://localhost:4000/graphql")
);
```

Run:

```bash
node server.js
```

---

# 🧠 What Just Happened (Relational Advantage)

Prisma generated SQL like:

```sql
SELECT * FROM product
JOIN category ON product.categoryId = category.id;
```

No manual joins required.

---

# 🛒 Creating Data

Create Category first:

```js
await prisma.category.create({
  data: { name: "Electronics" },
});
```

Then GraphQL mutation:

```graphql
mutation {
  createProduct(
    input: {
      name: "MacBook"
      price: 150000
      stock: 10
      categoryId: 1
    }
  ) {
    id
    name
  }
}
```

---

# 🔐 Transactions Example (Order Creation)

Relational DB shines here.

```js
await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({
    data: {
      userId: 1,
      total: 200000,
    },
  });

  await tx.orderItem.create({
    data: {
      orderId: order.id,
      productId: 1,
      quantity: 2,
    },
  });
});
```

This ensures:

* Either everything saves
* Or nothing saves

ACID compliance.

---

# ⚖ MongoDB vs PostgreSQL with GraphQL

| Feature        | MongoDB   | PostgreSQL         |
| -------------- | --------- | ------------------ |
| Schema         | Flexible  | Strict             |
| Transactions   | Limited   | Strong             |
| Joins          | Manual    | Native             |
| Data Integrity | Weak      | Strong             |
| Best For       | Rapid dev | Production finance |

For E-commerce:

> PostgreSQL is generally superior.

---

# 🎯 Final Understanding

GraphQL does not replace relational DB.

GraphQL:

* Defines API contract
* Executes resolvers

Prisma:

* Handles SQL
* Manages joins
* Enforces relationships

PostgreSQL:

* Stores structured data safely

---

# 🚀 You Now Know

✔ How to design relational schema
✔ How foreign keys work
✔ How GraphQL resolves relations
✔ How transactions work
✔ How Prisma simplifies joins

---

If you want next, I can:

* Show full auth implementation in this SQL setup
* Add pagination & filtering
* Add update & delete
* Add DataLoader optimization
* Prepare interview-level relational + GraphQL questions

Tell me the next direction.
