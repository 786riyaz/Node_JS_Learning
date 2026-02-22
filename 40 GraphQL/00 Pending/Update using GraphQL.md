Good. Let’s implement **update operation properly**, production-style.

In GraphQL, updates are done using **mutations** — just like delete.

We’ll implement:

* ✅ Update Product
* ✅ Partial updates
* ✅ Validation
* ✅ Admin authorization
* ✅ Best practices

Using your E-commerce API.

---

# 🧠 Core Concept

In REST:

```http
PUT /products/123
```

In GraphQL:

```graphql
mutation {
  updateProduct(id: "123", input: {...}) {
    id
    name
  }
}
```

GraphQL does not have built-in PUT/PATCH — you define the mutation.

---

# 🛒 Step 1 — Update Schema (typeDefs.js)

We create a separate input for updates.

Why separate?

Because:

* Create requires all fields
* Update usually allows partial fields

---

## Add Update Input

```graphql
input UpdateProductInput {
  name: String
  price: Float
  stock: Int
  categoryId: ID
}
```

Notice:

* No `!`
* All optional → supports partial update

---

## Add Mutation

```graphql
extend type Mutation {
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
}
```

---

# ⚙ Step 2 — Implement Resolver

In `resolvers.js`:

```js
updateProduct: async (_, { id, input }, context) => {

  // 🔐 Admin check
  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Optional business validation
  if (input.price !== undefined && input.price < 0) {
    throw new Error("Price cannot be negative");
  }

  // Update fields dynamically
  Object.keys(input).forEach((key) => {
    product[key] = input[key];
  });

  await product.save();

  return product;
},
```

---

# 🧪 Step 3 — Test Mutation

## Update Only Price

```graphql
mutation {
  updateProduct(
    id: "PRODUCT_ID"
    input: { price: 120000 }
  ) {
    id
    name
    price
  }
}
```

---

## Update Multiple Fields

```graphql
mutation {
  updateProduct(
    id: "PRODUCT_ID"
    input: {
      name: "MacBook M3 Pro"
      stock: 25
    }
  ) {
    id
    name
    stock
  }
}
```

---

# 🧠 Alternative: Use findByIdAndUpdate

Instead of manual assignment:

```js
updateProduct: async (_, { id, input }, context) => {

  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
},
```

`new: true` returns updated document.

Cleaner approach.

---

# 🧠 SQL Version (If Using PostgreSQL)

Resolver might look like:

```js
await db.query(
  "UPDATE products SET price = $1 WHERE id = $2 RETURNING *",
  [input.price, id]
);
```

GraphQL mutation remains identical.

Only DB logic changes.

---

# 🔐 Production Best Practices for Updates

✔ Use separate input type
✔ Validate business rules
✔ Protect with role-based access
✔ Prevent updating immutable fields (like id)
✔ Log critical changes
✔ Consider audit tracking

---

# 🚨 Important: Partial Update vs Full Update

GraphQL does NOT enforce full update.

Because fields are optional in `UpdateProductInput`.

So this behaves like PATCH.

If you want full replacement behavior:

* Make all fields required
* Validate manually

---

# 🛒 Example: Update Order Status (Common in E-commerce)

Add input:

```graphql
input UpdateOrderStatusInput {
  status: OrderStatus!
}
```

Mutation:

```graphql
updateOrderStatus(id: ID!, input: UpdateOrderStatusInput!): Order!
```

Resolver:

```js
updateOrderStatus: async (_, { id, input }, context) => {

  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return await Order.findByIdAndUpdate(
    id,
    { status: input.status },
    { new: true }
  );
},
```

This is typical real-world update flow.

---

# 🎯 Final Summary

To perform update in GraphQL:

1️⃣ Define UpdateInput type
2️⃣ Add update mutation
3️⃣ Validate in resolver
4️⃣ Use findByIdAndUpdate or manual assignment
5️⃣ Protect with authorization

GraphQL does not provide update automatically — you design it.

---