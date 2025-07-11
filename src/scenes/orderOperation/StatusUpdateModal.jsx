import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useUpdateOrderStatusMutation } from "state/ordersApi";
import { toast } from "react-toastify";

const StatusUpdateModal = ({ open, handleClose, order }) => {
  const theme = useTheme();
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const [status, setStatus] = useState(order?.status || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order || !status) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await updateOrderStatus({
        id: order._id,
        status: status,
      }).unwrap();

      toast.success("Order status updated successfully");
      handleClose();
    } catch (error) {
      toast.error(
        `Failed to update order status: ${
          error.data?.message || "Unknown error"
        }`
      );
    }
  };

  const handleCloseModal = () => {
    setStatus(order?.status || "");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>Update Order Status</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body2" color="textSecondary">
              Order ID: {order?._id}
            </Typography>
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
              required
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: theme.palette.secondary[300],
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: theme.palette.secondary[200],
              },
            }}
          >
            {isLoading ? "Updating..." : "Update Status"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StatusUpdateModal;
