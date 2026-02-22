Excellent. Now we connect your **GraphQL backend → React frontend** properly.

In production, React usually calls GraphQL using:

> 🔥 Apollo Client (most common)
> Alternative: fetch / axios (manual)

We’ll use Apollo Client because it’s industry standard and matches your Apollo Server.

---

# 🧠 Architecture Overview

```plaintext
React App
   ↓
Apollo Client
   ↓
POST /graphql
   ↓
Apollo Server
   ↓
MongoDB / PostgreSQL
```

---

# 🚀 Step 1 — Install Apollo Client in React

Inside your React project:

```bash
npm install @apollo/client graphql
```

---

# 🏗 Step 2 — Setup Apollo Client

Create `src/apolloClient.js`

```js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
```

---

# 🧩 Step 3 — Wrap Your App

In `main.jsx` or `index.js`:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import client from "./apolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

Now your entire React app can use GraphQL.

---

# 🛒 Step 4 — Fetch Products (Query Example)

Inside `Products.jsx`:

```js
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      products {
        id
        name
        price
      }
    }
  }
`;

function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <div>
      {data.products.products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
```

That’s it. React automatically:

* Sends POST request
* Manages loading state
* Caches result
* Re-renders component

---

# 🔐 Step 5 — Sending JWT Token (Authentication)

If your backend requires auth:

Update Apollo client.

Modify `apolloClient.js`:

```js
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
```

Now every request automatically includes JWT.

---

# 🛒 Step 6 — Create Product (Mutation Example)

```js
import { gql, useMutation } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
    }
  }
`;

function AddProduct() {
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleAdd = async () => {
    await createProduct({
      variables: {
        input: {
          name: "MacBook M3",
          price: 150000,
          stock: 10,
          categoryId: "CATEGORY_ID",
        },
      },
    });
  };

  return <button onClick={handleAdd}>Add Product</button>;
}
```

---

# 🧠 What Apollo Client Gives You Automatically

✔ Request caching
✔ Optimistic UI updates
✔ Refetch queries
✔ Error handling
✔ Loading state
✔ Normalized cache

This is why Apollo Client is powerful.

---

# 🔎 What Actually Gets Sent to Backend?

Apollo sends:

```json
{
  "query": "mutation CreateProduct($input: CreateProductInput!) {...}",
  "variables": {
    "input": {
      "name": "MacBook M3",
      "price": 150000,
      "stock": 10,
      "categoryId": "CATEGORY_ID"
    }
  }
}
```

Same format you tested in Postman.

---

# ⚠ Common Issues

If React cannot connect:

1. CORS not enabled on backend
2. Wrong port
3. Backend not running
4. JWT header missing
5. HTTPS vs HTTP mismatch

For CORS, add in Express:

```js
const cors = require("cors");
app.use(cors());
```

---

# 🎯 Professional Insight

In production:

* GraphQL usually sits at `/graphql`
* React never hardcodes full URL (use env variables)
* Tokens stored securely (httpOnly cookies preferred)
* Apollo cache tuned carefully

---

# 🚀 You Now Know

✔ How React calls GraphQL
✔ How queries work
✔ How mutations work
✔ How JWT is attached
✔ How Apollo Client manages state

---