const Product = require("../models/Product");
const Category = require("../models/Category");

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
    categories: async () => await Category.find(),
  },

  Mutation: {
    createCategory: async (_, { input }) => {
      const category = new Category({
        name: input.name,
      });

      return await category.save();
    },

    createProduct: async (_, { input }) => {

      // Basic validation
      if (input.price < 0) {
        throw new Error("Price cannot be negative");
      }

      const categoryExists = await Category.findById(input.categoryId);
      if (!categoryExists) {
        throw new Error("Invalid Category ID");
      }

      const product = new Product({
        name: input.name,
        price: input.price,
        stock: input.stock,
        categoryId: input.categoryId,
      });

      return await product.save();
    },
  },

  Product: {
    category: async (parent) => {
      return await Category.findById(parent.categoryId);
    },
  },
};

module.exports = resolvers;