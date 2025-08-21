import getCountryISO3 from "country-iso-2-to-3";

import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // 
    const productsWithStats = await Promise.all(
      //product.map is an array of products  
      //we are using Promise.all to wait for all the promises to resolve
      //and which is basically return array of promises and it will  wait everyone to finish
      //and then we will return the array of products with stats
      //we are using map to iterate over the products and for each product we are finding the
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          //spreads the raw product data (_doc is Mongoose’s way of storing the actual MongoDB fields).
          // and adds the stat data to it
          //so we are returning an object that contains all the product data and the stat data
          ...product._doc,
          //adds new property 'stat' to the product object
          //which contains the stats for that product
          stat,
          // so we are returning the all the original product’s fields from MongoDB
          //like _id, name, price, etc.
          //and the stats for that product
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      cost: { $regex: search, $options: "i" },
    });

    res.status(200).json({ transactions, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3] += 1;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return {
          id: country,
          value: count,
        };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
