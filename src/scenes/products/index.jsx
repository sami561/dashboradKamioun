import React, { useState } from "react";
import { Box, IconButton, useTheme, Avatar, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useGetProductsQuery } from "state/productApi";

const Products = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setUpdateAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const { data, isLoading, refetch } = useGetProductsQuery();

  const handleUpdateModal = (row) => {
    setSelectedRow(row);
    setUpdateAdd(true);
  };

  const handleDeleteModal = (row) => {
    setSelectedRowDelete(row);
    setOpenDelete(true);
  };

  const handleCloseAdd = () => {
    refetch();
    setOpenAdd(false);
  };

  const handleCloseDelete = () => {
    refetch();
    setOpenDelete(false);
  };

  const columns = [
    {
      field: "image",
      headerName: "Product Image",
      flex: 0.25,
      renderCell: (params) => {
        const imageUrl = `http://http://34.173.189.86/api/kamarket${params.value[0]}`;
        return (
          <Avatar
            src={imageUrl}
            alt="Product Image"
            sx={{ width: 40, height: 40, borderRadius: "10px" }}
            onError={(e) => {
              e.target.src = "";
              e.target.alt = "Image not available";
            }}
          />
        );
      },
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 0.25,
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.25,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.25,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 0.25,
      renderCell: (params) =>
        params.value ? `$${params.value.toFixed(2)}` : "-",
    },
    {
      field: "special_price",
      headerName: "Special Price",
      flex: 0.25,
      renderCell: (params) =>
        params.value ? `$${params.value.toFixed(2)}` : "-",
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      flex: 0.5,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 0.5,
      renderCell: (params) => params.value?.name || "-",
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 0.5,
      renderCell: (params) => params.value?.name || "-",
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 0.5,
      renderCell: (params) =>
        params.value?.map((cat) => cat.nameCategoryFr).join(", ") || "-",
    },
    {
      field: "website_ids",
      headerName: "Website IDs",
      flex: 0.5,
      renderCell: (params) => params.value?.join(", ") || "-",
    },
    {
      field: "related_products",
      headerName: "Related Products",
      flex: 0.5,
      renderCell: (params) =>
        params.value?.map((product) => product.name).join(", ") || "-",
    },
    {
      field: "pcb",
      headerName: "PCB",
      flex: 0.25,
      renderCell: (params) => params.value || "-",
    },
    {
      field: "stock_item",
      headerName: "Stock",
      flex: 0.5,
      renderCell: (params) => {
        const stock = params.value;
        return stock
          ? `${stock.qty} (${stock.is_in_stock ? "In Stock" : "Out of Stock"})`
          : "-";
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleUpdateModal(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteModal(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="Entire list of products" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add New Product
        </Button>
      </Box>
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        row={selectedRowDelete}
      />
      <UpdateModal
        open={openUpdate}
        handleClose={handleUpdateModal}
        row={selectedRow}
      />
    </Box>
  );
};

export default Products;
