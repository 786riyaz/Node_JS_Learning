Excellent.
Now we move to the **most important conceptual part of GraphQL**:

> 🔥 How GraphQL actually executes queries internally
> 🔥 How resolvers work
> 🔥 What `parent`, `args`, `context`, `info` really mean

We’ll stay inside the **E-commerce architecture**.

---

# 🧠 Big Picture: What Happens When a Query Hits the Server?

Suppose frontend sends:

```graphql
query {
  product(id: "p101") {
    name
    price
    category {
      name
    }
  }
}
```

Execution flow:

1. GraphQL parses the query
2. Validates against schema
3. Builds a **query execution tree**
4. Executes resolvers **field by field**
5. Merges results
6. Returns response

GraphQL does NOT fetch everything automatically.
It calls resolver functions you define.

---

# 🔎 Step 1 — Query Execution Tree

GraphQL converts the query into a tree:

```
product(id: "p101")
 ├── name
 ├── price
 └── category
      └── name
```

Each node = resolver execution.

---

# 🧩 What Is a Resolver?

A resolver is simply:

> A function that returns data for a field.

In Node (Apollo Server style):

```js
const resolvers = {
  Query: {
    product: async (_, args) => {
      return await Product.findById(args.id);
    }
  }
};
```

GraphQL calls this function when `product` is requested.

---

# 🔬 Resolver Signature Explained

Every resolver receives 4 parameters:

```js
(parent, args, context, info)
```

Let’s break them down carefully.

---

# 1️⃣ `parent`

Represents the result from the previous resolver in the chain.

Example:

```graphql
query {
  product(id: "p101") {
    name
    category {
      name
    }
  }
}
```

Execution:

* First resolver → `Query.product`
* Then → `Product.category`

Inside `Product.category`:

```js
Product: {
  category: async (parent) => {
    return await Category.findById(parent.categoryId);
  }
}
```

Here:

* `parent` = product object returned from DB
* It contains `categoryId`

This is how nested queries work.

---

# 2️⃣ `args`

Arguments passed in the query.

Example:

```graphql
product(id: "p101")
```

Resolver:

```js
product: async (_, args) => {
  console.log(args.id); // "p101"
}
```

Equivalent to REST route param.

---

# 3️⃣ `context` (Very Important)

Shared object across all resolvers in one request.

Used for:

* Authentication
* Logged-in user
* Database connection
* DataLoader

Example:

```js
const server = new ApolloServer({
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = verifyJWT(token);
    return { user };
  }
});
```

Then in resolver:

```js
product: async (_, args, context) => {
  if (!context.user) {
    throw new Error("Unauthorized");
  }
}
```

Context = request-level global state.

---

# 4️⃣ `info` (Advanced)

Contains execution metadata:

* Field name
* Query AST
* Return type

Used for:

* Logging
* Query complexity analysis
* Advanced tooling

You usually won’t use it daily.

---

# 🏗 Full E-Commerce Resolver Example

Schema:

```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category!
}
```

Resolvers:

```js
const resolvers = {
  Query: {
    product: async (_, { id }) => {
      return await Product.findById(id);
    }
  },

  Product: {
    category: async (parent) => {
      return await Category.findById(parent.categoryId);
    }
  }
};
```

---

# ⚠️ Important Concept — Resolver Chain

If client only requests:

```graphql
query {
  product(id: "p101") {
    name
  }
}
```

GraphQL will NOT execute:

```js
Product.category
```

Because it was not requested.

This is called:

> Field-level execution optimization.

---

# 🚨 The N+1 Problem (Preview)

Suppose frontend requests:

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

If there are 100 products:

* 1 query to fetch products
* 100 queries to fetch categories

Total = 101 DB calls.

This is called:

> N+1 Query Problem

We’ll solve this later using DataLoader.

---

# 🔄 Execution Order (Important)

GraphQL executes:

1. Top-level resolvers first (Query)
2. Then nested resolvers
3. In parallel when possible

Example:

```
Query.products
  → Product.category (for each)
```

---

# 🛒 E-Commerce Execution Example (Complete Flow)

Frontend:

```graphql
query {
  orders {
    id
    totalAmount
    products {
      name
      price
    }
  }
}
```

Execution:

1. Call `Query.orders`
2. For each order:

   * Call `Order.products`
3. For each product:

   * Return requested fields

This tree-based execution model is the core of GraphQL.

---

# 🧠 Mental Model You Must Build

Think of GraphQL as:

> A function dispatcher based on query tree.

Every field = resolver function call.

Not like REST where controller decides response shape.

---

# 🎯 After This Section You Should Clearly Understand

* How GraphQL executes queries
* How nested resolvers work
* What parent / args / context / info mean
* Why N+1 happens
* How execution tree is formed

---

# 🚀 Phase 1 Is Now Complete

You now understand:

✔ What GraphQL is
✔ Type system
✔ Schema design
✔ Execution model
✔ Resolver architecture

---

# 🔥 Next Phase (Implementation Begins)

Now we move to:

> Phase 2 — Setup GraphQL in Node + Express + MongoDB
> Build real E-commerce API from scratch

We’ll create:

* Product model
* Category model
* Order model
* Basic queries running

Say:

**“Start Phase 2 – Setup & First Working API”**
