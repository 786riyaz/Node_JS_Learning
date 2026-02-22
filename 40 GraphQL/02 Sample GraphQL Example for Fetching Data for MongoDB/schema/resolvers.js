const Product = require("../models/Product");
const Category = require("../models/Category");

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },

    product: async (_, { id }) => {
      return await Product.findById(id);
    },
  },

  Product: {
    category: async (parent) => {
      return await Category.findById(parent.categoryId);
    },
  },
};

module.exports = resolvers;