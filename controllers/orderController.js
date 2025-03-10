const axios = require("axios");
const API = "http://localhost:3003/orders";

const getAllOrders = async (req, res) => {
  try {
    const response = await axios.get(API);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const response = await axios.get(`${API}/${orderId}`);
        if (response.data) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        if (
          !req.body.customerName ||
          !req.body.productName ||
          !req.body.quantity 
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newOrder = {
          customerName: req.body.customerName,
          productName: req.body.productName,
          quantity: req.body.quantity,
        };
        const response = await axios.post(API, newOrder);
        res.status(201).json({
          success: "Order created successfully",
          data: response.data,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const currentOrder = await axios.get(`${API}/${orderId}`);
        if (!currentOrder.data) {
            return res.status(404).json({ error: "Order not found" });
        }
        const newOrder = {...currentOrder.data,...req.body };
        const response = await axios.put(`${API}/${orderId}`, newOrder);
        res.status(200).json({
            success: "Order updated successfully",
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        // Check if productId exists
        const existingId = await axios.get(API);
        const id = existingId.data.find((x) => x.id === productId);
        if (!id) return res.status(404).json({ error: "Product not found" });
        
        const currentOrder = await axios.delete(`${API}/${orderId}`);
        if (!currentOrder.data) {
            return res.status(404).json({ error: "Order not found" });
        }
        await axios.delete(`${API}/${orderId}`);
        res.status(200).json({
            success: "Order deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
