import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// so basically apn ne api.js me createApi bnaya hai
// to rtk ke ye krta hai ki jaha tummne backend me routes bnaye hai usko access krwata ha
//frontend me
//rtk easy krdeta and api calls initialize krna vrna normal react se bht difficult hoata jai
//ab jab backend me get vala route hoga (// isi URL se backend me route bnaya hoga)
// vaha se apn jo bhi return hoga vo frontend me useGetProductsQuery se access kr payenge
// kyuki vaha se apn ne neeche connection bnaya hai usi route ka
// aur useGetProductsQuery se apn use kar payenge

// aur isko RTK Query kehte hai iska bhi syntax hota hai
// pr main kya krta vo upr likha hai
export const api = createApi({
  //like ye baseUrl hai jaha se apn data fetch krenge
  // import.meta.env.VITE_APP_BASE_URL se apn ne environment variable se baseUrl
  // to kabhi bhi apn vo variable change krege to uske hisaab se hoga
  //aur ye VITE_APP_BASE_URL apn ne .env file me define kiya hoga
  //to like baseurl ke age ka main oart hai baseurl to bss destination tk phuchana hai
  // aur uske baad jo bhi route hoga vo apn ne endpoints me define kiya hai
  //to vo route ke hisaab se api call jayega

  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "UserPerformance",
    "Dashboard",
  ],
  endpoints: (builder) => ({
    //yaha se route connect ho raha hai
    getUserById: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: builder.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: builder.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: {
          page,
          pageSize,
          sort,
          search,
        },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: builder.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: builder.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getAdmins: builder.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),
    getUserPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["UserPerformance"],
    }),
    getDashboard: builder.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
