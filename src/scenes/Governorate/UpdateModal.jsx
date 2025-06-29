import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import httpClient from "utils/apiMethods";
import { toast } from "react-toastify";

const UpdateModal = ({ open, handleClose, row }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Reset form with new row data when 'row' changes
    if (row) {
      reset(row);
    }
  }, [row, reset]);

  const onSubmit = async (data) => {
    console.log("Updated Values:", data);
    try {
      const response = await httpClient.put("api/v1/gouvernorat/update", {
        id: data.id,
        nom: data.nom,
        code: data.code,
      });
      toast.success("Row updated");
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.businessErrorDescription);
      toast.error(error.response?.data?.businessErrorDescription);
    }
    handleClose();
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
          Update Row
        </Typography>
        {row ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="ID"
              name="id"
              {...register("id")}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Name"
              name="nom"
              {...register("nom", { required: "Name is required" })}
              error={!!errors.nom}
              helperText={errors.nom?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Code"
              name="code"
              {...register("code")}
              fullWidth
              margin="normal"
            />
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
