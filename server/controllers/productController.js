import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";


export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, stock, category, isFeatured } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    image,
    stock,
    category,
    isFeatured,
  });

  res.status(201).json(product);
});


export const getProducts = asyncHandler(async (req, res) => {
  const {
    category,        
    search,         
    featured,        
    page = 1,
    limit = 12,
    sort = 'createdAt', 
    order = 'desc',     
  } = req.query;

  const filter = {};

  if (category) filter.category = category; 
  if (featured === 'true') filter.isFeatured = true;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const skip = (pageNum - 1) * limitNum;

  const sortObj = { [sort]: order === 'asc' ? 1 : -1 };

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortObj).skip(skip).limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.status(200).json({
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    total,
  });
});


export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});


export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, image, stock, category, isFeatured } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.image = image || product.image;
  product.stock = stock || product.stock;
  product.category = category || product.category;
  product.isFeatured = isFeatured ?? product.isFeatured;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});


export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.remove();
  res.status(200).json({ message: "Product deleted" });
});




export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const featured = await Product.find({ isFeatured: true });
  res.status(200).json(featured);
});
