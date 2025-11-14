import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js"; 

dotenv.config();

const products = [
  {
    name: "Amur Nourishing Shampoo",
    description: "Gently cleanses while hydrating dry and textured hair. Enriched with coconut oil and shea butter to reduce breakage and enhance shine.",
    price: 12.99,
    images: ["http://localhost:5050/uploads/products/Shampoo.png","http://localhost:5050/uploads/products&sceneries/20250728_1947_Herbal Shampoo Splash_remix_01k1920k6ye32bq61x12pp7pe7.png"],
    stock: 50,
    category: "Shampoo",
    isFeatured: true,
  },
  {
    name: "Amur Hydrating Conditioner",
    description: "Detangles and deeply moisturizes curls and coils. Formulated with argan oil and aloe vera for softness and manageability.",
    price: 13.99,
    images: ["http://localhost:5050/uploads/products/conditioner.png","http://localhost:5050/uploads/products&sceneries/20250729_1844_Hair Conditioner Display_remix_01k1bh267cf5cbm9t04x7bqqcz.png"],
    stock: 50,
    category: "Conditioner",
    isFeatured: true,
  },
  {
    name: "Amur Repairing Hair Mask",
    description: "Restores strength and elasticity with a blend of avocado oil and honey. Ideal for damaged or color-treated Afro hair.",
    price: 16.99,
    images: ["http://localhost:5050/uploads/products/Hair_mask.png", "http://localhost:5050/uploads/products&sceneries/20250728_1923_Image Generation_remix_01k190t3gdf8ma9fyv4nxe9maj.png"],
    stock: 30,
    category: "Cream",
    isFeatured: false,
  },
  {
    name: "Amur Scalp Massage Brush",
    description: "Silicone bristles stimulate blood flow and exfoliate the scalp, promoting healthy hair growth and reducing buildup.",
    price: 7.99,
    images: ["http://localhost:5050/uploads/products/20250801_1439_Wooden Scalp Massager_remix_01k1jt7j16e6d9cdw92whkkra0.png", "http://localhost:5050/uploads/products&sceneries/20250728_1951_Scalp Brush Display_remix_01k1920k6ye32bq61x12pp7pe7.png"],
    stock: 100,
    category: "Accessory",
    isFeatured: false,
  },
  {
    name: "Amur Duo: Shampoo & Conditioner",
    description: "A perfect pair for Afro-textured hair — cleanse and hydrate with our bestselling combo at a special price.",
    price: 24.99,
    images: ["http://localhost:5050/uploads/products/duo_shampoo_conditionner.png", "http://localhost:5050/uploads/products&sceneries/20250728_1929_Rosemary-Infused Haircare Display_remix_01k1916sdfe9drfqmcsb90k6ky.png"],
    stock: 40,
    category: "Other",
    isFeatured: true,
  },
    {
    name: "Amur Scalp Revive Serum",
    description: "A lightweight serum that soothes dry, itchy scalp and promotes growth. Infused with peppermint, castor oil, and tea tree extract.",
    price: 14.99,
    images: ["http://localhost:5050/uploads/products/Serum.png","http://localhost:5050/uploads/products&sceneries/20250728_1957_Image Generation_remix_01k192rf22ex997gyevyvnx9j2.png"],
    stock: 35,
    category: "Oil",
    isFeatured: true,
  },
  {
    name: "Amur Curl Defining Gel",
    description: "Defines curls without flaking or crunch. Ideal for twist-outs, wash-n-go styles, and frizz control in humid weather.",
    price: 11.99,
    images: ["http://localhost:5050/uploads/products/Gel.png","http://localhost:5050/uploads/products&sceneries/20250729_1840_Avocado Oil Product_remix_01k1bgv1qaenprz8bxx0yvvx6p.png"],
    stock: 45,
    category: "Cream",
    isFeatured: true,
  },
  
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
   
    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedProducts();
