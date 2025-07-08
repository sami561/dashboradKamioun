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
import { useGetBrandsQuery } from "state/brandApi";

const Brand = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const { data, isLoading, refetch } = useGetBrandsQuery();

  const handleUpdateModal = (row) => {
    setSelectedRow(row);
    setOpenUpdate(true);
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
      headerName: "Brand Logo",
      flex: 0.25,
      renderCell: (params) => {
        const imageUrl = `http://34.173.189.86/api/kamarket${params.value}`;
        return (
          <Avatar
            src={imageUrl}
            alt="Brand Logo"
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
      field: "nameBrandAr",
      headerName: "name Brand arabic",
      flex: 0.5,
    },
    {
      field: "nameBrandFr",
      headerName: "name Brand french",
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
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteModal(params.row._id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Brands" subtitle="Entire list of brands" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add New Brand
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

export default Brand;
