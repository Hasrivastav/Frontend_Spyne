import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Box, Typography, IconButton } from "@mui/material";
import axios from "axios";
import { Delete as DeleteIcon } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import toast from "react-hot-toast";

const ImageUploadCarousel = ({ handleImageUpload }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUploadChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      uploadToCloudinary(file);
    });
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbqrdphkj/image/upload",
        formData
      );
      const cloudinaryUrl = response.data.secure_url;
     

      handleImageUpload(cloudinaryUrl);

      setUploadedImages((prev) => [...prev, cloudinaryUrl]);
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };

  const handleDeleteImage = (imageUrl) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((img) => img !== imageUrl)
    );
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "300px" }}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUploadChange}
      />
      <Typography variant="h6">Uploaded Images</Typography>
      <Carousel showThumbs={false}>
        {uploadedImages.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={img}
              alt={`uploaded-${index}`}
              style={{
                width: "100%",
                maxHeight: "100px",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={() => handleDeleteImage(img)}
              style={{
                position: "absolute",
                top: "8px",
                right: "35px",

                color: "white",
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageUploadCarousel;
