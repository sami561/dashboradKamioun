import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import { useGetCategoryQuery } from "state/categoryApi";
import axios from "axios";

const Category = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const { data, isLoading, refetch } = useGetCategoryQuery();

  const handleAddModal = () => {
    setOpenAdd(true);
  };

  const handleUpdateModal = (row) => {
    setSelectedRow(row);
    setOpenUpdate(true);
  };

  const handleCloseAdd = () => {
    refetch();
    setOpenAdd(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    refetch();
  };

  const handleDeleteModal = (row) => {
    setSelectedRowDelete(row);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    refetch();
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 0.25,
      renderCell: (params) => {
        const imageUrl = `http://http://34.173.189.86/api/kamarket${params.value}`;
        return (
          <Avatar
            src={imageUrl}
            alt="Category Image"
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
      field: "nameCategoryAr",
      headerName: "nameCategoryAr",
      flex: 0.5,
    },
    {
      field: "nameCategoryFr",
      headerName: "nameCategoryFr",
      flex: 0.5,
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 1,
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
      renderCell: (params) => {
        return (
          <IconButton onClick={() => handleDeleteModal(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Categories" subtitle="Entire list of categories" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={handleAddModal}
        >
          Add New Category
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
      <UpdateModal
        open={openUpdate}
        handleClose={handleCloseUpdate}
        row={selectedRow}
      />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        row={selectedRowDelete}
      />
    </Box>
  );
};

export default Category;
