const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require('./routes/authRoute')
const postsRoutes = require('./routes/postsRoutes')
const productsRoutes = require('./routes/productsRoutes')
const customersRoutes = require('./routes/customersRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')
const ordersRoutes = require('./routes/ordersRoutes')

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/customers', customersRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/orders', ordersRoutes)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http;//localhost:${PORT}`);
});
