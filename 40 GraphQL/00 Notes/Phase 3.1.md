Excellent. Now we move into **production-critical architecture**.

Without authentication & authorization, your E-commerce API is incomplete.

We will implement:

* ✅ User model
* ✅ Register / Login
* ✅ JWT authentication
* ✅ Inject user into GraphQL `context`
* ✅ Protect mutations
* ✅ Role-based authorization (ADMIN vs CUSTOMER)

This is how real systems work.

---

# 🧱 Step 1 — Install Dependencies

```bash
npm install bcryptjs jsonwebtoken
```

---

# 📦 Step 2 — Create User Model

## `models/User.js`

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
  },
});

module.exports = mongoose.model("User", userSchema);
```

---

# 📜 Step 3 — Update GraphQL Schema

Add User type + Auth mutations.

---

## Update `typeDefs.js`

```graphql
enum UserRole {
  CUSTOMER
  ADMIN
}

type User {
  id: ID!
  name: String!
  email: String!
  role: UserRole!
}

type AuthPayload {
  token: String!
  user: User!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}

extend type Mutation {
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
}
```

---

# ⚙ Step 4 — Implement Register & Login Resolvers

## Update `resolvers.js`

```js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
```

---

## Register

```js
register: async (_, { input }) => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = new User({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    "MY_SECRET_KEY",
    { expiresIn: "1d" }
  );

  return { token, user };
},
```

---

## Login

```js
login: async (_, { input }) => {
  const user = await User.findOne({ email: input.email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(input.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    "MY_SECRET_KEY",
    { expiresIn: "1d" }
  );

  return { token, user };
},
```

---

# 🔐 Step 5 — Inject User Into Context

Modify `server.js`.

---

```js
const jwt = require("jsonwebtoken");
const User = require("./models/User");
```

Update Apollo Server:

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader) return {};

    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, "MY_SECRET_KEY");

      const user = await User.findById(decoded.userId);

      return { user };
    } catch (err) {
      return {};
    }
  },
});
```

Now every resolver receives:

```js
(parent, args, context, info)
```

And `context.user` will contain logged-in user.

---

# 🔒 Step 6 — Protect Order Creation

Modify `createOrder` mutation.

---

```js
createOrder: async (_, { input }, context) => {

  if (!context.user) {
    throw new Error("Authentication required");
  }

  let total = 0;

  for (const item of input.items) {
    const product = await Product.findById(item.productId);

    if (!product) throw new Error("Product not found");

    total += product.price * item.quantity;
  }

  const order = new Order({
    userId: context.user.id,
    items: input.items,
    totalAmount: total,
  });

  return await order.save();
},
```

Now:

* UserId is NOT taken from frontend
* It comes from JWT

This prevents fraud.

---

# 👑 Step 7 — Role-Based Authorization (Admin Only)

Example: Only admin can create products.

Modify `createProduct`:

```js
createProduct: async (_, { input }, context) => {

  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  const product = new Product(input);
  return await product.save();
},
```

Now:

* CUSTOMER cannot create products
* ADMIN can

---

# 🧪 Testing Flow

### 1️⃣ Register

```graphql
mutation {
  register(input: {
    name: "Riyaz"
    email: "riyaz@test.com"
    password: "123456"
  }) {
    token
    user {
      id
      role
    }
  }
}
```

Copy token.

---

### 2️⃣ Add Header in Apollo Sandbox

```
Authorization: Bearer YOUR_TOKEN
```

---

### 3️⃣ Try Protected Mutation

Now `createOrder` works only if authenticated.

---

# 🧠 Architectural Understanding

Now your request lifecycle is:

```plaintext
Client
   ↓
Authorization Header
   ↓
JWT Verification
   ↓
context.user injected
   ↓
Resolver authorization check
   ↓
Business logic
   ↓
Database
```

This is real production flow.

---

# 🚀 What You Have Achieved Now

Your GraphQL E-commerce API now supports:

✔ User registration
✔ Login
✔ Password hashing
✔ JWT authentication
✔ Context injection
✔ Protected mutations
✔ Role-based access control

You are now building backend at professional level.

---

# 🔥 Next Critical Step

Now we enter performance engineering:

> ✅ N+1 problem deep dive
> ✅ DataLoader implementation
> ✅ Resolver batching
> ✅ Query depth limiting
> ✅ Security hardening

This is where senior-level GraphQL knowledge begins.

Say:

**“Continue Phase 3 – N+1 Problem & DataLoader”**
