import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { tokensDark } from "theme";
import { useGetOrdersQuery } from "state/ordersApi";
import { useState } from "react";

const columns = [
  { field: "_id", headerName: "Order ID", flex: 0.8 },
  {
    field: "state",
    headerName: "State",
    flex: 0.8,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor: "#2196f3",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor:
            params.value === "completed"
              ? "#4caf50"
              : params.value === "shipped"
              ? "#2196f3"
              : params.value === "processing"
              ? "#ff9800"
              : params.value === "pending"
              ? "#9e9e9e"
              : "#f44336",
          color: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {params.value}
      </Box>
    ),
  },
  {
    field: "total",
    headerName: "Total Amount (DT)",
    flex: 1,
    valueFormatter: (params) => `${params.value?.toFixed(2) || "0.00"} DT`,
  },
  {
    field: "discount_amount",
    headerName: "Discount (DT)",
    flex: 1,
    valueFormatter: (params) => `${params.value?.toFixed(2) || "0.00"} DT`,
  },
  { field: "customer_id", headerName: "Customer ID", flex: 0.8 },
  {
    field: "items",
    headerName: "Items Count",
    flex: 0.8,
    valueGetter: (params) => params.row.items?.length || 0,
  },
  {
    field: "delivery_date",
    headerName: "Delivery Date",
    flex: 1.2,
    valueFormatter: (params) =>
      params.value ? new Date(params.value).toLocaleDateString("en-GB") : "N/A",
  },
  {
    field: "lifecycle",
    headerName: "Lifecycle Events",
    flex: 0.8,
    valueGetter: (params) => params.row.lifecycle?.length || 0,
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 0.25,
    renderCell: (params) => (
      <IconButton onClick={() => console.log("'dle")}>
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    flex: 0.25,
    renderCell: (params) => (
      <IconButton onClick={() => console.log("'dle")}>
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const Orders = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleUpdateModal = (row) => {
    console.log("Update order:", row);
    // Add your update logic here
  };

  const handleDeleteModal = (rowId) => {
    console.log("Delete order:", rowId);
    // Add your delete logic here
  };

  // Handle API error
  if (error) {
    console.error("Error fetching orders data:", error);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Manage your orders" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => console.log("Add new order")}
        >
          Add New Order
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
          rows={orders || []}
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

export default Orders;
