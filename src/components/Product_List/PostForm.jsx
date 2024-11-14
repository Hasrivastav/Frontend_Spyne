import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Form.css";
import { Box, TextField, Typography, InputBase } from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import ImageUploadCarousel from "../ImageModule/Image_Carousel";
import axios from "axios";
import ImageCarousel from "../ImageModule/ImagePreview";
import { BASE_URL } from "../../BASE_URL";

const CardDetail = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModel, setUpdateModel] = useState(false);
  setUpdateModel;
  const [cardDetails, setCardDetails] = useState({
    name: "",
    description: "",
    images: [],
  });
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    _id: "",
    name: "",
    description: "",
    images: [],
  });

  const cardsToDisplay = searchQuery === "" ? cards : filteredCards;



  useEffect(() => {
    const fetchCars = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("accessToken");

        if (!userId || !token) {
          alert("User is not authenticated.");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/car/all/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCards(response.data.data);
          setFilteredCards(response.data.data);
        } else {
          alert("Failed to fetch cars.");
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("An error occurred while fetching cars.");
      }
    };

    fetchCars();
  }, [selectedCard , cardDetails]);

  const handleAddNewClick = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setUpdateModel(false);
  };

  const handleImageUpload = (image) => {
    if (openUpdateModel && selectedCard) {
      setSelectedCard((prev) => ({
        ...prev,
        images: [...prev.images, image],
      }));
    } else {
      setCardDetails((prev) => ({
        ...prev,
        images: [...prev.images, image],
      }));
    }
  };

  const handleSave = async () => {
    if (
      (!cardDetails.name ||
        !cardDetails.description ||
        cardDetails.images.length === 0) &&
      (!selectedCard.name ||
        !selectedCard.description ||
        selectedCard.images.length === 0)
    ) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      const userId = sessionStorage.getItem("userId");

      
      if (openUpdateModel && selectedCard) {
       
        const response = await axios.put(
          `${BASE_URL}/car/${selectedCard._id}`,
          {
            name: selectedCard.name,
            description: selectedCard.description,
            images: selectedCard.images,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCards((prev) =>
            prev.map((card) =>
              card._id === selectedCard._id
                ? { ...card, ...selectedCard }
                : card
            )
          );

          setFilteredCards((prev) =>
            prev.map((card) =>
              card._id === selectedCard._id
                ? { ...card, ...selectedCard }
                : card
            )
          );

          setUpdateModel(false);
          setCardDetails({
            name: "",
            description: "",
            images: [],
          });

          alert("Car updated successfully!");
        } else {
          alert("Failed to update car. Please try again.");
        }
      } else {
     
        const response = await axios.post(
          `${BASE_URL}/car/create`,
          {
            name: cardDetails.name,
            description: cardDetails.description,
            images: cardDetails.images,
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          setCards((prev) => [
            ...prev,
            {
              name: cardDetails.name,
              description: cardDetails.description,
              images: cardDetails.images,
            },
          ]);

          setFilteredCards((prev) => [
            ...prev,
            {
              name: cardDetails.name,
              description: cardDetails.description,
              images: cardDetails.images,
            },
          ]);

          setOpenModal(false);
          setCardDetails({
            name: "",
            description: "",
            images: [],
          });

          alert("Car created successfully!");
        } else {
          alert("Failed to create car. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error saving car:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleDelete = async (carId) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.delete(
        `${BASE_URL}/car/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCards(cards.filter((card) => card._id !== carId));
        setFilteredCards(cards.filter((card) => card._id !== carId));

        alert("Car deleted successfully!");
      } else {
        alert("Failed to delete car.");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("An error occurred while deleting the car.");
    }
  };
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = cards.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
    );

    setFilteredCards(filtered);
  };

  const handleCardClick = async (cardId) => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axios.get(
        `${BASE_URL}/car/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("response.data.data", response.data.data);
        setSelectedCard(response.data.data);
        setUpdateModel(true);
      } else {
        alert("Failed to fetch card details.");
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
      alert("An error occurred while fetching card details.");
    }
  };
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Product List</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <i
              className="fa fa-search"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#4CAF50",
              }}
            ></i>
          </div>

      
          <button
            onClick={handleAddNewClick}
            style={{
              height: "40px",
              width: "150px",
              fontSize: "14px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fa fa-plus" style={{ marginRight: "8px" }}></i> Add
            New
          </button>
        </div>
      </div>

   
      {cardsToDisplay.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            textAlign: "center",
            fontSize: "18px",
            color: "#757575",
          }}
        >
          <Typography variant="h6">
            Your added card details will appear here. <span>?</span>
          </Typography>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent:"space-evenly",flexWrap: "wrap", marginTop: "20px" }}>
          {cardsToDisplay.map((card) => (
            <div
              key={card._id}
              style={{
                width: "300px",
                padding: "10px",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => handleCardClick(card._id)}
            >
              <div
                style={{
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  transition: "transform 0.2s",
                }}
              >
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>{card.name}</h4>

                  <DeleteIcon
                    onClick={() => handleDelete(card._id)}
                    color="error"
                  />
                </Box>
                

                <Carousel showThumbs={false} showArrows={false}>
                  {card.images.map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={img}
                        alt={`carousel-${idx}`}
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          ))}
        </div>
      )}

      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Upload Card Image and Details</h3>
              <Box>
                <SaveIcon
                  onClick={handleSave}
                  className="modal-button save-button"
                />
                <CancelIcon
                  onClick={handleModalClose}
                  className="modal-button cancel-button"
                />
              </Box>
            </div>

            <input
              type="text"
              placeholder="Card Name"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Card Description"
              value={cardDetails.description}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, description: e.target.value })
              }
              className="modal-input"
            />

         
            <ImageUploadCarousel handleImageUpload={handleImageUpload} />
          </div>
        </div>
      )}

      {openUpdateModel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Update Details</h3>
              <Box>
                <SaveIcon
                  onClick={handleSave}
                  className="modal-button save-button"
                />
                <CancelIcon
                  onClick={handleModalClose}
                  className="modal-button cancel-button"
                />
              </Box>
            </div>

            <input
              type="text"
              placeholder="Card Name"
              value={selectedCard.name}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, name: e.target.value })
              }
              className="modal-input_name"
            />
            <textarea
              type="text"
              placeholder="Card Description"
              value={selectedCard.description}
              onChange={(e) =>
                setSelectedCard({
                  ...selectedCard,
                  description: e.target.value,
                })
              }
              className="modal-input"
            />

            <ImageCarousel
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
              handleImageUpload={handleImageUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;
