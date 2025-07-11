import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
  Chip,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  Edit,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileUpdate from "./ProfileUpdate";
import Header from "components/Header";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  console.log("🚀 ~ Profile ~ user:", user)

  const handleUpdateClick = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);
  const handleUpdateSuccess = () => {
    setUpdateOpen(false);
    window.location.reload();
  };

  if (!user) {
    return (
      <Box m="1.5rem 2.5rem">
        <Header title="Profile" subtitle="User profile information" />
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          No user data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mr: 2, color: theme.palette.secondary[300] }}
        >
          <ArrowBack />
        </IconButton>
        <Header title="Profile" subtitle="User profile information" />
        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={handleUpdateClick}
            sx={{
              backgroundColor: theme.palette.secondary[300],
              color: theme.palette.background.alt,
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.75rem",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={user.profilePhoto}
                sx={{
                  width: 200,
                  height: 200,
                  border: `4px solid ${theme.palette.secondary[300]}`,
                  fontSize: "4rem",
                }}
              >
                {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
              </Avatar>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.secondary[100],
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Chip
                  label={user.active ? "Active" : "Inactive"}
                  color={user.active ? "success" : "error"}
                  sx={{ fontWeight: "bold", fontSize: "1rem", px: 2, py: 1 }}
                />
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.75rem",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: theme.palette.secondary[100],
                  mb: 3,
                  fontWeight: "bold",
                }}
              >
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Person
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        Full Name
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary[100],
                          fontWeight: "bold",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Email
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        Email
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary[100],
                          fontWeight: "bold",
                        }}
                      >
                        {user.email || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Phone
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary[100],
                          fontWeight: "bold",
                        }}
                      >
                        {user.phoneNumber || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Business
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        Account Type
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary[100],
                          fontWeight: "bold",
                        }}
                      >
                        {user.account?.accountType || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                      borderRadius: "0.5rem",
                    }}
                  >
                    <LocationOn
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "2rem",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        Address
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.secondary[100],
                          fontWeight: "bold",
                        }}
                      >
                        {user.address || "Not provided"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {user.city && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        backgroundColor: theme.palette.background.default,
                        borderRadius: "0.5rem",
                      }}
                    >
                      <LocationOn
                        sx={{
                          color: theme.palette.secondary[300],
                          fontSize: "2rem",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.secondary[200] }}
                        >
                          City
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.palette.secondary[100],
                            fontWeight: "bold",
                          }}
                        >
                          {user.city}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <ProfileUpdate
        user={user}
        open={updateOpen}
        onClose={handleUpdateClose}
        onSuccess={handleUpdateSuccess}
      />
    </Box>
  );
};

export default Profile;
