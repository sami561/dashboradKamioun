import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Add, ViewList, ViewModule } from "@mui/icons-material";
import Header from "components/Header";
import OrderCard from "components/OrderCard";
import { useGetOrdersQuery } from "state/ordersApi";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

const CardView = () => {
  const theme = useTheme();
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdateModal = (order) => {
    setSelectedOrder(order);
    setUpdateModalOpen(true);
  };

  const handleDeleteModal = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

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
        <Typography variant="h5" fontWeight="medium">
          Orders Overview
        </Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setAddModalOpen(true)}
        >
          Add New Order
        </Button>
      </Box>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography>Loading orders...</Typography>
        </Box>
      ) : error ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography color="error">Error loading orders</Typography>
        </Box>
      ) : orders?.length > 0 ? (
        <Grid container spacing={3}>
          {orders.map((order, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order._id || index}>
              <OrderCard
                data={order}
                onEdit={handleUpdateModal}
                onDelete={handleDeleteModal}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="400px"
          textAlign="center"
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Create your first order to get started
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setAddModalOpen(true)}
          >
            Create First Order
          </Button>
        </Box>
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

export default CardView;
