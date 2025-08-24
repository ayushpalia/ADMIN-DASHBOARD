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

//nivogeomap expect data in the form of array of objects like below

/* const data = [
  { id: "USA", value: 200 },
  { id: "FRA", value: 150 },
  { id: "IND", value: 300 },
];
*/

// so first sare user dal lege server me
//phir reduce use krke 

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    //acc is accumulator jisme apn data store krenge
    //jo agr ek baar me sare users ko loop krke country count kr lega
    //country is current value
    const mappedLocations = users.reduce((acc, { country }) => {
      // ek function hai jo 2 letter country code ko 3 letter country code me convert krta hai
      //jaise IN to IND to ye countryISO3 me aa jayega
      const countryISO3 = getCountryISO3(country);
      //agr countryISO3 me kuch nahi hai to usme 0 dal do
      //agr hai to usme 1 add krdo
      // to like tumhare 3 user aye india ke 
      // map ki trh hai thoda bht samajh lo
      // acc[countryISO3] means agr acc me countryISO3 hai to usme 1 add krdo
      // to "IND" : 3
      //agr nahi hai to usme 0 dal do fir usme 1 add kr
      // like agr exist nhi krti country phle se apn acc me to 0 daldo
      //next line me usme 1 add krdo to like india aya first time 
      // to naya create hoga acc me with 0  aur next line me 1 add hoga to 1 ho jayega
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3] += 1;
      return acc;
    }, {});
    //const mappedLocations = { IND: 2, USA: 1, FRA: 5 };
    //esa rhega mapped location ka data
    //apn ko esa return krna hai nevomaps me 
    /*
   [
  ["IND", 2],
  ["USA", 1],
  ["FRA", 5]
]
    */
   //loop through the object and return array of objects
  // it loops thiugh cuntry count pair
  //destructuring use krke
  //return new value
    const formattedLocations = Object.entries(mappedLocations).map(

      //vese bina destructuring bhi kr skte the
      // ki apn country=pair[0] and count=pair[1] le skte the (pair iterator cum value hai)
      // aur return kradete  return { id: country, value: count }; esa kuch
      // but destructuring se bht easy hojata hai
      // apn map krte to iterator kam value hoti 
      // to ye apn kuch is trh se kr skte the
      //ki map ()  ->iske andr iterator kmvalue hogi to vo valuye
      //ki [country,count] = kmvalue ye apna ab iterator hai aur value bhi
      // isme direct save kradege kyuki normally bhi koi leta to vo array me trvaerse
      //krta ab apn ne is type ka iterator liya jo destructured way me trvaerse krta hai
      // to koi i lete means to i[0] i[1] pdta apn ne [i ki jagah [country,coount]]
      //pass krdia to dirrect i ki jagah ye destructred hogya hai to direct isme values ayegi
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
