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
import { Close as CloseIcon } from "@mui/icons-material";
import { useCreateScreenMutation } from "../state/adsApi";

const statusOptions = ["active", "draft", "archived"];

const CreateAdModal = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "draft",
    position: "",
    ad: [],
  });
  const [errors, setErrors] = useState({});
  const [createScreen, { isLoading }] = useCreateScreenMutation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (formData.position && isNaN(Number(formData.position)))
      newErrors.position = "Position must be a number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      await createScreen({
        ...formData,
        position: formData.position ? Number(formData.position) : undefined,
      }).unwrap();
      setFormData({
        title: "",
        description: "",
        status: "draft",
        position: "",
        ad: [],
      });
      setErrors({});
      setShowModal(false);
    } catch (err) {
      setErrors({ submit: err?.data?.message || "Failed to create ad" });
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      status: "draft",
      position: "",
      ad: [],
    });
    setErrors({});
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create New Screen</Typography>
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
              label="Title"
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
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.status} required>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.status && (
              <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                {errors.status}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              error={!!errors.position}
              helperText={errors.position}
              type="number"
            />
          </Grid>
        </Grid>
        {errors.submit && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.submit}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAdModal;
