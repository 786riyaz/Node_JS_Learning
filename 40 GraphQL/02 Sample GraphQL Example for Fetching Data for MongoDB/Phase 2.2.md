Excellent. Now we move from **read-only API → fully functional E-commerce backend**.

In this step we will:

* ✅ Add `createCategory`
* ✅ Add `createProduct`
* ✅ Use proper `input` types
* ✅ Add validation logic
* ✅ Return structured responses

We are now building something closer to production.

---

# 🧱 Why Input Types Are Mandatory for Mutations

GraphQL does **not** allow object types as arguments.

❌ This is wrong:

```graphql
createProduct(product: Product)
```

✅ Correct approach:

```graphql
createProduct(input: CreateProductInput!)
```

This keeps schema clean and scalable.

---

# 📜 Step 1 — Update Schema (typeDefs.js)

Modify your schema:

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

  input CreateCategoryInput {
    name: String!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    stock: Int!
    categoryId: ID!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    createProduct(input: CreateProductInput!): Product!
  }
`;

module.exports = typeDefs;
```

---

# ⚙ Step 2 — Update Resolvers

Update `resolvers.js`:

```js
const Product = require("../models/Product");
const Category = require("../models/Category");

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
    categories: async () => await Category.find(),
  },

  Mutation: {
    createCategory: async (_, { input }) => {
      const category = new Category({
        name: input.name,
      });

      return await category.save();
    },

    createProduct: async (_, { input }) => {

      // Basic validation
      if (input.price < 0) {
        throw new Error("Price cannot be negative");
      }

      const categoryExists = await Category.findById(input.categoryId);
      if (!categoryExists) {
        throw new Error("Invalid Category ID");
      }

      const product = new Product({
        name: input.name,
        price: input.price,
        stock: input.stock,
        categoryId: input.categoryId,
      });

      return await product.save();
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

---

# 🧪 Step 3 — Test Mutations

## Create Category

```graphql
mutation {
  createCategory(input: { name: "Laptops" }) {
    id
    name
  }
}
```

---

## Create Product

```graphql
mutation {
  createProduct(
    input: {
      name: "MacBook M3"
      price: 159999
      stock: 10
      categoryId: "CATEGORY_ID_HERE"
    }
  ) {
    id
    name
    price
  }
}
```

---

# 🔎 What Happens Internally?

When this mutation runs:

```graphql
createProduct(input: {...})
```

Execution flow:

1. GraphQL validates input structure
2. Calls `Mutation.createProduct`
3. Resolver validates business logic
4. Saves to MongoDB
5. Returns created product

Notice:

* Schema validation handles type safety
* Resolver handles business rules

This separation is powerful.

---

# 🧠 Professional Architecture Insight

In production systems, you should separate:

```plaintext
Resolvers → Services → Database
```

Example:

```js
createProduct: async (_, { input }) => {
  return await productService.create(input);
}
```

This keeps resolvers thin.

We’ll refactor later when scaling.

---

# 🚨 Important Concept — GraphQL Does NOT Auto-Validate Business Logic

GraphQL validates:

* Types
* Required fields

GraphQL does NOT validate:

* Negative price
* Stock limits
* Duplicate product names

That must be written manually in resolver/service layer.

---

# 🛒 Now Your API Can

✔ Create categories
✔ Create products
✔ Fetch all products
✔ Fetch single product
✔ Fetch nested category

You now have a working CRUD foundation.

---

# 🚀 Next Step (Now We Level Up)

Next we move to:

> ✅ Add Order model
> ✅ Add Order creation mutation
> ✅ Add product array inside order
> ✅ Calculate total automatically
> ✅ Introduce enums (OrderStatus)

This will simulate real checkout flow.