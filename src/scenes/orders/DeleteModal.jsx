import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteOrderMutation } from "state/ordersApi";

const DeleteModal = ({ open, handleClose, order }) => {
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async () => {
    try {
      await deleteOrder(order._id).unwrap();
      toast.success("Order deleted successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete order");
    }
  };

  if (!order) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          outline: "none",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={handleClose}
        >
          <CloseOutlined />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Order
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, mb: 2 }}
        >
          Order ID: {order._id}
        </Typography>
        <Typography sx={{ mt: 2, mb: 3 }}>
          Are you sure you want to delete this order? This action cannot be
          undone.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
