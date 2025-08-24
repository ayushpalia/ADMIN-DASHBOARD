/* eslint-disable react/prop-types */
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "@/assets/avatar.svg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

function Sidebar({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) {
  // pathname is a react-router-dom hook that gives the current path
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
// so setActive me vo string ayegi jo path dena chahte apn 
//means dependecy array me pathname hai to jab bhi pathname change hoga
// to useEffect chalega aur setActive me vo string set ho jayegi
// to basically apn ne active me vo string set krdi hai jo path hai
  useEffect(() => {
    //dekho ye pathname.substring(1) se apn ne vo / hata diya hai
    //to agar pathname /dashboard hai to active me dashboard set hoga
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%" sx={{ overflowY: "scroll" }}>
            <Box m="1.5rem 2rem 1.5rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.5rem"
                  width="fit-content"
                >
                  <Typography variant="h4" fontWeight="bold">
                    ADMIN DASHBOARD
                  </Typography>
                  {
                  //means mobile hai bhai to chevron left button dikhana hai
}
                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </Box>
              </FlexBetween>
            </Box>
            {
            //array of objects hai navItems me
            //to map krenge aur har object se text aur icon le lenge  
}
            <List>
              { navItems.map(({ text, icon }) => {
                //if empty icon then we just return a Typography component
                //with the text and some styling
                // ye to neeche dikhadiye sare option
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 2rem" }}
                      color={theme.palette.secondary[300]}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                //if icon is present then we return a ListItem with ListItemButton
                //and ListItemIcon and ListItemText components
                //onclick of ListItemButton will navigate to the path
                //dekho like jo bhi navItem apn ne frontend me render kre hai
                //usme se jb bhi kisi pe click hoga to apn navigate krdenge us path pe
                //oh it is in the loop 
                //and when we rendered all options onclick will be used in the iterated options
                //and usme se jb bhi kisi pe click hoga to apn navigate krdenge

                {
                  /*
                  For every item in navItems, React runs this function.

Each time, it creates a new lcText based on that item’s text.
Example: "Transactions" → "transactions", "Customers" → "customers".

Each iteration gets its own closure

Even though the onClick code looks the same, it’s not one shared function.

It’s actually a new function bound to that iteration’s lcText.
So the button for "Transactions" literally has an onClick like:
                  */
                }
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // yaha se jo bhi text hai vo apnko path me chahiye
                      
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[200]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary[900]
                            : theme.palette.secondary[100],
                        "&:hover": {
                          backgroundColor:
                            active === lcText
                              ? theme.palette.secondary[200]
                              : "",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1.5rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
