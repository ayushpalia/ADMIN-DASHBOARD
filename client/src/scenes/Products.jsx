/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Header from "@/components/Header";
import { useGetProductsQuery } from "@/state/api";

function Product({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) {
  //like tumne frontend pe see more button diya hai
  //to isse apn useState se ek isExpanded variable banayenge
  //jo initially false hoga
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function Products() {
  //reduxtool query hook to fetch products
  //aur agr isse data ata hai to yehi vairable use krte hai
  //means ek proopetty hai RTK ki ki data aya to us variable me save krao
  //aur agr fetch hor ahi means ek isLoading variable hota hai
  //to usse check krte hai ki data fetch horahi hai ya nahi
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
//nhi aya means loading ke liye ek box dikhadia
  if (!data || isLoading)
    return (
      <Box
        width="100%"
        height="100%"
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );

    //agya data mil gaya to products ka array hai
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {/* data is an array of products */}
        {/* map over the data and return a Product component for each product */}
        {/* to apn jo data ay hai basically vo array ofobjects hoga
        { pura product ka data hoga
        _id, name, description, price, rating, category, supply
        ,state(isko apn ne backend me append kia hai)
        } 
        // ab isme apn trvaerse krege aur hr ek object print krwana hai means frontend pe lana
        //hai to apn Product component banaenge (jo ek card ki trh hoga)
        //usme sb detail iterative way me pass krenge
        //to apn Product component me pass krenge to hr ek object ki particular detaik
        //alagse jayegi 
         */ }
        {data.map(
          ({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stat,
          }) => (
            <Product
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              rating={rating}
              category={category}
              supply={supply}
              stat={stat}
            />
          )
        )}
      </Box>
    </Box>
  );
}

export default Products;
