import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  IconButton,
  useTheme,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PhotoCamera, Save, Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "state/userApi";

const ProfileUpdate = ({ user, open, onClose, onSuccess }) => {
  const theme = useTheme();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    city: user?.city || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(user?.profilePhoto || null);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create FormData for file upload
      const submitData = new FormData();

      // Add text fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Add profile photo if selected
      if (profilePhoto) {
        submitData.append("profilePhoto", profilePhoto);
      }

      // Call the API to update the user profile
      const result = await updateProfile(submitData).unwrap();

      toast.success("Profile updated successfully!");

      // Call onSuccess with updated user data
      const updatedUser = {
        ...user,
        ...formData,
        profilePhoto: previewPhoto,
      };
      onSuccess(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        `Failed to update profile: ${
          error.data?.message || "Please try again."
        }`
      );
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      city: user?.city || "",
    });
    setProfilePhoto(null);
    setPreviewPhoto(user?.profilePhoto || null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.75rem",
        },
      }}
    >
      <DialogTitle sx={{ color: theme.palette.secondary[100] }}>
        <Typography variant="h5">Update Profile</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={3}>
            {/* Profile Photo Section */}
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
                  src={previewPhoto}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `3px solid ${theme.palette.secondary[300]}`,
                  }}
                >
                  {formData.firstName?.charAt(0) ||
                    formData.email?.charAt(0) ||
                    "U"}
                </Avatar>

                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-photo-input"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="profile-photo-input">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      backgroundColor: theme.palette.secondary[300],
                      color: theme.palette.background.alt,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[400],
                      },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>

                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Click to change photo
                </Typography>
              </Box>
            </Grid>

            {/* Form Fields */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange("phoneNumber")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={handleInputChange("city")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.secondary[300],
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.secondary[400],
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.secondary[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: theme.palette.secondary[200],
                      },
                      "& .MuiInputBase-input": {
                        color: theme.palette.secondary[100],
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={handleCancel}
          startIcon={<Cancel />}
          sx={{
            color: theme.palette.secondary[300],
            "&:hover": {
              backgroundColor: theme.palette.secondary[300],
              color: theme.palette.background.alt,
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          startIcon={<Save />}
          variant="contained"
          disabled={isLoading}
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: theme.palette.background.alt,
            "&:hover": {
              backgroundColor: theme.palette.secondary[400],
            },
            "&:disabled": {
              backgroundColor: theme.palette.secondary[200],
              color: theme.palette.secondary[100],
            },
          }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileUpdate;
