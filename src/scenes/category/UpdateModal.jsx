import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "state/categoryApi";

const formSchema = z.object({
  nameCategoryFr: z.string().nonempty({ message: "French name is required" }),
  nameCategoryAr: z.string().nonempty({ message: "Arabic name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
});

const UpdateModal = ({ open, handleClose, row }) => {
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (row) {
      reset({
        nameCategoryFr: row.nameCategoryFr,
        nameCategoryAr: row.nameCategoryAr,
        description: row.Description,
      });
    }
  }, [row, reset]);

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: row._id, ...data }).unwrap();
      toast.success("Category updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update category");
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
          Update Category
        </Typography>
        {row ? (
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
