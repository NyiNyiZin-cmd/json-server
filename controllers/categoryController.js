const axios = require("axios");
const API = "http://localhost:3003/categories";

const getAllCategories = async (req, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const response = await axios.get(`${API}/${categoryId}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.slug ||
      !req.body.description ||
      !req.body.isActive
    ) {
      return res.status(400).json({ error: "Name is required" });
    }
    const newCategory = {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      isActive: req.body.isActive,
    };
    const response = await axios.post(API, newCategory);
    res.status(201).json({
      success: "Category created successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Check if categoryId exists
    const existingId = await axios.get(API);
    const id = existingId.data.find((x) => x.id === categoryId)
    if (!id) return res.status(404).json({ error: "Category not found" });

    const currentCategory = await axios.get(`${API}/${categoryId}`);
    if (!currentCategory.data) {
      return res.status(404).json({ error: "Category not found" });
    }
    const updatedCategory = { ...currentCategory.data, ...req.body };
    const response = await axios.put(`${API}/${categoryId}`, updatedCategory);
    res.status(200).json({
      success: "Category updated successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      // Check if categoryId exists
      const existingId = await axios.get(API);
      const id = existingId.data.find((x) => x.id === categoryId);
      if (!id) return res.status(404).json({ error: "CategoryId not found" });
      const response = await axios.delete(`${API}/${categoryId}`);
      res.status(200).json({ success: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
    
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
