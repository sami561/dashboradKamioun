import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActions,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Campaign as CampaignIcon,
} from "@mui/icons-material";

const AdCard = ({ data }) => {
  const {
    title,
    description,
    category,
    targetAudience,
    budget,
    startDate,
    endDate,
    image,
    status = "active",
    views = 0,
    clicks = 0,
  } = data;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "completed":
        return "info";
      case "draft":
        return "default";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      electronics: "primary",
      fashion: "secondary",
      home: "success",
      automotive: "warning",
      health: "error",
      sports: "info",
      food: "default",
      other: "default",
    };
    return colors[category] || "default";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const formatBudget = (amount) => {
    return `${amount.toFixed(2)} DT`;
  };

  const handleEdit = () => {
    console.log("Edit ad:", data);
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log("Delete ad:", data);
    // Add your delete logic here
  };

  const handleView = () => {
    console.log("View ad details:", data);
    // Add your view logic here
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}

      {!image && (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey.100",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CampaignIcon
              sx={{
                fontSize: 48,
                color: "text.secondary",
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              No Image Available
            </Typography>
          </Box>
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
        >
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{ flex: 1, mr: 1 }}
          >
            {title}
          </Typography>
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>

        <Box display="flex" gap={1} mb={2} flexWrap="wrap">
          <Chip
            label={category}
            color={getCategoryColor(category)}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
          <Chip
            label={targetAudience}
            variant="outlined"
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" color="text.secondary">
            Budget:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {formatBudget(budget)}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="body2" color="text.secondary">
            Duration:
          </Typography>
          <Typography variant="body2">
            {formatDate(startDate)} - {formatDate(endDate)}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Views:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {views.toLocaleString()}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Clicks:
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {clicks.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <IconButton
          size="small"
          onClick={handleView}
          sx={{ color: "primary.main" }}
          title="View Details"
        >
          <ViewIcon />
        </IconButton>

        <IconButton
          size="small"
          onClick={handleEdit}
          sx={{ color: "warning.main" }}
          title="Edit Ad"
        >
          <EditIcon />
        </IconButton>

        <IconButton
          size="small"
          onClick={handleDelete}
          sx={{ color: "error.main" }}
          title="Delete Ad"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default AdCard;
