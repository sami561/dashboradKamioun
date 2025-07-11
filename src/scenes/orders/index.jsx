import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, ViewList, ViewModule } from "@mui/icons-material";
import { tokensDark } from "theme";
import { useGetOrdersQuery } from "state/ordersApi";
import { useState } from "react";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import CardView from "./CardView";

const Orders = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "cards"

  const handleUpdateModal = (row) => {
    setSelectedOrder(row);
    setUpdateModalOpen(true);
  };

  const handleDeleteModal = (row) => {
    setSelectedOrder(row);
    setDeleteModalOpen(true);
  };

  // Define columns inside component to access handler functions
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
        params.value
          ? new Date(params.value).toLocaleDateString("en-GB")
          : "N/A",
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
        <IconButton onClick={() => handleDeleteModal(params.row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  // Handle API error
  if (error) {
    console.error("Error fetching orders data:", error);
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ORDERS" subtitle="Manage your orders" />
      <Box
        m="1rem"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="cards" aria-label="card view">
            <ViewModule />
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setAddModalOpen(true)}
        >
          Add New Order
        </Button>
      </Box>
      {viewMode === "grid" ? (
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
      ) : (
        <CardView />
      )}

      {/* Modals */}
      <AddModal
        open={addModalOpen}
        handleClose={() => setAddModalOpen(false)}
      />

      <UpdateModal
        open={updateModalOpen}
        handleClose={() => {
          setUpdateModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      <DeleteModal
        open={deleteModalOpen}
        handleClose={() => {
          setDeleteModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </Box>
  );
};

export default Orders;
