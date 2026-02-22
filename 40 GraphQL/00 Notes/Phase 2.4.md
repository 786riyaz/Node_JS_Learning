Excellent. Now we move into **production-grade querying**.

In a real E-commerce system, product listing pages require:

* ✅ Pagination (page / limit or cursor-based)
* ✅ Filtering (price range, category, stock)
* ✅ Sorting (price low → high, newest, etc.)
* ✅ Efficient query design

We’ll implement this cleanly and professionally.

---

# 🧠 Why Pagination Is Mandatory

If you have 50,000 products:

```graphql
query {
  products {
    name
  }
}
```

This will:

* Kill memory
* Slow DB
* Increase response time

We must control data volume.

---

# 📌 Step 1 — Upgrade Schema (typeDefs.js)

We will replace simple `products` query with advanced version.

---

## Add Product Filter Input

```graphql
input ProductFilterInput {
  minPrice: Float
  maxPrice: Float
  categoryId: ID
  inStock: Boolean
}
```

---

## Update Query Type

```graphql
type ProductPagination {
  products: [Product!]!
  totalCount: Int!
  currentPage: Int!
  totalPages: Int!
}

extend type Query {
  products(
    page: Int = 1
    limit: Int = 10
    filter: ProductFilterInput
    sortBy: String
  ): ProductPagination!
}
```

Now we return structured pagination response.

---

# ⚙ Step 2 — Implement Resolver Logic

Update `resolvers.js`.

---

```js
products: async (_, { page, limit, filter, sortBy }) => {

  const query = {};

  // Filtering
  if (filter) {
    if (filter.minPrice !== undefined) {
      query.price = { ...query.price, $gte: filter.minPrice };
    }

    if (filter.maxPrice !== undefined) {
      query.price = { ...query.price, $lte: filter.maxPrice };
    }

    if (filter.categoryId) {
      query.categoryId = filter.categoryId;
    }

    if (filter.inStock === true) {
      query.stock = { $gt: 0 };
    }
  }

  // Sorting
  let sortOptions = {};
  if (sortBy === "PRICE_ASC") sortOptions.price = 1;
  if (sortBy === "PRICE_DESC") sortOptions.price = -1;
  if (sortBy === "NEWEST") sortOptions.createdAt = -1;

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const totalCount = await Product.countDocuments(query);

  return {
    products,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };
}
```

---

# 🧪 Example Queries

---

## Basic Pagination

```graphql
query {
  products(page: 2, limit: 5) {
    products {
      name
      price
    }
    totalCount
    currentPage
    totalPages
  }
}
```

---

## Filter by Price Range

```graphql
query {
  products(
    filter: { minPrice: 20000, maxPrice: 80000 }
  ) {
    products {
      name
      price
    }
  }
}
```

---

## Filter by Category + In Stock

```graphql
query {
  products(
    filter: {
      categoryId: "CATEGORY_ID"
      inStock: true
    }
  ) {
    products {
      name
      stock
    }
  }
}
```

---

## Sorting

```graphql
query {
  products(sortBy: "PRICE_DESC") {
    products {
      name
      price
    }
  }
}
```

---

# 🧠 Architectural Insight

Notice what we did:

We moved from:

```graphql
products: [Product]
```

To:

```graphql
products: ProductPagination
```

This is professional API design.

Why?

Because frontend needs:

* Total count
* Current page
* Total pages
* Items

REST usually requires separate endpoint for total count.

GraphQL combines them.

---

# ⚠ Important Improvement

Instead of `sortBy: String`, better approach:

---

## Replace With Enum (Best Practice)

```graphql
enum ProductSort {
  PRICE_ASC
  PRICE_DESC
  NEWEST
}

products(
  page: Int = 1
  limit: Int = 10
  filter: ProductFilterInput
  sortBy: ProductSort
): ProductPagination!
```

Enums prevent invalid values.

---

# 🚨 Performance Discussion (Important)

Our current approach uses:

```js
skip()
limit()
```

This works fine for:

* Small/medium datasets

But for very large scale:

* Use cursor-based pagination
* Use indexed fields
* Avoid large skip values

We will implement cursor pagination later.

---

# 🎯 What You Have Achieved Now

Your E-commerce GraphQL API now supports:

✔ Pagination
✔ Filtering
✔ Sorting
✔ Structured response
✔ Clean input types
✔ Enum-based sorting

This is now equivalent to production listing API.

---

# 🚀 Next Level (Where Things Get Serious)

We now move into:

> ✅ Authentication with JWT
> ✅ Context usage
> ✅ Protecting mutations
> ✅ Role-based authorization
> ✅ Logged-in user orders

This is critical for real systems.
