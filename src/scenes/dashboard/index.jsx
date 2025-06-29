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
import {
  useGetBankCountQuery,
  useGetCountManagerQuery,
  useGetRequestQuery,
  useGetallUserCountQuery,
  useGetUserQuery,
} from "state/apiSpring";
import PersonIcon from "@mui/icons-material/Person";
import {
  useGetAdminCountQuery,
  useGetCountCustomersQuery,
  useGetUsersQuery,
} from "state/userApi";

// Dummy data for users
const dummyUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    roles: [{ name: "Admin" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    roles: [{ name: "User" }],
    accountLocked: true,
    enabled: false,
  },
  {
    id: 4,
    fullName: "Mohammed Al-Farsi",
    email: "mohammed.alfarsi@example.com",
    roles: [{ name: "Admin" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 5,
    fullName: "Fatima Zahra",
    email: "fatima.zahra@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 6,
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    roles: [{ name: "User" }],
    accountLocked: true,
    enabled: false,
  },
  {
    id: 7,
    fullName: "Robert Wilson",
    email: "robert.wilson@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 8,
    fullName: "Aisha Mohammed",
    email: "aisha.mohammed@example.com",
    roles: [{ name: "Admin" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 9,
    fullName: "Sarah Williams",
    email: "sarah.williams@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 10,
    fullName: "Omar Khaled",
    email: "omar.khaled@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 11,
    fullName: "Layla Ahmed",
    email: "layla.ahmed@example.com",
    roles: [{ name: "User" }],
    accountLocked: true,
    enabled: false,
  },
  {
    id: 12,
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 13,
    fullName: "Youssef Mahmoud",
    email: "youssef.mahmoud@example.com",
    roles: [{ name: "Admin" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 14,
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 15,
    fullName: "Khalid Abdullah",
    email: "khalid.abdullah@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 16,
    fullName: "Noor Ibrahim",
    email: "noor.ibrahim@example.com",
    roles: [{ name: "User" }],
    accountLocked: true,
    enabled: false,
  },
  {
    id: 17,
    fullName: "David Miller",
    email: "david.miller@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 18,
    fullName: "Mariam Ali",
    email: "mariam.ali@example.com",
    roles: [{ name: "Admin" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 19,
    fullName: "James Taylor",
    email: "james.taylor@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
  {
    id: 20,
    fullName: "Samir Nasr",
    email: "samir.nasr@example.com",
    roles: [{ name: "User" }],
    accountLocked: false,
    enabled: true,
  },
];

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "fullName", headerName: "Full Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "roles",
    headerName: "Role",
    flex: 1,
    valueGetter: (params) => params.row.roles[0]?.name,
  },
  { field: "accountLocked", headerName: "Account Locked", flex: 1 },
  { field: "enabled", headerName: "Enabled", flex: 1 },
];

const dummySalesData = {
  monthlyData: [
    { month: "Jan", totalSales: 187654321, totalUnits: 46 },
    { month: "Feb", totalSales: 134567890, totalUnits: 33 },
    { month: "Mar", totalSales: 245678901, totalUnits: 61 },
    { month: "Apr", totalSales: 156789012, totalUnits: 39 },
    { month: "May", totalSales: 223456789, totalUnits: 55 },
    { month: "Jun", totalSales: 198765432, totalUnits: 49 },
    { month: "Jul", totalSales: 211234567, totalUnits: 52 },
    { month: "Aug", totalSales: 176543210, totalUnits: 44 },
    { month: "Sep", totalSales: 231234568, totalUnits: 57 },
    { month: "Oct", totalSales: 143456789, totalUnits: 35 },
    { month: "Nov", totalSales: 256789013, totalUnits: 64 },
    { month: "Dec", totalSales: 207654321, totalUnits: 51 },
  ],
};
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
  const { data: bankCount, isLoading4 } = useGetBankCountQuery();
  const { data, isLoading } = useGetUserQuery();
  console.log("🚀 ~ Dashboard ~ data:", data);

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
          title="daily orders"
          value={`87654321  DT`}
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
            loading={isLoading}
            getRowId={(row) => row.id}
            rows={dummyUsers}
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
            User by Category
          </Typography>
          <BreakdownChart isDashboard={true} data={dummySalesData} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            this chart represent how mush user we have by role
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
