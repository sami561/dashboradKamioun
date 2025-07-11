import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Card = ({ data, index }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "draft":
        return "error";
      case "completed":
        return "info";
      case "pending":
        return "default";
      default:
        return "default";
    }
  };

  const handleEdit = () => {
    // Navigate to edit screen - you can customize this path
    navigate(`/edit/${data._id || data.id}`);
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {data.description}
          </Typography>
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
        Edit {data.type || "item"}
      </Button>
    </Box>
  );
};

export default Card;
