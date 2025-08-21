import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { themeSettings } from "./theme";
import Layout from "./scenes/Layout";
import Dashboard from "./scenes/Dashboard";
import Products from "./scenes/Products";
import Customers from "./scenes/Customers";
import Transactions from "./scenes/Transactions";
import Geography from "./scenes/Geography";
import Overview from "./scenes/Overview";
import Daily from "./scenes/Daily";
import Monthly from "./scenes/Monthly";
import Breakdown from "./scenes/Breakdown";
import Admin from "./scenes/Admin";
import Performance from "./scenes/Performance";

const router = createBrowserRouter(
  createRoutesFromElements(
    //Always renders Sidebar + Navbar.
    //outlet layout ke andr hai to ye sare routes phle
    //apne parent ko layouut manege aur jaha outlet likha hai vaha chle jayega
    //Has <Outlet /> as a placeholder where the current page will appear.
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/geography" element={<Geography />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/breakdown" element={<Breakdown />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/performance" element={<Performance />} />
    </Route>
  )
  //This means every route inside will automatically render inside Layout’s <Outlet />.
);

function App() {
  //apn ne slice me theme default dark rakha hai
  const mode = useSelector((state) => state.global.mode);
  //apn ab themeSettings me mode pass krenge kyuki apn ne bnaya hi esa tha ki ab
  //theme jayegi to vo usme change krega aur (state bhi update krega)=ye kam vss slicer krega
  //baki actauully change theme.js me hoga
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
// dekho yha pe apn ne theme yaha di hai phir kabhi insaaan button click krega
  //to mode change hoga (upr hai)aur themeSettings me mode pass hoga
  //to themeSettings me mode change hoga aur waha se themeSettings se theme change
  //aur yha pe phirse render hoga aur theme change ho jayegi reload
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
