import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

// Dummy sales data in Tunisian Dinar (DT)
const dummySalesData = {
  monthlyData: [
    { month: "Jan", totalSales: 3000, totalUnits: 70 },
    { month: "Feb", totalSales: 1500, totalUnits: 40 },
    { month: "Mar", totalSales: 1800, totalUnits: 45 },
    { month: "Apr", totalSales: 2000, totalUnits: 50 },
    { month: "May", totalSales: 2200, totalUnits: 55 },
    { month: "Jun", totalSales: 1500, totalUnits: 53 },
    { month: "Jul", totalSales: 2600, totalUnits: 58 },
    { month: "Aug", totalSales: 2400, totalUnits: 58 },
    { month: "Sep", totalSales: 2300, totalUnits: 56 },
    { month: "Oct", totalSales: 2700, totalUnits: 62 },
    { month: "Nov", totalSales: 2700, totalUnits: 65 },
    { month: "Dec", totalSales: 3000, totalUnits: 70 },
  ],
};

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();

  // Always use dummy data
  const chartData = dummySalesData;

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!chartData) return [];

    const { monthlyData } = chartData;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    monthlyData.reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [chartData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!chartData) return "Loading...";

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat={(value) => `${value} DT`}
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue (DT)" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
        format: (value) => `${value} DT`,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
