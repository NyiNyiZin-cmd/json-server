const axios = require("axios");
const API = "http://localhost:3003/products";

const getAllProducts = async (req, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await axios.get(`${API}/${postId}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.price ||
      !req.body.stock ||
      !req.body.image
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.body.image,
    };
    const response = await axios.post(API, newProduct);
    res.status(201).json({
      success: "Product created successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Check if productId exists
    const existingId = await axios.get(API);
    const id = existingId.data.find((x) => x.id === productId);
    if (!id) return res.status(404).json({ error: "Product not found" });
    const currentProduct = await axios.get(`${API}/${productId}`);
    if (!currentProduct.data) {
      return res.status(404).json({ error: "Product not found" });
    }
    const newProduct = { ...currentProduct.data, ...req.body };
    const response = await axios.put(`${API}/${productId}`, newProduct);
    res.status(200).json({
      success: "Product updated successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Check if productId exists
    const existingId = await axios.get(API);
    const id = existingId.data.find((x) => x.id === productId);
    if (!id) return res.status(404).json({ error: "Product not found" });
    // Delete the product from the database
    const currentProduct = await axios.get(`${API}/${productId}`);
    if (!currentProduct.data) {
      return res.status(404).json({ error: "Product not found" });
    }
    await axios.delete(`${API}/${productId}`);
    res.status(200).json({
      success: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
