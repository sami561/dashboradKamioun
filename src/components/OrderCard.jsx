import React from "react";
import { Box, Typography, Button, Chip, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const OrderCard = ({ data, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "shipped":
        return "info";
      case "processing":
        return "warning";
      case "pending":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStateColor = (state) => {
    switch (state) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "suspended":
        return "error";
      default:
        return "default";
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(data);
    } else {
      navigate(`/orders/edit/${data._id}`);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(data);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const formatCurrency = (amount) => {
    return `${amount?.toFixed(2) || "0.00"} DT`;
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        boxShadow: 1,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 3,
          borderColor: "primary.main",
        },
      }}
    >
      {/* Header with Order ID and Status */}
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight="semibold" gutterBottom>
            Order #{data._id?.slice(-8) || data.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {formatDate(data.createdAt)}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={1}
        >
          {data.status && (
            <Chip
              label={data.status}
              color={getStatusColor(data.status)}
              size="small"
            />
          )}
          {data.state && (
            <Chip
              label={data.state}
              color={getStateColor(data.state)}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </Box>

      {/* Order Details */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Customer ID
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {data.customer_id?.slice(-8) || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Items Count
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {data.items?.length || 0}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Total Amount
          </Typography>
          <Typography variant="body1" fontWeight="medium" color="primary.main">
            {formatCurrency(data.total)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            Discount
          </Typography>
          <Typography
            variant="body1"
            fontWeight="medium"
            color="text.secondary"
          >
            {formatCurrency(data.discount_amount)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            Delivery Date
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatDate(data.delivery_date)}
          </Typography>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box display="flex" gap={1}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          sx={{ flex: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ flex: 1 }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default OrderCard;
