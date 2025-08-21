import express from "express";
import {
  getCustomers,
  getGeography,
  getProducts,
  getTransactions,
} from "../controllers/client.js";

const router = express.Router();
// getproduct is an callback function that will be called when the route is hit
//and this callback function is in the client.js file
//and it will return the products from the database
//and when get route is called it will call the getProducts function
//and it will return the products from the database
//means /client/products will call the getProducts function
//and this will handled bt api.js file
//and it will return the products from the database
//similary baki sbka hoga
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;