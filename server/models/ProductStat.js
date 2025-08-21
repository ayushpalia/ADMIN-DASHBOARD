import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(

  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,

    //nesting this is an array of objects
    //each object will have month, totalSales, and totalUnits
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
