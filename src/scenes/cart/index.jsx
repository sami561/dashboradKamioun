import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokensLight } from "theme";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { useGetCartQuery } from "state/cartApi";
import { useState } from "react";

const Cart = () => {
  const theme = useTheme();
  const { data: cartItems, isLoading, error, refetch } = useGetCartQuery();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleUpdateModal = (row) => {
    console.log("Update cart item:", row);
    // Add your update logic here
  };

  const handleDeleteModal = (rowId) => {
    console.log("Delete cart item:", rowId);
    // Add your delete logic here
  };

  // Handle API error
  if (error) {
    console.error("Error fetching cart data:", error);
  }

  const columns = [
    { field: "_id", headerName: "Cart ID", flex: 0.8 },
    {
      field: "user.firstName",
      headerName: "Customer First Name",
      flex: 1,
      valueGetter: (params) => params.row.user?.firstName || "N/A",
    },
    {
      field: "user.lastName",
      headerName: "Customer Last Name",
      flex: 1,
      valueGetter: (params) => params.row.user?.lastName || "N/A",
    },
    {
      field: "user.email",
      headerName: "Customer Email",
      flex: 1.5,
      valueGetter: (params) => params.row.user?.email || "N/A",
    },
    {
      field: "user.phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      valueGetter: (params) => params.row.user?.phoneNumber || "N/A",
    },
    {
      field: "user.city",
      headerName: "City",
      flex: 0.8,
      valueGetter: (params) => params.row.user?.city || "N/A",
    },
    {
      field: "items",
      headerName: "Items Count",
      flex: 0.8,
      valueGetter: (params) => params.row.items?.length || 0,
    },
    {
      field: "total",
      headerName: "Total (DT)",
      flex: 1,
      valueFormatter: (params) => `${params.value?.toFixed(2) || "0.00"} DT`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === "active" ? "#4caf50" : "#f44336",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1.2,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString("en-GB") : "",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1.2,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString("en-GB") : "",
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleUpdateModal(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteModal(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CART" subtitle="Manage your shopping cart" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => console.log("Add new cart item")}
        >
          Add New Item
        </Button>
      </Box>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            borderBottom: "none",
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={cartItems || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Cart;
