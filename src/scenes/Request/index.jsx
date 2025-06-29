import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, Button, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridCheckCircleIcon } from "@mui/x-data-grid";
import Header from "components/Header";
import CloseIcon from "@mui/icons-material/Close";
import { useGetRequestQuery } from "state/apiSpring";
import { Add } from "@mui/icons-material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { toast } from "react-toastify";
import httpClient from "utils/apiMethods";
import AddModal from "./AddModal";

const Request = () => {
  const theme = useTheme();

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useGetRequestQuery();

  const handelOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    refetch();
    setOpenAdd(false);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  const handleApprove = async (row) => {
    try {
      const response = await httpClient.put(`api/v1/request/approve/${row.id}`);
      toast.success("Row updated");
      refetch();
    } catch (error) {
      toast.error("Error approving request");
    }
  };

  const handleReject = async (row) => {
    try {
      const response = await httpClient.put(`api/v1/request/decline/${row.id}`);
      toast.success("Row updated");
      refetch();
    } catch (error) {
      toast.error("Error declining request");
    }
  };

  const columns = [
    {
      field: "file",
      headerName: "Request file",
      flex: 0.25,
      renderCell: (params) => {
        const newPath = params.value.replace("../frontend/public/", "/");
        return (
          <Avatar
            src={newPath}
            alt="Request File"
            sx={{ width: 40, height: 40, borderRadius: "10px" }}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      flex: 0.25,
    },
    {
      field: "periode",
      headerName: "Period",
      flex: 0.25,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.25,
      sortable: false,
    },
    {
      field: "creditType.name",
      headerName: "Credit Type",
      flex: 0.25,
      valueGetter: (params) => params.row.creditType?.name || "N/A",
    },
    {
      field: "user.fullName",
      headerName: "User Names",
      flex: 0.5,
      sortable: false,
      valueGetter: (params) => params.row.user?.fullName || "N/A",
    },
    {
      field: "bank.nom",
      headerName: "Bank Name",
      flex: 0.5,
      sortable: false,
      valueGetter: (params) => params.row.bank?.nom || "N/A",
    },
    {
      field: "devis",
      headerName: "Quote",
      flex: 0.5,
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around">
          <IconButton
            onClick={() => handleApprove(params.row)}
            color="primary"
            aria-label="approve"
          >
            <GridCheckCircleIcon />
          </IconButton>
          <IconButton
            onClick={() => handleReject(params.row)}
            color="error"
            aria-label="reject"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Request" subtitle="Entire list of Requests" />
      <Box m="1rem" display="flex" justifyContent="flex-end">
        <Button
          startIcon={<Add />}
          variant="contained"
          color="primary"
          onClick={handelOpenAdd}
        >
          Add new Request
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
    </Box>
  );
};

export default Request;
