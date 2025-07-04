import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateProductMutation } from "state/productApi";
import { useGetCategoryQuery } from "state/categoryApi";
import { useGetBrandsQuery } from "state/brandApi";
import { useGetSuppliersQuery } from "state/supplierApi";

const formSchema = z.object({
  sku: z.string().nonempty({ message: "SKU is required" }),
  name: z.string().nonempty({ message: "Name is required" }),
  price: z.string().nonempty({ message: "Price is required" }),
  cost: z.string().optional(),
  special_price: z.string().optional(),
  manufacturer: z.string().optional(),
  brand: z.string().optional(),
  supplier: z.string().optional(),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" }),
  website_ids: z.string().optional(),
  pcb: z.string().optional(),
  image: z.any().optional(),
});

const UpdateModal = ({ open, handleClose, row }) => {
  const [updateProduct] = useUpdateProductMutation();
  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandsQuery();
  const { data: suppliers } = useGetSuppliersQuery();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (row) {
      reset({
        sku: row.sku,
        name: row.name,
        price: row.price.toString(),
        cost: row.cost?.toString() || "",
        special_price: row.special_price?.toString() || "",
        manufacturer: row.manufacturer || "",
        brand: row.brand?._id || "",
        supplier: row.supplier?._id || "",
        website_ids: row.website_ids?.join(",") || "",
        pcb: row.pcb?.toString() || "",
      });
      setSelectedCategories(row.categories?.map((cat) => cat._id) || []);
    }
  }, [row, reset]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("image", file);
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(value);
    setValue("categories", value);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("sku", data.sku);
      formData.append("name", data.name);
      formData.append("price", data.price);
      if (data.cost) formData.append("cost", data.cost);
      if (data.special_price)
        formData.append("special_price", data.special_price);
      if (data.manufacturer) formData.append("manufacturer", data.manufacturer);
      if (data.brand) formData.append("brand", data.brand);
      if (data.supplier) formData.append("supplier", data.supplier);
      data.categories.forEach((category) =>
        formData.append("categories", category)
      );
      if (data.website_ids) formData.append("website_ids", data.website_ids);
      if (data.pcb) formData.append("pcb", data.pcb);
      if (data.image) formData.append("image", data.image);

      await updateProduct({ id: row._id, ...formData }).unwrap();
      toast.success("Product updated successfully");
      handleClose();
    } catch (error) {
      toast.error(error.data?.message || "Failed to update product");
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
          Update Product
        </Typography>
        {row ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="SKU"
              {...register("sku")}
              error={!!errors.sku}
              helperText={errors.sku?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              {...register("price")}
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Cost"
              type="number"
              {...register("cost")}
              error={!!errors.cost}
              helperText={errors.cost?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Special Price"
              type="number"
              {...register("special_price")}
              error={!!errors.special_price}
              helperText={errors.special_price?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Manufacturer"
              {...register("manufacturer")}
              error={!!errors.manufacturer}
              helperText={errors.manufacturer?.message}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Brand</InputLabel>
              <Select
                {...register("brand")}
                label="Brand"
                error={!!errors.brand}
              >
                {brands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Supplier</InputLabel>
              <Select
                {...register("supplier")}
                label="Supplier"
                error={!!errors.supplier}
              >
                {suppliers?.map((supplier) => (
                  <MenuItem key={supplier._id} value={supplier._id}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.categories}>
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                label="Categories"
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          categories?.find((cat) => cat._id === value)
                            ?.nameCategoryFr
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {categories?.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.nameCategoryFr}
                  </MenuItem>
                ))}
              </Select>
              {errors.categories && (
                <Typography color="error" variant="caption">
                  {errors.categories.message}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="Website IDs"
              {...register("website_ids")}
              error={!!errors.website_ids}
              helperText={errors.website_ids?.message}
              fullWidth
              margin="normal"
              placeholder="Comma-separated IDs"
            />
            <TextField
              label="PCB"
              type="number"
              {...register("pcb")}
              error={!!errors.pcb}
              helperText={errors.pcb?.message}
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
