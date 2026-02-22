Excellent.
Now we enter **serious GraphQL engineering territory**.

This is where many developers fail in production.

We will cover:

* ✅ What exactly is the N+1 problem
* ✅ Why GraphQL makes it worse
* ✅ How DataLoader solves it
* ✅ Implement batching in your E-commerce API
* ✅ Inject DataLoader via `context` properly

---

# 🧠 What Is the N+1 Problem?

Let’s use your E-commerce system.

Suppose frontend runs:

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

Assume:

* 50 products in DB

Current execution:

1. `Query.products` → 1 DB query
2. For each product → `Product.category`
3. Each calls `Category.findById`

Total DB calls:

```
1 (products)
+ 50 (categories)
= 51 queries
```

This is called:

> N+1 Problem
> 1 parent query + N child queries

---

# 📉 Why This Is Dangerous

If you have:

* 1000 products
* 2000 order items
* Deep nesting

You can easily hit:

* 3000+ DB calls per request

That kills performance.

---

# 🔥 Why GraphQL Is Vulnerable

Because GraphQL executes resolvers:

* Field by field
* Node by node
* Independently

GraphQL doesn’t automatically batch DB calls.

You must handle it.

---

# 🚀 Solution: DataLoader

DataLoader is a utility created by Facebook.

It:

* Batches multiple requests into one
* Caches results per request
* Prevents duplicate DB calls

Install:

```bash
npm install dataloader
```

---

# 🏗 Step 1 — Create Category Loader

Create new folder:

```plaintext
loaders/
   categoryLoader.js
```

---

## `loaders/categoryLoader.js`

```js
const DataLoader = require("dataloader");
const Category = require("../models/Category");

const categoryLoader = () =>
  new DataLoader(async (categoryIds) => {

    const categories = await Category.find({
      _id: { $in: categoryIds },
    });

    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat.id] = cat;
    });

    return categoryIds.map((id) => categoryMap[id]);
  });

module.exports = categoryLoader;
```

---

# 🧠 What Just Happened?

Instead of:

```js
Category.findById(id) // called 50 times
```

We now do:

```js
Category.find({ _id: { $in: [id1, id2, id3...] } })
```

ONE query instead of 50.

---

# ⚙ Step 2 — Inject DataLoader into Context

Update `server.js`.

Import:

```js
const categoryLoader = require("./loaders/categoryLoader");
```

Modify context:

```js
context: async ({ req }) => {

  let user = null;

  const authHeader = req.headers.authorization || "";
  if (authHeader) {
    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, "MY_SECRET_KEY");
      user = await User.findById(decoded.userId);
    } catch (err) {}
  }

  return {
    user,
    loaders: {
      categoryLoader: categoryLoader(),
    },
  };
},
```

Important:

* Loader created per request
* Not global (prevents cross-user cache leaks)

---

# 🔄 Step 3 — Update Resolver to Use DataLoader

Modify `Product.category` resolver.

Old:

```js
category: async (parent) => {
  return await Category.findById(parent.categoryId);
}
```

New:

```js
category: async (parent, _, context) => {
  return context.loaders.categoryLoader.load(parent.categoryId);
}
```

Now:

* GraphQL calls resolver 50 times
* DataLoader batches them internally
* Executes ONE DB query

---

# 📊 Before vs After

Without DataLoader:

```
Product.find() → 1 query
Category.findById() → 50 queries
Total: 51
```

With DataLoader:

```
Product.find() → 1 query
Category.find({ $in: [...] }) → 1 query
Total: 2
```

Massive improvement.

---

# 🧠 DataLoader Internal Behavior

DataLoader:

* Collects `.load()` calls in same event loop tick
* Groups them
* Executes batch function once
* Maps results back to each request
* Caches per request

It also prevents duplicate calls:

If 10 products share same category:

* DB query still runs once

---

# 🛒 Apply Same to Order → Product

Create:

```
loaders/productLoader.js
```

```js
const DataLoader = require("dataloader");
const Product = require("../models/Product");

const productLoader = () =>
  new DataLoader(async (productIds) => {

    const products = await Product.find({
      _id: { $in: productIds },
    });

    const map = {};
    products.forEach((p) => {
      map[p.id] = p;
    });

    return productIds.map((id) => map[id]);
  });

module.exports = productLoader;
```

Inject into context similarly.

Update:

```js
OrderItem: {
  product: async (parent, _, context) => {
    return context.loaders.productLoader.load(parent.productId);
  },
},
```

Now nested orders also optimized.

---

# ⚠ Critical Rule

DataLoader must:

* Return results in same order as keys
* Be created per request
* Not be reused globally

Otherwise:

* Memory leaks
* Data mix between users

---

# 🧠 Advanced Insight

DataLoader solves:

✔ N+1 problem
✔ Duplicate queries
✔ Per-request caching

But does NOT solve:

* Poor DB indexing
* Deep query complexity
* Large nested queries

We handle those next.

---

# 🎯 You Now Understand

* What N+1 problem is
* Why GraphQL causes it
* How DataLoader batches queries
* How to integrate properly
* Why context injection is important

This is now senior-level GraphQL understanding.

---

# 🚀 Next Phase (Security & Performance Hardening)

We now move into:

> ✅ Query depth limiting
> ✅ Query complexity control
> ✅ Disable introspection in production
> ✅ Rate limiting
> ✅ Production security best practices
