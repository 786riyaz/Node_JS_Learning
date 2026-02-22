Excellent. Now we move into **production hardening** — this is what separates a tutorial project from a deployable E-commerce system.

Without proper controls, GraphQL can be abused very easily.

We’ll cover:

* ✅ Query depth limiting
* ✅ Query complexity analysis
* ✅ Disable introspection in production
* ✅ Rate limiting
* ✅ Preventing malicious nested queries
* ✅ Production best practices checklist

---

# 🚨 Why GraphQL Needs Extra Security

Because GraphQL allows clients to request deeply nested data:

A malicious client could send:

```graphql
query {
  products {
    category {
      products {
        category {
          products {
            category {
              name
            }
          }
        }
      }
    }
  }
}
```

This creates exponential resolver calls.

Unlike REST:

* GraphQL exposes entire schema in one endpoint
* Attack surface is larger

So we must control it.

---

# 🛡 1️⃣ Query Depth Limiting

We limit how deep nested queries can go.

Install:

```bash
npm install graphql-depth-limit
```

---

### Update `server.js`

```js
const depthLimit = require("graphql-depth-limit");
```

Inside Apollo Server:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)], // max 5 nested levels
  context: ...
});
```

Now:

* Queries deeper than 5 levels are rejected

Production recommendation:

```
depthLimit(4–7)
```

---

# 🧮 2️⃣ Query Complexity Analysis

Depth alone is not enough.

Example:

```graphql
query {
  products(limit: 1000) {
    name
    price
  }
}
```

This is shallow but heavy.

We use query complexity control.

Install:

```bash
npm install graphql-query-complexity
```

---

### Add Complexity Rule

```js
const {
  createComplexityLimitRule
} = require("graphql-query-complexity");

const complexityRule = createComplexityLimitRule(1000);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [
    depthLimit(5),
    complexityRule
  ],
});
```

Now:

* Each field adds complexity
* If total exceeds threshold → query rejected

For E-commerce:

* Product list heavy queries should be limited

---

# 🔒 3️⃣ Disable Introspection in Production

Introspection exposes entire schema.

Hackers can run:

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

Disable in production:

```js
const server = new ApolloServer({
  ...
  introspection: process.env.NODE_ENV !== "production",
});
```

In production:

* Schema exploration disabled

---

# 🚦 4️⃣ Rate Limiting

Since GraphQL uses single endpoint:

```
POST /graphql
```

Apply Express rate limiting.

Install:

```bash
npm install express-rate-limit
```

---

### In `server.js`

```js
const rateLimit = require("express-rate-limit");

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP
  })
);
```

Now:

* 100 requests per 15 minutes per IP

Critical for public APIs.

---

# 🛑 5️⃣ Disable GraphQL Playground in Production

Apollo Sandbox should not be public.

```js
const server = new ApolloServer({
  ...
  playground: process.env.NODE_ENV !== "production",
});
```

---

# 🧠 6️⃣ Always Validate Pagination Limits

Never trust client limit:

Instead of:

```js
limit
```

Do:

```js
const safeLimit = Math.min(limit, 50);
```

Never allow unlimited fetch.

---

# 🔐 7️⃣ Use Environment Variables for Secrets

Never hardcode:

```js
"MY_SECRET_KEY"
```

Use:

```js
process.env.JWT_SECRET
```

In `.env`:

```
JWT_SECRET=super_secure_secret
```

---

# 🧱 8️⃣ Use Database Indexing

For E-commerce performance:

Add indexes:

```js
price: { type: Number, index: true }
categoryId: { type: ObjectId, index: true }
createdAt: { type: Date, default: Date.now, index: true }
```

Without indexes:

* Filtering becomes slow
* Sorting becomes expensive

GraphQL security includes DB optimization.

---

# 🧨 Real-World Attack Scenarios

### 1️⃣ Deep Nested Attack

Solved by:

* depthLimit

### 2️⃣ Wide Query Attack

Solved by:

* query complexity

### 3️⃣ Brute Force Login

Solved by:

* rate limiting

### 4️⃣ Schema Mapping Attack

Solved by:

* disable introspection

---

# 📦 Production GraphQL Server Template

Your final Apollo config should look like:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  validationRules: [
    depthLimit(5),
    createComplexityLimitRule(1000)
  ],
  context: ...
});
```

This is production-grade setup.

---

# 🎯 You Now Have

✔ Auth system
✔ Role-based access
✔ DataLoader optimization
✔ Pagination
✔ Filtering
✔ Depth limiting
✔ Complexity control
✔ Rate limiting
✔ Introspection control

This is no longer beginner GraphQL.

---

# 🚀 Next Level (Advanced Architecture)

We now move into:

> ✅ GraphQL Federation
> ✅ Microservice Architecture
> ✅ API Gateway pattern
> ✅ Splitting E-commerce into services
> ✅ When NOT to use GraphQL

This is senior architect level.
