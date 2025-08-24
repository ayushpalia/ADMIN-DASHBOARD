import Header from "@/components/Header";
import { useGetGeographyQuery } from "@/state/api";
import { geoData } from "@/state/geoData";
import { Box, useTheme, CircularProgress } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";


// sbse phle apn ne ek code copy kia hai geodata.js isko kahi bhi rkho apn ne api 
//folder me isleye rkha hai kyuki ye ek GeoJSON hai jo jrurri hai
//iske bina apn map nhi bana saktee
//ye geojson basically countries ke coordinates deta hai (PURA DATA)
function Geography() {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
// ab is cheez me bht saare parameters hote hai jo apnko dene hote hai
// ye apn ko nivogeomaps site se milege 
// vaha se setup krna pdta hai data ki kis type ka map chahiye
// kitna bada konse features chahiye vaha se copy kro aur phir hlka sa yaha modify kro 
// like ye theme section apnne add kia hai
//ye apnko tab chahiye jab apn dark mode vgerh krte
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

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="GEOGRAPHY" subtitle="Find where your users are located." />
      <Box
        mt="40px"
        height="72vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? (
          <ResponsiveChoropleth
            data={data}
            colors="nivo"
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.grey[700],
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
}

export default Geography;
