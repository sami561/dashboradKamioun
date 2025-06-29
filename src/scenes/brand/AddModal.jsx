import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateBrandMutation } from "state/brandApi";

const formSchema = z.object({
  nameBrandFr: z.string().nonempty({ message: "French name is required" }),
  nameBrandAr: z.string().nonempty({ message: "Arabic name is required" }),
  image: z.any().optional(),
});

const AddModal = ({ open, handleClose }) => {
  const [createBrand] = useCreateBrandMutation();
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("image", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nameBrandFr", data.nameBrandFr);
      formData.append("nameBrandAr", data.nameBrandAr);
      if (data.image) {
        formData.append("image", data.image);
      }

      await createBrand(formData).unwrap();
      toast.success("Brand added successfully");
      handleClose();
      reset();
      setSelectedImage(null);
    } catch (error) {
      toast.error(error.data?.message || "Failed to add brand");
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
          Add Brand
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="French Name"
            {...register("nameBrandFr")}
            error={!!errors.nameBrandFr}
            helperText={errors.nameBrandFr?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Arabic Name"
            {...register("nameBrandAr")}
            error={!!errors.nameBrandAr}
            helperText={errors.nameBrandAr?.message}
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
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
