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
`;

module.exports = typeDefs;