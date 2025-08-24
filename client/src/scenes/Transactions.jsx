import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "@/state/api";
import Header from "@/components/Header";
import DataGridCustomToolbar from "@/components/DataGridCustomToolbar";

function Transactions() {
  const theme = useTheme();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  // to jb jb ye hooks change honge to apnka api call firse hoga
  //aur apnko naya data milega
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
      {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length,
      },
      {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
      },
    ];

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="77vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
      {
        // datagraid me serverside rendering ke loye phle se cheeze hai bss apn ko frontend
        //se paas krni pdti hai values phir backend me bss handle krna hai ki konsa page
        //chahiye aur konsa sort chahiye vgerh vaha pura function likhna hai kyuki
        //backend pura kaam krke khud ye smjhega ki apn ne kuch function bnayege getranscition
        //me aur uske hisab se data dega aur frontned me apnko bas use krna hai
        // ki kese dikhana hai
        // to jab server side pagination krte hai to apnko page aur page size dena pdta hai
        //ki konsa page chahiye aur ek page me kitne rows chahiye
        //and you know what ki jab serverside pagination krte hai to data
        //backennd pe hi rhta hai pura nhi late 
        // to yha bhi code likhna pdta hai cheeze btane aur smjhane ko backend ke liye
        // aur bacjend pe puri functionality lgani pdegi jo smjhanah hai
        // kyuki apna data abhi forntend me nhi hai jo aon frontend pe hi sort krde 
        //customers ki trh apna data actaully me backend me hai 
        // to frontend se sb intitialize krke backenfd pe hi sort krna pdega
      }
        <DataGrid
          loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20, 50, 100]}
            pagination
            paginationMode="server"
            sortingMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            // ye apnka custom toolbar hai jisme apnne search vagerh ki cheeze bnayi hai
            // yha se hooks change hoge to apnka api call firse hoga
            slots={{ toolbar: DataGridCustomToolbar }}
            slotProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
