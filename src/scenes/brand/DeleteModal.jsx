import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteBrandMutation } from "state/brandApi";

const DeleteModal = ({ open, handleClose, row }) => {
  const [deleteBrand] = useDeleteBrandMutation();

  const handleDelete = async () => {
    try {
      await deleteBrand(row).unwrap();
      toast.success("Brand deleted successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete brand");
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
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={handleClose}
        >
          <CloseOutlined />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Brand
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete this brand? This action cannot be
          undone.
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
