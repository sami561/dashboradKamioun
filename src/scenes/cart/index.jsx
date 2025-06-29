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

// Dummy cart data
const dummyCartItems = [
  {
    _id: 1,
    product_id: 101,
    product_name: "iPhone 15 Pro",
    product_image: "/images/iphone15.jpg",
    quantity: 2,
    unit_price: 4500.0,
    total_price: 9000.0,
    customer_id: 201,
    added_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
  },
  {
    _id: 2,
    product_id: 102,
    product_name: "Samsung Galaxy S24",
    product_image: "/images/samsung-s24.jpg",
    quantity: 1,
    unit_price: 3800.0,
    total_price: 3800.0,
    customer_id: 201,
    added_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-14T14:20:00Z",
  },
  {
    _id: 3,
    product_id: 103,
    product_name: "MacBook Air M2",
    product_image: "/images/macbook-air.jpg",
    quantity: 1,
    unit_price: 8500.0,
    total_price: 8500.0,
    customer_id: 202,
    added_at: "2024-01-16T11:45:00Z",
    updated_at: "2024-01-16T11:45:00Z",
  },
  {
    _id: 4,
    product_id: 104,
    product_name: "AirPods Pro",
    product_image: "/images/airpods-pro.jpg",
    quantity: 3,
    unit_price: 1200.0,
    total_price: 3600.0,
    customer_id: 203,
    added_at: "2024-01-13T16:30:00Z",
    updated_at: "2024-01-13T16:30:00Z",
  },
  {
    _id: 5,
    product_id: 105,
    product_name: "iPad Air",
    product_image: "/images/ipad-air.jpg",
    quantity: 1,
    unit_price: 3200.0,
    total_price: 3200.0,
    customer_id: 204,
    added_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:15:00Z",
  },
  {
    _id: 6,
    product_id: 106,
    product_name: "Apple Watch Series 9",
    product_image: "/images/apple-watch.jpg",
    quantity: 2,
    unit_price: 1800.0,
    total_price: 3600.0,
    customer_id: 205,
    added_at: "2024-01-18T13:20:00Z",
    updated_at: "2024-01-18T13:20:00Z",
  },
  {
    _id: 7,
    product_id: 107,
    product_name: "Sony WH-1000XM5",
    product_image: "/images/sony-headphones.jpg",
    quantity: 1,
    unit_price: 950.0,
    total_price: 950.0,
    customer_id: 206,
    added_at: "2024-01-12T08:45:00Z",
    updated_at: "2024-01-12T08:45:00Z",
  },
  {
    _id: 8,
    product_id: 108,
    product_name: "Dell XPS 13",
    product_image: "/images/dell-xps.jpg",
    quantity: 1,
    unit_price: 7200.0,
    total_price: 7200.0,
    customer_id: 207,
    added_at: "2024-01-19T15:10:00Z",
    updated_at: "2024-01-19T15:10:00Z",
  },
  {
    _id: 9,
    product_id: 109,
    product_name: "Nintendo Switch OLED",
    product_image: "/images/nintendo-switch.jpg",
    quantity: 1,
    unit_price: 1400.0,
    total_price: 1400.0,
    customer_id: 208,
    added_at: "2024-01-20T12:30:00Z",
    updated_at: "2024-01-20T12:30:00Z",
  },
  {
    _id: 10,
    product_id: 110,
    product_name: "GoPro Hero 11",
    product_image: "/images/gopro-hero.jpg",
    quantity: 1,
    unit_price: 2100.0,
    total_price: 2100.0,
    customer_id: 209,
    added_at: "2024-01-21T17:45:00Z",
    updated_at: "2024-01-21T17:45:00Z",
  },
];

const Cart = () => {
  const theme = useTheme();
  const { data: cartItems, isLoading, refetch } = useGetCartQuery();
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

  // Use dummy data if API data is not available
  const cartData =
    cartItems && cartItems.length > 0 ? cartItems : dummyCartItems;

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "product_id", headerName: "Product ID", flex: 0.8 },
    { field: "product_name", headerName: "Product Name", flex: 1.5 },
    {
      field: "product_image",
      headerName: "Product Image",
      flex: 1,
      renderCell: (params) => (
        <Box
          component="img"
          src={params.value || "/images/placeholder.jpg"}
          alt="Product"
          sx={{
            width: 50,
            height: 50,
            borderRadius: "8px",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />
      ),
    },
    { field: "quantity", headerName: "Quantity", flex: 0.8 },
    {
      field: "unit_price",
      headerName: "Unit Price (DT)",
      flex: 1,
      valueFormatter: (params) => `${params.value.toFixed(2)} DT`,
    },
    {
      field: "total_price",
      headerName: "Total Price (DT)",
      flex: 1,
      valueFormatter: (params) => `${params.value.toFixed(2)} DT`,
    },
    { field: "customer_id", headerName: "Customer ID", flex: 0.8 },
    {
      field: "added_at",
      headerName: "Added At",
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
          loading={isLoading || !cartData}
          getRowId={(row) => row._id}
          rows={cartData || []}
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
