import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Box, Typography, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ImageCarousel = ({
  setSelectedCard,
  selectedCard,
  handleImageUpload,
}) => {
  const [imageUrls, setImageUrls] = useState(selectedCard?.images);

  const handleImageDelete = (imageUrl) => {
    const updatedImages = imageUrls.filter((img) => img !== imageUrl);

    setSelectedCard((prev) => ({
      ...prev,
      images: updatedImages,
    }));

    setImageUrls(updatedImages);
  };

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
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    setImageUrls(selectedCard?.images);
  }, [selectedCard]);

  return (
    <Box sx={{ width: "100%", maxHeight: "300px" }}>
      <Typography variant="h6">Images</Typography>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUploadChange}
      />
      <Carousel showThumbs={false}>
        {imageUrls.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={img}
              alt={`image-${index}`}
              style={{
                width: "100%",
                maxHeight: "100px",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
   
            {imageUrls.length > 1 && (
              <button
                onClick={() => handleImageDelete(img)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "white",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
