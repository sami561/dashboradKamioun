import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "state/ordersApi";
import { useGetUserQuery } from "state/userApi";

const formSchema = z.object({
  customer_id: z.string().nonempty({ message: "Customer ID is required" }),
  total: z.string().nonempty({ message: "Total amount is required" }),
  discount_amount: z.string().optional(),
  delivery_date: z.string().nonempty({ message: "Delivery date is required" }),
  status: z.string().nonempty({ message: "Status is required" }),
  state: z.string().nonempty({ message: "State is required" }),
  items: z
    .array(
      z.object({
        product_id: z.string().nonempty({ message: "Product ID is required" }),
        quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
        price: z.number().min(0, { message: "Price must be non-negative" }),
      })
    )
    .min(1, { message: "At least one item is required" }),
});

const UpdateModal = ({ open, handleClose, order }) => {
  const [updateOrder] = useUpdateOrderMutation();
  const { data: users } = useGetUserQuery();
  const [items, setItems] = useState([
    { product_id: "", quantity: 1, price: 0 },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Watch for form changes to update items
  const watchedItems = watch("items");

  useEffect(() => {
    if (order) {
      // Pre-fill form with order data
      setValue("customer_id", order.customer_id || "");
      setValue("total", order.total?.toString() || "");
      setValue("discount_amount", order.discount_amount?.toString() || "");
      setValue(
        "delivery_date",
        order.delivery_date
          ? new Date(order.delivery_date).toISOString().split("T")[0]
          : ""
      );
      setValue("status", order.status || "");
      setValue("state", order.state || "");

      // Set items
      if (order.items && order.items.length > 0) {
        setItems(
          order.items.map((item) => ({
            product_id: item.product_id || "",
            quantity: item.quantity || 1,
            price: item.price || 0,
          }))
        );
        setValue("items", order.items);
      } else {
        setItems([{ product_id: "", quantity: 1, price: 0 }]);
        setValue("items", [{ product_id: "", quantity: 1, price: 0 }]);
      }
    }
  }, [order, setValue]);

  const addItem = () => {
    const newItems = [...items, { product_id: "", quantity: 1, price: 0 }];
    setItems(newItems);
    setValue("items", newItems);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      setValue("items", newItems);
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    setValue("items", newItems);
  };

  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        total: parseFloat(data.total),
        discount_amount: data.discount_amount
          ? parseFloat(data.discount_amount)
          : 0,
        items: items.filter((item) => item.product_id && item.quantity > 0),
        lifecycle: [
          ...(order.lifecycle || []),
          {
            event: "order_updated",
            timestamp: new Date().toISOString(),
            description: "Order updated",
          },
        ],
      };

      await updateOrder({ id: order._id, ...orderData }).unwrap();
      toast.success("Order updated successfully");
      handleClose();
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update order");
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
          width: 600,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          outline: "none",
          overflow: "auto",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseOutlined />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Order
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Order ID: {order._id}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Customer</InputLabel>
                <Select
                  {...register("customer_id")}
                  error={!!errors.customer_id}
                  label="Customer"
                  defaultValue={order.customer_id || ""}
                >
                  {users?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.firstName} {user.lastName} ({user.email})
                    </MenuItem>
                  ))}
                </Select>
                {errors.customer_id && (
                  <Typography color="error" variant="caption">
                    {errors.customer_id.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Amount (DT)"
                type="number"
                step="0.01"
                {...register("total")}
                error={!!errors.total}
                helperText={errors.total?.message}
                fullWidth
                margin="normal"
                defaultValue={order.total || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Amount (DT)"
                type="number"
                step="0.01"
                {...register("discount_amount")}
                error={!!errors.discount_amount}
                helperText={errors.discount_amount?.message}
                fullWidth
                margin="normal"
                defaultValue={order.discount_amount || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                type="date"
                {...register("delivery_date")}
                error={!!errors.delivery_date}
                helperText={errors.delivery_date?.message}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                defaultValue={
                  order.delivery_date
                    ? new Date(order.delivery_date).toISOString().split("T")[0]
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  {...register("status")}
                  error={!!errors.status}
                  label="Status"
                  defaultValue={order.status || ""}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="processing">Processing</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
                {errors.status && (
                  <Typography color="error" variant="caption">
                    {errors.status.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>State</InputLabel>
                <Select
                  {...register("state")}
                  error={!!errors.state}
                  label="State"
                  defaultValue={order.state || ""}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
                {errors.state && (
                  <Typography color="error" variant="caption">
                    {errors.state.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Order Items
              </Typography>
              {items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Product ID"
                        value={item.product_id}
                        onChange={(e) =>
                          updateItem(index, "product_id", e.target.value)
                        }
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Price (DT)"
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button variant="outlined" onClick={addItem} sx={{ mb: 2 }}>
                Add Item
              </Button>
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Order
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
