import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import httpClient from "utils/apiMethods";
import { toast } from "react-toastify";

// Define the validation schema
const formSchema = z.object({
  nom: z.string().nonempty({ message: "Name is required" }),
  code: z.string().nonempty({ message: "Code is required" }),
});

const AddModal = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await httpClient.post("api/v1/gouvernorat/add", {
        nom: data.nom,
        code: data.code,
      });
      toast.success("Governorate added successfully");
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.businessErrorDescription);
      toast.error(error.response?.data?.businessErrorDescription);
    }
    handleClose(); // Consider handling API response here
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
          Add Governorate
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register("nom")}
            error={!!errors.nom}
            helperText={errors.nom?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Code"
            {...register("code")}
            fullWidth
            margin="normal"
            error={!!errors.code}
            helperText={errors.code?.message}
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
      </Box>
    </Modal>
  );
};

export default AddModal;
