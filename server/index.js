import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import generalRoutes from "./routes/generalRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

// Optional models & seed data
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js";

// CONFIG
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE CONNECTION FUNCTION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Uncomment only once to seed initial data
    /*
    await User.insertMany(dataUser);
    await Product.insertMany(dataProduct);
    await ProductStat.insertMany(dataProductStat);
    await Transaction.insertMany(dataTransaction);
    await OverallStat.insertMany(dataOverallStat);
    await AffiliateStat.insertMany(dataAffiliateStat);
    console.log("✅ Initial data seeded");
    */

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit app if DB fails to connect
  }
};

// CONNECT TO DATABASE
connectDB();
