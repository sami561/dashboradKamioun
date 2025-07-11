import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import PersonIcon from "@mui/icons-material/Person";
import {
  useGetAdminCountQuery,
  useGetCountCustomersQuery,
  useGetUsersQuery,
  useGetAllUsersQuery,
  useGetAccountTypeCountsQuery,
} from "state/userApi";
import {
  useGetCompletedOrdersTotalQuery,
  useGetGvmPerMonthQuery,
} from "state/ordersApi";

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "fullName",
    headerName: "Full Name",
    flex: 1,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`.trim(),
  },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phoneNumber", headerName: "Phone", flex: 1 },
  {
    field: "accountType",
    headerName: "Account Type",
    flex: 1,
    valueGetter: (params) => params.row.account?.accountType || "N/A",
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor: params.value ? "success.main" : "error.main",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.75rem",
        }}
      >
        {params.value ? "Active" : "Inactive"}
      </Box>
    ),
  },
  { field: "city", headerName: "City", flex: 1 },
];

// Dummy counts for StatBox
const dummyUserCount = { count: 10 };
const dummyAdminCount = { count: 2 };
const dummyBankCount = { count: 5 };

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: adminCount } = useGetAdminCountQuery();
  console.log("🚀 ~ Dashboard ~ adminCount:", adminCount);
  const { data: userCount, isLoading2 } = useGetCountCustomersQuery();
  const { data: allUsers, isLoading: isLoadingAllUsers } =
    useGetAllUsersQuery();
  console.log("🚀 ~ Dashboard ~ allUsers:", allUsers);
  const {
    data: completedOrdersTotal,
    isLoading: isLoadingCompletedOrdersTotal,
  } = useGetCompletedOrdersTotalQuery();
  const { data: gvmPerMonth, isLoading: isLoadingGvmPerMonth } =
    useGetGvmPerMonthQuery();
  const { data: accountTypeCounts, isLoading: isLoadingAccountTypes } =
    useGetAccountTypeCountsQuery();

  // Transform gvmPerMonth to the format expected by BreakdownChart
  const gvmChartData = gvmPerMonth
    ? gvmPerMonth.map((item) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        gvm: item.gvm,
      }))
    : [];

  // Transform account type counts to the format expected by BreakdownChart
  const accountTypeChartData = accountTypeCounts
    ? Object.entries(accountTypeCounts).map(([type, count]) => ({
        id: type.charAt(0).toUpperCase() + type.slice(1),
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: count,
      }))
    : [];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total client"
          value={userCount?.count ?? dummyUserCount.count}
          increase=""
          description="users"
          icon={
            <PersonIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total admin"
          value={adminCount?.count ?? dummyAdminCount.count}
          increase=""
          description=" admins"
          icon={
            <AdminPanelSettingsOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title="orders"
          value={
            isLoadingCompletedOrdersTotal
              ? "Loading..."
              : `${completedOrdersTotal?.total ?? 0} DT`
          }
          increase=""
          description="orders"
          icon={
            <AccountBalanceIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
          <DataGrid
            loading={isLoadingAllUsers}
            getRowId={(row) => row._id}
            rows={allUsers || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Account Types Distribution
          </Typography>
          <BreakdownChart isDashboard={true} data={accountTypeChartData} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            This chart shows the distribution of users by account type.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
