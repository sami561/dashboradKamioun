import React, { useState } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetBankQuery, useGetCreditTypeQuery } from "state/apiSpring";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add, Update } from "@mui/icons-material";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
const CreditType = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);
  const { data, isLoading, refetch } = useGetCreditTypeQuery();

  console.log(data);
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
      field: "id",
      headerName: "ID",
      flex: 0.25,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.25,
    },
    {
      field: "interestRate",
      headerName: "interest Rate",
      flex: 0.25,
    },
    {
      field: "maxAmount",
      headerName: "maxAmount",
      flex: 0.25,
    },

    {
      field: "minAmount",
      headerName: "min Amount",
      flex: 0.25,
    },

    {
      field: "description",
      headerName: "description",
      flex: 0.25,
      sortable: false,
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
        <IconButton onClick={() => handleDeleteModal(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="loan Types" subtitle="Entire list of loan Types" />
      <Box m="1rem" display="flex" justifyContent={"flex-end"}>
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={() => handleAddModal()}
        >
          add new loan type
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
          getRowId={(row) => row.id}
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

export default CreditType;
