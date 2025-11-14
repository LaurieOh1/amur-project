import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    images: {
      type: [String], // An array of image URLs
      required: [true, "At least one product image is required"],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Please provide at least one image URL",
      },
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      enum: ["Shampoo", "Conditioner", "Oil", "Cream", "Accessory", "Other"],
      default: "Other",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' }); 
const Product = mongoose.model("Product", productSchema);

export default Product;
