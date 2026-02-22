const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const resolvers = {
  Query: {
    products: async () => await Product.find(),
    product: async (_, { id }) => await Product.findById(id),
    orders: async () => await Order.find(),
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

  Product: {
    category: async (parent) => {
      return await Category.findById(parent.categoryId);
    },
  },
  
  Order: {
    items: async (parent) => parent.items,
  },

  OrderItem: {
    product: async (parent) => {
      return await Product.findById(parent.productId);
    },
  },
};

module.exports = resolvers;
