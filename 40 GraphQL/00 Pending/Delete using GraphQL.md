Good. Let’s answer this properly.

In GraphQL, **deleting a record is done using a Mutation**, not a Query.

GraphQL does not have built-in CRUD keywords like SQL.
You define delete operations inside your schema.

---

# 🧠 Basic Concept

In REST:

```http
DELETE /products/123
```

In GraphQL:

```graphql
mutation {
  deleteProduct(id: "123") {
    id
    name
  }
}
```

Everything happens through the `/graphql` endpoint.

---

# 🛒 Example: Delete Product (E-Commerce API)

We’ll implement:

* Schema definition
* Resolver
* Test mutation
* Authorization (admin only)

---

# 📜 Step 1 — Update Schema (typeDefs.js)

Add delete mutation:

```graphql
extend type Mutation {
  deleteProduct(id: ID!): Product!
}
```

Full mutation block example:

```graphql
type Mutation {
  createProduct(input: CreateProductInput!): Product!
  deleteProduct(id: ID!): Product!
}
```

This means:

* We pass product ID
* We return deleted product data

---

# ⚙ Step 2 — Implement Resolver

In `resolvers.js`:

```js
deleteProduct: async (_, { id }, context) => {

  // Optional: Admin-only protection
  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(id);

  return product;
},
```

Why return deleted product?

Because frontend may want:

* Confirmation
* Name of deleted item
* UI updates

---

# 🧪 Step 3 — Test Mutation

```graphql
mutation {
  deleteProduct(id: "PRODUCT_ID_HERE") {
    id
    name
  }
}
```

If successful:

```json
{
  "data": {
    "deleteProduct": {
      "id": "abc123",
      "name": "MacBook M3"
    }
  }
}
```

---

# 🧠 Alternative Patterns (Professional Level)

There are 3 common delete patterns.

---

## 1️⃣ Hard Delete (Permanent)

```js
Product.findByIdAndDelete(id)
```

Record removed permanently.

---

## 2️⃣ Soft Delete (Recommended for E-commerce)

Instead of deleting:

Add field in model:

```js
isDeleted: { type: Boolean, default: false }
```

Mutation:

```js
await Product.findByIdAndUpdate(id, { isDeleted: true });
```

Query filter:

```js
Product.find({ isDeleted: false });
```

Why better?

* Keeps history
* Prevents data loss
* Safer for orders

Most production systems use soft delete.

---

## 3️⃣ Delete With Boolean Response

Instead of returning Product:

```graphql
deleteProduct(id: ID!): Boolean!
```

Resolver:

```js
const result = await Product.findByIdAndDelete(id);
return !!result;
```

Returns true/false.

Less useful than returning object.

---

# 🗄 If Using Relational DB (SQL Example)

Example with PostgreSQL:

```js
await db.query(
  "DELETE FROM products WHERE id = $1 RETURNING *",
  [id]
);
```

GraphQL mutation stays same.

Database logic changes, not schema logic.

---

# 🔐 Important Security Considerations

For delete operations always:

✔ Check authentication
✔ Check authorization (admin role)
✔ Validate existence
✔ Prevent deleting referenced records (orders)

Example:

Before deleting product:

```js
const existingOrder = await Order.findOne({ "items.productId": id });

if (existingOrder) {
  throw new Error("Cannot delete product linked to orders");
}
```

This prevents data integrity issues.

---

# 🧠 Mental Model

GraphQL does NOT know what delete means.

You define:

```plaintext
Schema → deleteProduct
Resolver → actual DB deletion
```

GraphQL is just calling your function.

---

# 🎯 Final Summary

To delete a record in GraphQL:

1. Define mutation in schema
2. Implement deletion logic in resolver
3. Return deleted object or boolean
4. Protect with authentication
5. Prefer soft delete in production

---