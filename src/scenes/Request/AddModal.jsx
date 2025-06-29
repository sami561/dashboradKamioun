import React, { useEffect } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import { useGetGovernorateQuery } from "state/apiSpring";
import store from "state/store";

// Define the validation schema using zod
const formSchema = z.object({
  periode: z.string().nonempty({ message: "Periode is required" }),
  RequestDate: z.string().nonempty({ message: "Request Date is required" }),
  bankId: z.string().nonempty({ message: "Bank ID is required" }),
  userId: z.string().nonempty({ message: "User ID is required" }),
  creditTypeId: z.string().nonempty({ message: "Credit Type ID is required" }),
  file: z
    .any()
    .refine((files) => files.length === 1, { message: "File is required" }),
  quote: z.string().nonempty({ message: "Quote is required" }),
});

const AddModal = ({ open, handleClose }) => {
  const { data, isLoading, refetch } = useGetGovernorateQuery();
  console.log(data);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const formatDateTime = (date) => {
    const d = new Date(date);
    const pad = (num) => num.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
      d.getSeconds()
    )}.000+00:00`;
  };

  const onSubmit = async (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData);
    try {
      const formDataToSend = new FormData();
      console.log("🚀 ~ onSubmit ~ formDataToSend:", formDataToSend);
      formDataToSend.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              bankId: formData.bankId,
              creditTypeId: formData.creditTypeId,
              periode: formData.periode,
              RequestDate: formatDateTime(formData.RequestDate),
              userId: formData.userId,
              devis: formData.quote,
            }),
          ],
          { type: "application/json" }
        )
      );
      formDataToSend.append("file", formData.file[0]);
      console.log("🚀 ~ onSubmit ~ formDataToSend:", formDataToSend);
      const token = store.getState().auth.token;

      const response = await axios.post(
        `http://localhost:8088/api/v1/request/add`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Request added successfully!");
        handleClose();
        reset();
      }
    } catch (error) {
      toast.error("Failed to add request: " + error.message);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setValue("governorateId", data[0].id);
    }
  }, [data, setValue]);

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
          Add Loan Request
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="number"
            label="Periode"
            {...register("periode")}
            error={!!errors.periode}
            helperText={errors.periode?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            type="datetime-local"
            label="Request Date"
            {...register("RequestDate")}
            error={!!errors.RequestDate}
            helperText={errors.RequestDate?.message}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="number"
            label="Quote"
            {...register("quote")}
            error={!!errors.quote}
            helperText={errors.quote?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bank ID"
            {...register("bankId")}
            error={!!errors.bankId}
            helperText={errors.bankId?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User ID"
            {...register("userId")}
            error={!!errors.userId}
            helperText={errors.userId?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Credit Type ID"
            {...register("creditTypeId")}
            error={!!errors.creditTypeId}
            helperText={errors.creditTypeId?.message}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            {...register("file")}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload File
            </Button>
          </label>
          {errors.file && (
            <Typography color="error">{errors.file.message}</Typography>
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
