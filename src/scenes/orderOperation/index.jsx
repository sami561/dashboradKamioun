import {
  Box,
  Typography,
  useTheme,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { ViewList, ViewModule } from "@mui/icons-material";
import { useGetOrdersQuery } from "state/ordersApi";
import { useState } from "react";
import CardView from "../orders/CardView";
import StateUpdateModal from "./StateUpdateModal";
import StatusUpdateModal from "./StatusUpdateModal";

const OrderOperation = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [stateModalOpen, setStateModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "cards"

  const handleStateUpdate = (row) => {
    setSelectedOrder(row);
    setStateModalOpen(true);
  };

  const handleStatusUpdate = (row) => {
    setSelectedOrder(row);
    setStatusModalOpen(true);
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
      field: "updateState",
      headerName: "Update State",
      flex: 0.3,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleStateUpdate(params.row)}
          sx={{ color: theme.palette.secondary[300] }}
        >
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            State
          </Typography>
        </IconButton>
      ),
    },
    {
      field: "updateStatus",
      headerName: "Update Status",
      flex: 0.3,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleStatusUpdate(params.row)}
          sx={{ color: theme.palette.secondary[300] }}
        >
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Status
          </Typography>
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
      <Header
        title="ORDER OPERATION"
        subtitle="Update order state and status"
      />
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
      <StateUpdateModal
        open={stateModalOpen}
        handleClose={() => {
          setStateModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      <StatusUpdateModal
        open={statusModalOpen}
        handleClose={() => {
          setStatusModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </Box>
  );
};

export default OrderOperation;
