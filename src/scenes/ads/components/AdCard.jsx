import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdCard = ({ data, index }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "draft":
        return "error";
      case "paused":
        return "warning";
      case "completed":
        return "info";
      default:
        return "default";
    }
  };

  const handleEdit = () => {
    navigate(`/ads/edit/${data._id || data.id}`);
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
      key={data.id || data._id}
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
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box flex={1}>
          <Typography variant="h6" fontWeight="semibold" gutterBottom>
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {data.timestamp || data.createdAt || "No date"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 2 }}
          >
            {data.description}
          </Typography>

          {/* Additional ad details */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Category:</strong> {data.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Target Audience:</strong> {data.targetAudience}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Budget:</strong> {formatCurrency(data.budget)}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Duration:</strong> {formatDate(data.startDate)} -{" "}
              {formatDate(data.endDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Views:</strong> {data.views?.toLocaleString() || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Clicks:</strong> {data.clicks?.toLocaleString() || 0}
            </Typography>
          </Box>
        </Box>
        {data.status && (
          <Chip
            label={data.status}
            color={getStatusColor(data.status)}
            size="small"
            sx={{ ml: 1 }}
          />
        )}
      </Box>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleEdit}
        sx={{
          mt: 2,
          bgcolor: "grey.100",
          color: "text.primary",
          "&:hover": {
            bgcolor: "grey.200",
          },
        }}
      >
        Edit Ad
      </Button>
    </Box>
  );
};

export default AdCard;
