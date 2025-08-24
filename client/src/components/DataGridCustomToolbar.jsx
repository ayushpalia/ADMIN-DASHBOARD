/* eslint-disable react/prop-types */
import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          // jo searchInput hai vo yha pe aayega
          //aur setSearchInput se apn usse change krenge
          //pr apn tb hi krna chahte hai search jab search button pe click kre
          //to isliye apnne setSearchInput ko onChange me dala hai
          //ki sirf input change hote hi setSearchInput chale
          //baaki ka neeche dekho
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    // jab search button pe click hoga tabhi apn setSearch ko call krenge
                    //setsearch finally backend pe search bhejega
                    //search vo hook hai jo apn ne Transactions.jsx me banaya hai
                    //aur searchInput ki value ko search me set krenge
                    // to phir jab search pe click krege to  searchInput ki value search me chali jayegi
                    //aur last me setSearchInput("") se searchInput ko clear kr denge
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;
