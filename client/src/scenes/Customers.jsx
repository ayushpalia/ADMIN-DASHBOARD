import Header from "@/components/Header";
import { useGetCustomersQuery } from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Customers() {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  return (
    // so ye outer BOX jo hai pura page ka height lega
    //means basically ek div ki tarah kaam karega
    <Box height="100%" maxHeight="90vh" p="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      {
      //ye inner box hai jo data grid ko wrap karega
      //aur isme apn data grid ko rakhne wale hai
      //simmply its hust an wrapper for your datagrid
      //and datagrid will have whole data pf customers

      // to pura datagrid me table hoga innerbox bass usko style krenge
      //ke liye use kia hai apn ne
      //aur ye style neeche hai 
      //haa pr jo cheeze dikhani hai vo datagrid se milegi aur style kese krni
      //hai puri table vo box ke sx vale section me dege apn
}
      <Box
        mt="40px"
        height="72vh"
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
      >{
        //this is the dat need to be shown in the table
        //and upr jo sx hai vi design ke liye hai
        // accha apn ye datagrid use krte hai na to vo just like tbale rhti 
        //and bht kaam me ati isme khud sorting vgerh and all things
        //inbuilt hote hai
        //to apn isme data pass krenge and columns pass krenge
      }
        <DataGrid
          loading={isLoading || !data}
          //row id deni odti hai
          getRowId={(row) => row._id}
          //ye hai basically data jo apn ne fetch kia hai
          rows={data || []} 
          //ye apn ki columns hai jo apn ne define ki hai
          //jo headings hoti hai table ki vo dikhegi plus
          //columns me apn ne jo bhi field define kiya hai
          //vo table me dikhega
          //kese type vgerh aur structure bnana hai and dikhana hai
          //to vo jo upr hai column vala vo kuch nhi bhahi
          //bss ek parameter hai jo datagrid me jruri hai
          //and rows bbhi jruri hoti hai and rowid bhi
          columns={columns}
        />
      </Box>
    </Box>
    // to tumne notice kia hoga ki apn pura data jo ki customerdetail hai
    //usko pure mongodb se ek baar me fetch krte hai
    // pura data ata hai sara ka sara or sorting vgerh sb frontend me hoti hia
    //why??? becuase data hai apn pe to frontend me hi evaulate hota hai
    // to kind of client side rendering hota hai
    //to apn ne pura data fetch kia and usko table me dikhaya
    //kyuki pura data apn apne paas le aye phir usme dekhre hai
    //pr ye slow hojata hai jb data bht bada ho kyuki lane me hi time lg jayega
    //basically apn pure data ki copy frontend me bhejdete hai which is not efficient
    //to apn jab trnacation bnayege to dekhege ki server side pagination kaise hoti hai
    //kyuki jitna ek page me askta utna hi data lege thoda difficut hai pr worth it hai
  );
}

export default Customers;
