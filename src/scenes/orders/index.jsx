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

// Dummy orders data
const dummyOrders = [
  {
    _id: 1,
    state: "pending",
    status: "pending",
    base_grand_total: 1250.5,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    customer_id: 101,
    discount_amount: 50.0,
    store_id: 1,
    items: [
      { product_id: 1, quantity: 2, price: 600.0 },
      { product_id: 2, quantity: 1, price: 650.5 },
    ],
  },
  {
    _id: 2,
    state: "complete",
    status: "complete",
    base_grand_total: 890.25,
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-18T09:15:00Z",
    customer_id: 102,
    discount_amount: 25.0,
    store_id: 1,
    items: [{ product_id: 3, quantity: 1, price: 890.25 }],
  },
  {
    _id: 3,
    state: "processing",
    status: "processing",
    base_grand_total: 2100.75,
    created_at: "2024-01-16T11:45:00Z",
    updated_at: "2024-01-16T11:45:00Z",
    customer_id: 103,
    discount_amount: 100.0,
    store_id: 2,
    items: [
      { product_id: 4, quantity: 3, price: 700.25 },
      { product_id: 5, quantity: 2, price: 200.25 },
    ],
  },
  {
    _id: 4,
    state: "canceled",
    status: "canceled",
    base_grand_total: 675.0,
    created_at: "2024-01-13T16:30:00Z",
    updated_at: "2024-01-13T17:00:00Z",
    customer_id: 104,
    discount_amount: 0.0,
    store_id: 1,
    items: [{ product_id: 6, quantity: 1, price: 675.0 }],
  },
  {
    _id: 5,
    state: "complete",
    status: "shipped",
    base_grand_total: 1850.3,
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-25T14:30:00Z",
    customer_id: 105,
    discount_amount: 75.0,
    store_id: 2,
    items: [
      { product_id: 7, quantity: 2, price: 925.15 },
      { product_id: 8, quantity: 1, price: 1000.0 },
    ],
  },
  {
    _id: 6,
    state: "pending",
    status: "pending",
    base_grand_total: 950.8,
    created_at: "2024-01-18T13:20:00Z",
    updated_at: "2024-01-18T13:20:00Z",
    customer_id: 106,
    discount_amount: 30.0,
    store_id: 1,
    items: [{ product_id: 9, quantity: 1, price: 950.8 }],
  },
  {
    _id: 7,
    state: "complete",
    status: "delivered",
    base_grand_total: 3200.45,
    created_at: "2024-01-12T08:45:00Z",
    updated_at: "2024-01-16T11:20:00Z",
    customer_id: 107,
    discount_amount: 150.0,
    store_id: 2,
    items: [
      { product_id: 10, quantity: 4, price: 800.11 },
      { product_id: 11, quantity: 2, price: 50.0 },
    ],
  },
  {
    _id: 8,
    state: "processing",
    status: "processing",
    base_grand_total: 750.2,
    created_at: "2024-01-19T15:10:00Z",
    updated_at: "2024-01-19T15:10:00Z",
    customer_id: 108,
    discount_amount: 20.0,
    store_id: 1,
    items: [{ product_id: 12, quantity: 3, price: 250.07 }],
  },
  {
    _id: 9,
    state: "complete",
    status: "shipped",
    base_grand_total: 1450.9,
    created_at: "2024-01-20T12:30:00Z",
    updated_at: "2024-01-28T10:15:00Z",
    customer_id: 109,
    discount_amount: 60.0,
    store_id: 2,
    items: [{ product_id: 13, quantity: 2, price: 725.45 }],
  },
  {
    _id: 10,
    state: "pending",
    status: "pending",
    base_grand_total: 890.6,
    created_at: "2024-01-21T17:45:00Z",
    updated_at: "2024-01-21T17:45:00Z",
    customer_id: 110,
    discount_amount: 40.0,
    store_id: 1,
    items: [{ product_id: 14, quantity: 1, price: 890.6 }],
  },
];

const columns = [
  { field: "_id", headerName: "ID", flex: 0.5 },

  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor:
            params.value === "delivered"
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
    field: "base_grand_total",
    headerName: "Total Amount (DT)",
    flex: 1,
    valueFormatter: (params) => `${params.value.toFixed(2)} DT`,
  },
  {
    field: "discount_amount",
    headerName: "Discount (DT)",
    flex: 1,
    valueFormatter: (params) => `${params.value.toFixed(2)} DT`,
  },
  { field: "customer_id", headerName: "Customer ID", flex: 0.8 },
  { field: "store_id", headerName: "Store ID", flex: 0.5 },
  {
    field: "items",
    headerName: "Items Count",
    flex: 0.8,
    valueGetter: (params) => params.row.items?.length || 0,
  },
  {
    field: "created_at",
    headerName: "Created At",
    flex: 1.2,
    valueFormatter: (params) =>
      new Date(params.value).toLocaleDateString("en-GB"),
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    flex: 1.2,
    valueFormatter: (params) =>
      new Date(params.value).toLocaleDateString("en-GB"),
  },
  {
    field: "edit",
    headerName: "Edit",
    flex: 0.25,
    renderCell: (params) => (
      <IconButton onClick={() => console.log(params.row)}>
        <EditIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    flex: 0.25,
    renderCell: (params) => (
      <IconButton onClick={() => console.log(params.row.id)}>
        <DeleteIcon />
      </IconButton>
    ),
  },
];

const Orders = () => {
  const theme = useTheme();
  const { data: orders, isLoading, refetch } = useGetOrdersQuery();
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

  // Use dummy data if API data is not available
  const ordersData = orders && orders.length > 0 ? orders : dummyOrders;

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
          loading={isLoading || !ordersData}
          getRowId={(row) => row._id}
          rows={ordersData || []}
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
