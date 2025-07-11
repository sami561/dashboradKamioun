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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Business,
  Edit,
} from "@mui/icons-material";
import ProfileUpdate from "./ProfileUpdate";

const ProfileView = ({ user, open, onClose, onUpdate }) => {
  const theme = useTheme();
  const [updateOpen, setUpdateOpen] = React.useState(false);

  const handleUpdateClick = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleUpdateSuccess = (updatedUser) => {
    setUpdateOpen(false);
    onUpdate(updatedUser);
  };

  if (!user) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.75rem",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: theme.palette.secondary[100],
          }}
        >
          <Typography variant="h5">User Profile</Typography>
          <IconButton
            onClick={handleUpdateClick}
            sx={{ color: theme.palette.secondary[300] }}
          >
            <Edit />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={3}>
              {/* Profile Photo */}
              <Grid item xs={12} md={4}>
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
                      width: 150,
                      height: 150,
                      border: `3px solid ${theme.palette.secondary[300]}`,
                    }}
                  >
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </Avatar>
                  <Chip
                    label={user.active ? "Active" : "Inactive"}
                    color={user.active ? "success" : "error"}
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Grid>

              {/* User Information */}
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "0.75rem",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      Personal Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Person
                            sx={{ color: theme.palette.secondary[300] }}
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
                              sx={{ color: theme.palette.secondary[100] }}
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
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Email sx={{ color: theme.palette.secondary[300] }} />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.secondary[200] }}
                            >
                              Email
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.secondary[100] }}
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
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Phone sx={{ color: theme.palette.secondary[300] }} />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.secondary[200] }}
                            >
                              Phone Number
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.secondary[100] }}
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
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <Business
                            sx={{ color: theme.palette.secondary[300] }}
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
                              sx={{ color: theme.palette.secondary[100] }}
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
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <LocationOn
                            sx={{ color: theme.palette.secondary[300] }}
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
                              sx={{ color: theme.palette.secondary[100] }}
                            >
                              {user.address || "Not provided"}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      {user.city && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <LocationOn
                              sx={{ color: theme.palette.secondary[300] }}
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
                                sx={{ color: theme.palette.secondary[100] }}
                              >
                                {user.city}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}

                      {user.location && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <LocationOn
                              sx={{ color: theme.palette.secondary[300] }}
                            />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ color: theme.palette.secondary[200] }}
                              >
                                Location Coordinates
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ color: theme.palette.secondary[100] }}
                              >
                                Lat: {user.location.latitude}, Lng:{" "}
                                {user.location.longitude}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{ color: theme.palette.secondary[300] }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <ProfileUpdate
        user={user}
        open={updateOpen}
        onClose={handleUpdateClose}
        onSuccess={handleUpdateSuccess}
      />
    </>
  );
};

export default ProfileView;
