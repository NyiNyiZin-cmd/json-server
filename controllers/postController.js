const axios = require("axios");
const API = "http://localhost:3003/posts";

const getAllPosts = async (_, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostById = async (req, res) => {
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

const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.userId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newPost = {
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId,
    };
    const response = await axios.post(API, newPost);
    res.status(201).json({
      success: "Post created successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

// update post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentPost = await axios.get(`${API}/${postId}`);
    console.log(currentPost.data);
    if (!currentPost.data) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newPost = { ...currentPost.data, ...req.body };
    const response = await axios.put(`${API}/${postId}`, newPost);
    res
      .status(200)
      .json({ success: "Post updated successfully", data: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const currentPost = await axios.get(`${API}/${postId}`);
    if (!currentPost.data) {
      return res.status(404).json({ error: "Post not found" });
    }
    await axios.delete(`${API}/${postId}`);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
