import React from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Lock, LockOpen, Visibility } from "@mui/icons-material";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { toast } from "react-toastify";
import { useGetVendorsQuery } from "state/userApi";
import ProfileView from "scenes/profile/ProfileView";

const Vendors = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetVendorsQuery();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
    setSelectedUser(null);
  };

  const handleProfileUpdate = (updatedUser) => {
    // Update the user in the local data
    refetch();
    setSelectedUser(updatedUser);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "profilePhoto",
      headerName: "Profile Photo",
      flex: 0.5,
      renderCell: (params) => {
        if (!params.value) return "No Photo";

        // Check if it's a local file path or URL
        if (params.value.startsWith("file://")) {
          return "Local File";
        }

        return (
          <img
            src={params.value}
            alt="Profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
        );
      },
    },
    {
      field: "active",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value ? "success.main" : "error.main",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
          }}
        >
          {params.value ? "Active" : "Inactive"}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="View Profile"
          onClick={() => handleViewProfile(params.row)}
        />,
      ],
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="VENDORS" subtitle="Managing vendors and list of vendors" />
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
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu,
          }}
        />
      </Box>

      {/* Profile View Dialog */}
      <ProfileView
        user={selectedUser}
        open={profileOpen}
        onClose={handleProfileClose}
        onUpdate={handleProfileUpdate}
      />
    </Box>
  );
};

export default Vendors;
