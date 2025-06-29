import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useDeleteProductMutation } from "state/productApi";

const DeleteModal = ({ open, handleClose, row }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      await deleteProduct(row).unwrap();
      toast.success("Product deleted successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete product");
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
          Delete Product
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete this product? This action cannot be
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
