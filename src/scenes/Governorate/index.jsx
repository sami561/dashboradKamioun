import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";

import { useGetGovernorateQuery } from "state/apiSpring";
import { Add, Delete, Update } from "@mui/icons-material";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

const Governorate = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetGovernorateQuery();
  console.log(data);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const handelOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleOpen = (content) => {
    setModalContent(content);
    setSelectedRow(content);
    setOpen(true);
  };
  const handleOpenDelete = (content) => {
    setModalContent(content);
    setSelectedRowDelete(content);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    refetch();
    setOpenDelete(false);
  };
  const handleClose = () => {
    refetch();
    setOpen(false);
  };
  const handleCloseAdd = () => {
    refetch();
    setOpenAdd(false);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "nom",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpen(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleOpenDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Governorate" subtitle="List of Governorates" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => handelOpenAdd()}
        >
          add new Governorate
        </Button>
      </Box>
      <Box
        mt="40px"
        height="75vh"
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
          getRowId={(row) => row.id}
          rows={data || []}
          columns={columns}
        />
      </Box>
      <UpdateModal open={open} handleClose={handleClose} row={selectedRow} />
      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        row={selectedRowDelete}
      />
      <AddModal open={openAdd} handleClose={handleCloseAdd} />
    </Box>
  );
};

export default Governorate;
