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
import { useCreateCategoryMutation } from "state/categoryApi";

const formSchema = z.object({
  nameCategoryFr: z.string().nonempty({ message: "French name is required" }),
  nameCategoryAr: z.string().nonempty({ message: "Arabic name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image: z.any().optional(),
});

const AddModal = ({ open, handleClose }) => {
  const [createCategory] = useCreateCategoryMutation();
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
      formData.append("nameCategoryFr", data.nameCategoryFr);
      formData.append("nameCategoryAr", data.nameCategoryAr);
      formData.append("Description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      await createCategory(formData).unwrap();
      toast.success("Category added successfully");
      handleClose();
      reset();
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error.data?.businessErrorDescription || "Failed to add category"
      );
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
          Add Category
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name (French)"
            {...register("nameCategoryFr")}
            error={!!errors.nameCategoryFr}
            helperText={errors.nameCategoryFr?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name (Arabic)"
            {...register("nameCategoryAr")}
            error={!!errors.nameCategoryAr}
            helperText={errors.nameCategoryAr?.message}
            fullWidth
            margin="normal"
            dir="rtl"
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
              {selectedImage ? "Change Image" : "Upload Image"}
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
