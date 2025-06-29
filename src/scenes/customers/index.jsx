import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetUsersQuery } from "state/userApi";
import { Lock, LockOpen } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetUsersQuery();
  console.log("data", data);

  const handleToggleStatus = async (id, active) => {
    try {
      console.log("ffff");
    } catch (error) {
      console.log("ffff");
    }
  };
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
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
        return params.value
          ? params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
          : "";
      },
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.5,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 0.5,
      valueGetter: (params) => (params.row.active ? "Active" : "Inactive"),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<LockOpen />}
          label="Activate Account"
          onClick={() => handleToggleStatus(params.id, true)}
          disabled={params.row.active}
        />,
        <GridActionsCellItem
          icon={<Lock />}
          label="Deactivate Account"
          onClick={() => handleToggleStatus(params.id, false)}
          disabled={!params.row.active}
        />,
      ],
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
