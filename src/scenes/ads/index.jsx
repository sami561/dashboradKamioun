import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Header from "../../components/Header";
import AdCard from "./components/AdCard";
import CreateAdModal from "../../components/CreateAdModal";
import { useGetAdsQuery } from "state/adsApi";

const Ads = () => {
  const [showModal, setShowModal] = useState(false);

  // Use RTK Query for API calls
  const { data: adsResponse, isLoading, error, refetch } = useGetAdsQuery();

  // The new API returns an array of ad objects directly
  const data = Array.isArray(adsResponse) ? adsResponse : [];

  useEffect(() => {
    if (showModal === false) {
      refetch();
    }
  }, [showModal, refetch]);

  /*   if (error) {
    return (
      <Typography color="error">
        Error: {error.data?.message || error.message || "Failed to fetch advertisements"}
      </Typography>
    );
  } */

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADS" subtitle="Manage your advertisements" />

      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Your advertisements
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              border={2}
              borderColor="divider"
              borderRadius={2}
              borderStyle="dashed"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => setShowModal(true)}
            >
              <AddIcon fontSize="large" color="action" />
              <Button color="inherit" sx={{ mt: 2 }}>
                Create new ad
              </Button>
            </Box>
          </Grid>

          {isLoading ? (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            </Grid>
          ) : data?.length > 0 ? (
            data.map((ad, index) => (
              <Grid item xs={12} sm={6} md={4} key={ad._id || index}>
                <AdCard data={ad} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography color="textSecondary">
                No advertisements available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      <CreateAdModal showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default Ads;
