/* eslint-disable */
const functions = require("firebase-functions");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const userMeasurementRoutes = require("./routes/userMeasurementRoutes");
const clotheMeasurementRoutes = require("./routes/clotheMeasurementRoute");
const clotheTypeRoutes = require("./routes/clotheTypeRoutes");
const userAddressRoutes = require("./routes/userAddressRoute");
const OrderRoutes = require("./routes/orderRoute");

const PORT = 6028;
dotenv.config();
const app = express();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
      console.log(err);
    });

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/usermeasurements", userMeasurementRoutes);
app.use("/clothemeasurements", clotheMeasurementRoutes);
app.use("/clotheTypeRoutes", clotheTypeRoutes);
app.use("/userAddress", userAddressRoutes);
app.use("/orders", OrderRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

exports.app = functions.https.onRequest(app);