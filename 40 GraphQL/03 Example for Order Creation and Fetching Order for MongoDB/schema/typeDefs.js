const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    category: Category
  }

  input CreateCategoryInput {
    name: String!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    stock: Int!
    categoryId: ID!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    createProduct(input: CreateProductInput!): Product!
  }

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

module.exports = typeDefs;
