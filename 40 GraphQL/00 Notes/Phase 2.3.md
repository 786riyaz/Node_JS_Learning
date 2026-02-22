Excellent. Now we move into **real E-commerce domain modeling**.

We will build:

* ✅ `Order` model
* ✅ Relationship: Order → Products
* ✅ Enum: `OrderStatus`
* ✅ Auto-calculate `totalAmount`
* ✅ Nested resolvers for order products

This is where GraphQL becomes powerful.

---

# 🏗 Step 1 — Design the Order Model (Database Layer)

An order in real E-commerce contains:

* User reference (we’ll simplify for now)
* List of products
* Quantity per product
* Total amount
* Status
* Created date

---

## 📦 `models/Order.js`

```js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // simplified for now
    required: true,
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
```

Notice:

* Order contains embedded `items`
* Each item stores `productId + quantity`
* We store `totalAmount` for performance (avoid recalculating)

---

# 📜 Step 2 — Update GraphQL Schema

Now update `typeDefs.js`.

---

## Add Enum + Order Types

```js
const typeDefs = gql`

  enum OrderStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type OrderItem {
    product: Product!
    quantity: Int!
  }

  type Order {
    id: ID!
    userId: String!
    items: [OrderItem!]!
    totalAmount: Float!
    status: OrderStatus!
    createdAt: String!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  input CreateOrderInput {
    userId: String!
    items: [OrderItemInput!]!
  }

  extend type Query {
    orders: [Order!]!
  }

  extend type Mutation {
    createOrder(input: CreateOrderInput!): Order!
  }
`;
```

Notice:

* We use `enum` for order status
* We define `OrderItem` separately
* We use input types for order creation

---

# ⚙ Step 3 — Implement Order Resolvers

Update `resolvers.js`.

---

## Import Model

```js
const Order = require("../models/Order");
```

---

## Add Query + Mutation

```js
Query: {
  ...
  orders: async () => await Order.find(),
},

Mutation: {
  ...
  createOrder: async (_, { input }) => {

    let total = 0;

    for (const item of input.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      total += product.price * item.quantity;
    }

    const order = new Order({
      userId: input.userId,
      items: input.items,
      totalAmount: total,
      status: "PENDING",
    });

    return await order.save();
  },
},
```

---

# 🔁 Nested Relationship Resolver

Now resolve:

```graphql
items {
  product {
    name
  }
}
```

Add:

```js
Order: {
  items: async (parent) => parent.items,
},

OrderItem: {
  product: async (parent) => {
    return await Product.findById(parent.productId);
  },
},
```

---

# 🧪 Step 4 — Test Order Creation

### Create Order

```graphql
mutation {
  createOrder(
    input: {
      userId: "user123"
      items: [
        { productId: "PRODUCT_ID_1", quantity: 2 }
        { productId: "PRODUCT_ID_2", quantity: 1 }
      ]
    }
  ) {
    id
    totalAmount
    status
  }
}
```

---

### Fetch Orders with Nested Products

```graphql
query {
  orders {
    id
    totalAmount
    items {
      quantity
      product {
        name
        price
      }
    }
  }
}
```

GraphQL will:

1. Fetch orders
2. For each order → resolve items
3. For each item → fetch product
4. Assemble final tree

---

# 🧠 What Just Happened Architecturally?

You now have:

```plaintext
Order
 ├── items[]
       ├── product
```

This is multi-level resolver chaining.

This is where:

> ⚠ N+1 problem becomes real.

If 50 orders × 5 products each → 250 product DB queries.

We will fix that later using DataLoader.

---

# 🚀 Important E-Commerce Best Practices

1. Always store `totalAmount`
2. Never trust frontend price
3. Validate stock before order creation
4. Use enum for order status
5. Use transactions in production (we’ll add later)

---

# 🎯 You Have Now Built

✔ Product system
✔ Category system
✔ Order system
✔ Nested relationships
✔ Business logic inside resolver
✔ Enum usage
✔ Input types

This is now a mini production-ready backend.

---

# 🔥 Next Level

We now move to:

> ✅ Pagination (skip/limit pattern)
> ✅ Filtering (price range, category filter)
> ✅ Sorting
> ✅ Better query design

This is important for real product listing pages.
