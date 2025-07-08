import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateSupplierMutation } from "state/supplierApi";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().nonempty({ message: "Phone number is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  logo: z.any().optional(),
});

const UpdateModal = ({ open, handleClose, row }) => {
  const [updateSupplier] = useUpdateSupplierMutation();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (row) {
      reset({
        name: row.name,
        email: row.email,
        phone: row.phone,
        address: row.address,
      });
    }
  }, [row, reset]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("logo", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.logo) {
        formData.append("logo", data.logo);
      }

      await updateSupplier({ id: row._id, ...formData }).unwrap();
      toast.success("Supplier updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update supplier");
    }
  };

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
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseOutlined />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Supplier
        </Typography>
        {row ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {selectedImage ? "Change Logo" : "Upload Logo"}
                  </Button>
                </label>
                {selectedImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {selectedImage.name}
                  </Typography>
                )}
                {errors.logo && (
                  <Typography color="error">{errors.logo.message}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            No data available
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateModal;
