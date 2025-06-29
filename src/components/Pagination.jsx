import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust start page if we're near the end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Button
        variant="outlined"
        startIcon={<ChevronLeft />}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        size="small"
      >
        Previous
      </Button>

      {renderPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "contained" : "outlined"}
          onClick={() => handlePageClick(page)}
          size="small"
          sx={{ minWidth: 40 }}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outlined"
        endIcon={<ChevronRight />}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        size="small"
      >
        Next
      </Button>

      <Typography variant="body2" color="textSecondary" ml={2}>
        Page {currentPage} of {totalPages}
      </Typography>
    </Box>
  );
};

export default Pagination;
