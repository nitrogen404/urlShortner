require("dotenv").config();
const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/routes");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");

connectDB();
connectRedis();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/', urlRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'URL Shortener API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
