Good. Now we move into the **GraphQL Type System**, which is the foundation of everything.

Since we are building an **E-Commerce API**, I’ll model everything around:

* Product
* Category
* User
* Order
* Cart

This is critical because GraphQL is **schema-first architecture**.

---

# 📌 GraphQL Type System — Deep Dive (E-Commerce Model)

---

# 1️⃣ Scalars (Basic Data Types)

GraphQL has built-in scalar types:

| Scalar    | Meaning           |
| --------- | ----------------- |
| `Int`     | 32-bit integer    |
| `Float`   | Decimal number    |
| `String`  | Text              |
| `Boolean` | true / false      |
| `ID`      | Unique identifier |

### Example

```graphql
type Product {
  id: ID
  name: String
  price: Float
  stock: Int
  isAvailable: Boolean
}
```

👉 These are equivalent to primitive types in JavaScript.

---

# 2️⃣ Non-Null Types (`!`)

`!` means **this field can never be null**.

Example:

```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  description: String
}
```

Meaning:

* `id`, `name`, `price` are mandatory
* `description` is optional

If resolver returns `null` for `price`, GraphQL throws an error.

---

# 3️⃣ Lists (`[]`)

Square brackets mean array.

Example:

```graphql
type Query {
  products: [Product]
}
```

Means:

* Return an array of products.

Now let’s combine with non-null:

```graphql
products: [Product!]!
```

This means:

* The list cannot be null
* Each product inside list cannot be null

Very important for production APIs.

---

# 4️⃣ Object Types (Custom Types)

These represent entities in your E-commerce system.

```graphql
type Category {
  id: ID!
  name: String!
}

type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category!
}
```

Now frontend can request nested data:

```graphql
query {
  products {
    name
    category {
      name
    }
  }
}
```

This is GraphQL’s strength.

---

# 5️⃣ Enums (Controlled Values)

Use enums when values are fixed.

E-commerce example: Order status.

```graphql
enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}
```

Then use it:

```graphql
type Order {
  id: ID!
  status: OrderStatus!
}
```

Now invalid values like `"processing123"` cannot be passed.

---

# 6️⃣ Input Types (Very Important for Mutations)

You cannot pass object types as input.
GraphQL requires `input` type.

Example: Create Product

```graphql
input CreateProductInput {
  name: String!
  price: Float!
  stock: Int!
  categoryId: ID!
}
```

Mutation:

```graphql
type Mutation {
  createProduct(input: CreateProductInput!): Product!
}
```

Client request:

```graphql
mutation {
  createProduct(
    input: {
      name: "MacBook M3"
      price: 159999
      stock: 10
      categoryId: "c101"
    }
  ) {
    id
    name
  }
}
```

---

# 7️⃣ Arguments

Arguments are parameters for queries.

Example:

```graphql
type Query {
  product(id: ID!): Product
}
```

Usage:

```graphql
query {
  product(id: "p101") {
    name
    price
  }
}
```

Arguments are like REST route params.

---

# 8️⃣ Custom Scalars (Advanced Preview)

For production E-commerce, you often create:

* Date
* Email
* URL
* JSON

Example:

```graphql
scalar Date
```

Used in:

```graphql
type Order {
  createdAt: Date!
}
```

We will implement this later using libraries.

---

# 9️⃣ Complete E-Commerce Mini Schema (Phase 1 Level)

```graphql
type Category {
  id: ID!
  name: String!
}

type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
  category: Category!
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

type Order {
  id: ID!
  userId: ID!
  products: [Product!]!
  totalAmount: Float!
  status: OrderStatus!
}

type Query {
  products: [Product!]!
  product(id: ID!): Product
}
```

---

# ⚠️ Important Concept You Must Understand

GraphQL Schema = Strong Contract

Frontend cannot:

* Request unknown fields
* Send invalid data types
* Break structure

This is why GraphQL is powerful for large E-commerce systems.

---

# 🎯 After This Section You Should Clearly Know

* Scalar vs Object types
* Non-null behavior
* List behavior
* Input types
* Enums
* Arguments
* Nested structures

---

# 🔥 Next Logical Step

Now we move to:

> ✅ How resolvers work internally
> ✅ How GraphQL executes nested queries
> ✅ Parent / Args / Context / Info
> ✅ Execution flow tree
