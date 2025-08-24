import { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "@/components/Header";
import OverviewChart from "@/components/OverviewChart";

function Overview() {
  const [view, setView] = useState("units");

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
        <Box height="71vh">
          <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>View</InputLabel>
            
            <Select
              value={view}
              label="View"
              /*  means the value that will be shown is int current value of view
              value={view} ka mtlb hi ye hota hai means value ka mtlb hi ye hota hai */
                
              // on change means ki agr koi bhi value change hogi to
              // vo cheez setview me jayeg e.target.value tha kyuki to view change hoga
              // to select ke vjeh se frontend pe dikhega  
              onChange={(e) => setView(e.target.value)}
              size="small"
            >
              {/* since select ka opening vala abhi bnd hua hai
              select hmesha apne ap ko kuch return krta hai to ye menuitems hai with there
              values to apn icon click krege ye value usko e.target.value me ayega
              */}
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="units">Units</MenuItem>
            </Select>
          </FormControl>
          <OverviewChart view={view} />
      </Box>
    </Box>
  );
}

export default Overview;
