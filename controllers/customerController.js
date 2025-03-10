const axios = require('axios');
const API = 'http://localhost:3003/customers'

const getAllCustomers = async (req, res) => {
    try {
        const response = await axios.get(API);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const response = await axios.get(`${API}/${customerId}`);
        if (response.data) {
            res.status(200).json(response.data);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCustomer = async (req, res) => {
    try {
        if (
          !req.body.name ||
          !req.body.phone ||
          !req.body.address 
        ) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const newCustomer = {
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
        };
        const response = await axios.post(API, newCustomer);
        res.status(201).json({
          success: "Customer created successfully",
          data: response.data,
        });
    }catch (error) { 
        res.status(500).json({ error: error.message });
    }
     
       
};

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        // Check if customerId exists
        const existingId = await axios.get(API);
        const id = existingId.data.find((x) => x.id === customerId);
        if (!id) return res.status(404).json({ error: "Customer not found" });
        const currentCustomer = await axios.get(`${API}/${customerId}`);
        if (!currentCustomer.data) {
            return res.status(404).json({ error: "Customer not found" });
        }
        const updatedCustomer = {...currentCustomer.data,...req.body };
        const response = await axios.put(`${API}/${customerId}`, updatedCustomer);
        res.status(200).json({
            success: "Customer updated successfully",
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        // Check if customerId exists
        const existingId = await axios.get(API);
        const id = existingId.data.find((x) => x.id === customerId);
        if (!id) return res.status(404).json({ error: "Customer not found" });
         // Delete the product from the database
        const response = await axios.delete(`${API}/${customerId}`);
        res.status(200).json({
            success: "Customer deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
}