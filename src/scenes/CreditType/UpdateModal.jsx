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
import httpClient from "utils/apiMethods";
import { toast } from "react-toastify";
const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  interestRate: z.string().nonempty({ message: "Interest Rate is required" }),
  maxAmount: z
    .number({ required_error: "Max Amount is required" })
    .nonnegative(),
  minAmount: z
    .number({ required_error: "Min Amount is required" })
    .nonnegative(),
  description: z.string().nonempty({ message: "Description is required" }),
});
const UpdateModal = ({ open, handleClose, row }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await httpClient.put("api/v1/credit-types/", {
        name: data.name,
        interestRate: data.interestRate,
        maxAmount: data.maxAmount,
        minAmount: data.minAmount,
        description: data.description,
      });
      toast.success("loan Type added successfully");
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.businessErrorDescription);
      toast.error(error.response?.data?.businessErrorDescription);
    }
    handleClose();
  };
  useEffect(() => {
    // Reset form with new row data when 'row' changes
    if (row) {
      reset(row);
    }
  }, [row, reset]);
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
          Add loan type
        </Typography>
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
            label="interest Rate"
            {...register("interestRate")}
            error={!!errors.interestRate}
            helperText={errors.interestRate?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Amount"
            type="number"
            {...register("maxAmount", { valueAsNumber: true })}
            error={!!errors.maxAmount}
            helperText={errors.maxAmount?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Min Amount"
            type="number"
            {...register("minAmount", { valueAsNumber: true })}
            error={!!errors.minAmount}
            helperText={errors.minAmount?.message}
            fullWidth
            margin="normal"
          />

          <TextField
            label="description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            multiline
            rows={10}
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
      </Box>
    </Modal>
  );
};

export default UpdateModal;
