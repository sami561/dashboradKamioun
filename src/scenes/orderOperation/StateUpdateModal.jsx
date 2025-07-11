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
import { useUpdateOrderStateMutation } from "state/ordersApi";
import { toast } from "react-toastify";

const StateUpdateModal = ({ open, handleClose, order }) => {
  const theme = useTheme();
  const [updateOrderState, { isLoading }] = useUpdateOrderStateMutation();
  const [state, setState] = useState(order?.state || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order || !state) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await updateOrderState({
        id: order._id,
        state: state,
      }).unwrap();

      toast.success("Order state updated successfully");
      handleClose();
    } catch (error) {
      toast.error(
        `Failed to update order state: ${
          error.data?.message || "Unknown error"
        }`
      );
    }
  };

  const handleCloseModal = () => {
    setState(order?.state || "");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
      <DialogTitle>Update Order State</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="body2" color="textSecondary">
              Order ID: {order?._id}
            </Typography>
          </Box>

          <FormControl fullWidth margin="normal">
            <InputLabel>State</InputLabel>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              label="State"
              required
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="returned">Returned</MenuItem>
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
            {isLoading ? "Updating..." : "Update State"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StateUpdateModal;
