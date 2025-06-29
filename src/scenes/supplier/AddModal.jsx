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
import { useCreateSupplierMutation } from "state/supplierApi";

const formSchema = z.object({
  company_nameAr: z
    .string()
    .nonempty({ message: "Arabic company name is required" }),
  company_nameFr: z
    .string()
    .nonempty({ message: "French company name is required" }),
  contact_name: z.string().optional(),
  phone_number: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  capital: z.string().optional(),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  tax_registration_number: z.string().optional(),
  address: z.string().optional(),
});

const AddModal = ({ open, handleClose }) => {
  const [createSupplier] = useCreateSupplierMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const supplierData = {
        company_nameAr: data.company_nameAr,
        company_nameFr: data.company_nameFr,
        contact_name: data.contact_name || undefined,
        phone_number: data.phone_number || undefined,
        postal_code: data.postal_code || undefined,
        city: data.city || undefined,
        country: data.country || undefined,
        capital: data.capital || undefined,
        email: data.email,
        tax_registration_number: data.tax_registration_number || undefined,
        address: data.address || undefined,
      };

      await createSupplier(supplierData).unwrap();
      toast.success("Supplier added successfully");
      handleClose();
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Failed to add supplier");
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
          Add Supplier
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Arabic Company Name"
            {...register("company_nameAr")}
            error={!!errors.company_nameAr}
            helperText={errors.company_nameAr?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="French Company Name"
            {...register("company_nameFr")}
            error={!!errors.company_nameFr}
            helperText={errors.company_nameFr?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Name"
            {...register("contact_name")}
            error={!!errors.contact_name}
            helperText={errors.contact_name?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            {...register("phone_number")}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            {...register("postal_code")}
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Country"
            {...register("country")}
            error={!!errors.country}
            helperText={errors.country?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Capital"
            {...register("capital")}
            error={!!errors.capital}
            helperText={errors.capital?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tax Registration Number"
            {...register("tax_registration_number")}
            error={!!errors.tax_registration_number}
            helperText={errors.tax_registration_number?.message}
            fullWidth
            margin="normal"
          />
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
