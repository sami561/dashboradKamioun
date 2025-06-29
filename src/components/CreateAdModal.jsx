import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";

const CreateAdModal = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetAudience: "",
    budget: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.targetAudience) {
      newErrors.targetAudience = "Target audience is required";
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "Valid budget is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate >= formData.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Creating ad with data:", formData);

      // Reset form and close modal
      setFormData({
        title: "",
        description: "",
        category: "",
        targetAudience: "",
        budget: "",
        startDate: "",
        endDate: "",
        image: null,
      });
      setErrors({});
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      targetAudience: "",
      budget: "",
      startDate: "",
      endDate: "",
      image: null,
    });
    setErrors({});
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create New Advertisement</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Advertisement Title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.category} required>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                label="Category"
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home & Garden</MenuItem>
                <MenuItem value="automotive">Automotive</MenuItem>
                <MenuItem value="health">Health & Beauty</MenuItem>
                <MenuItem value="sports">Sports & Leisure</MenuItem>
                <MenuItem value="food">Food & Beverage</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {errors.category && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.category}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.targetAudience} required>
              <InputLabel>Target Audience</InputLabel>
              <Select
                value={formData.targetAudience}
                onChange={(e) =>
                  handleInputChange("targetAudience", e.target.value)
                }
                label="Target Audience"
              >
                <MenuItem value="all">All Ages</MenuItem>
                <MenuItem value="youth">Youth (18-25)</MenuItem>
                <MenuItem value="adults">Adults (26-45)</MenuItem>
                <MenuItem value="seniors">Seniors (45+)</MenuItem>
                <MenuItem value="families">Families</MenuItem>
                <MenuItem value="professionals">Professionals</MenuItem>
              </Select>
            </FormControl>
            {errors.targetAudience && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.targetAudience}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Budget (DT)"
              type="number"
              value={formData.budget}
              onChange={(e) =>
                handleInputChange("budget", parseFloat(e.target.value))
              }
              error={!!errors.budget}
              helperText={errors.budget}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  fullWidth
                >
                  Upload Image
                </Button>
              </label>
              {formData.image && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected: {formData.image.name}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              error={!!errors.startDate}
              helperText={errors.startDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              error={!!errors.endDate}
              helperText={errors.endDate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Advertisement
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAdModal;
