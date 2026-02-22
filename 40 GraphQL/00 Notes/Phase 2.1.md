Excellent. Now we move from theory → implementation.

We will build a **real E-Commerce GraphQL API** using:

* Node.js
* Express
* Apollo Server
* MongoDB (Mongoose)

Goal of this phase:

> ✅ Setup server
> ✅ Connect MongoDB
> ✅ Create Product & Category models
> ✅ Create first working GraphQL query
> ✅ Test in Apollo Sandbox

---

# 🏗 Architecture Overview

We’ll build this stack:

```id="arch01"
Client
   ↓
POST /graphql
   ↓
Apollo Server
   ↓
Resolvers
   ↓
MongoDB (Mongoose)
```

We’ll use **Apollo Server** by Apollo GraphQL.

---

# 📦 Step 1 — Initialize Project

```bash
mkdir ecommerce-graphql
cd ecommerce-graphql
npm init -y
```

Install dependencies:

```bash
npm install express apollo-server-express graphql mongoose dotenv
```

Optional (for dev):

```bash
npm install nodemon --save-dev
```

Add in `package.json`:

```json
"scripts": {
  "dev": "nodemon server.js"
}
```

---

# 📂 Step 2 — Basic Folder Structure

```id="struct01"
ecommerce-graphql/
│
├── models/
│   ├── Product.js
│   └── Category.js
│
├── schema/
│   ├── typeDefs.js
│   └── resolvers.js
│
├── server.js
└── .env
```

---

# 🗄 Step 3 — Setup MongoDB Connection

### `.env`

```env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
PORT=4000
```

---

### `server.js`

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();

async function startServer() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/graphql`);
  });
}

startServer();
```

---

# 📦 Step 4 — Create Mongoose Models

## `models/Category.js`

```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
```

---

## `models/Product.js`

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);
```

---

# 📜 Step 5 — GraphQL Schema

## `schema/typeDefs.js`

```js
const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    category: Category
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;

module.exports = typeDefs;
```

---

# ⚙ Step 6 — Resolvers

## `schema/resolvers.js`

```js
const Product = require("../models/Product");
const Category = require("../models/Category");

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },

    product: async (_, { id }) => {
      return await Product.findById(id);
    },
  },

  Product: {
    category: async (parent) => {
      return await Category.findById(parent.categoryId);
    },
  },
};

module.exports = resolvers;
```

Notice:

* `Query.products` fetches all products
* `Product.category` resolves nested relationship

---

# ▶ Step 7 — Run the Server

```bash
npm run dev
```

Open:

```
http://localhost:4000/graphql
```

Apollo Sandbox will open.

---

# 🧪 Step 8 — Test First Query

### Add some test data manually in MongoDB:

Insert a Category:

```json
{ "name": "Electronics" }
```

Insert a Product:

```json
{
  "name": "iPhone 15",
  "price": 79999,
  "stock": 15,
  "categoryId": "CATEGORY_OBJECT_ID"
}
```

---

Now test:

```graphql
query {
  products {
    name
    price
    category {
      name
    }
  }
}
```

You should see nested response.

---

# 🧠 What Just Happened Internally?

1. `Query.products` executed → fetched all products
2. For each product → `Product.category` executed
3. GraphQL assembled final response

This is the resolver execution tree you learned in Phase 1.

---

# 🎯 What You Have Achieved

✔ Working GraphQL server
✔ Connected MongoDB
✔ Nested resolver working
✔ First real E-commerce API

You are no longer at theory level.

---

# 🚀 Next Step (Phase 2 Continued)

Now we expand API to production-style features:

> ✅ Add Mutations (Create Product, Create Category)
> ✅ Use Input Types
> ✅ Add basic validation
> ✅ Add Order model
> ✅ Add pagination
