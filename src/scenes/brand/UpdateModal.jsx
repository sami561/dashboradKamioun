import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateBrandMutation } from "state/brandApi";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  logo: z.any().optional(),
});

const UpdateModal = ({ open, handleClose, row }) => {
  const [updateBrand] = useUpdateBrandMutation();
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
        description: row.description,
        website: row.website,
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
      formData.append("description", data.description);
      formData.append("website", data.website);
      if (data.logo) {
        formData.append("logo", data.logo);
      }

      await updateBrand({ id: row._id, ...formData }).unwrap();
      toast.success("Brand updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update brand");
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
          Update Brand
        </Typography>
        {row ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Website"
              {...register("website")}
              error={!!errors.website}
              helperText={errors.website?.message}
              fullWidth
              margin="normal"
            />
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
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
