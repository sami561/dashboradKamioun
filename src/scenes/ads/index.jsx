import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Header from "../../components/Header";
import AdCard from "../../components/AdCard";
import Pagination from "../../components/Pagination";
import CreateAdModal from "../../components/CreateAdModal";

const Ads = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dummy data for demonstration
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate API call
  const fetchAds = async (page = 1) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy data
      const dummyAds = [
        {
          id: 1,
          title: "Summer Sale - Electronics",
          description:
            "Get amazing discounts on all electronics this summer. Up to 50% off on smartphones, laptops, and more!",
          category: "electronics",
          targetAudience: "all",
          budget: 5000.0,
          startDate: "2024-06-01",
          endDate: "2024-08-31",
          image: "/images/electronics-sale.jpg",
          status: "active",
          views: 15420,
          clicks: 1234,
        },
        {
          id: 2,
          title: "Fashion Collection 2024",
          description:
            "Discover the latest fashion trends for 2024. New arrivals every week with exclusive designs.",
          category: "fashion",
          targetAudience: "youth",
          budget: 3000.0,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          image: "/images/fashion-collection.jpg",
          status: "active",
          views: 8920,
          clicks: 567,
        },
        {
          id: 3,
          title: "Home & Garden Essentials",
          description:
            "Transform your living space with our premium home and garden products. Quality guaranteed.",
          category: "home",
          targetAudience: "families",
          budget: 2500.0,
          startDate: "2024-03-01",
          endDate: "2024-05-31",
          image: "/images/home-garden.jpg",
          status: "paused",
          views: 6540,
          clicks: 432,
        },
      ];

      setData(dummyAds);
      setTotalPages(3);
      setError(null);
    } catch (err) {
      setError({ message: "Failed to fetch advertisements" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds(currentPage);
  }, [currentPage, showModal]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

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

          {loading ? (
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            </Grid>
          ) : data?.length > 0 ? (
            data.map((ad, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>

      <CreateAdModal showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default Ads;
