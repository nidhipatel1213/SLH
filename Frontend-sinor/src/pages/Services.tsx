import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const menu = require("../assests/images/menuOption.png");
// const suitesPrice = require("../assests/images/suitesPrice.png");
const suitesPrice1 = require("../../src/assests/images/suitesPrice1.png");
const suitesPrice2 = require("../../src/assests/images/suitesPrice2.png");

const Services: React.FC = () => {
  const navigate = useNavigate();

  // const [showPaymentPage, setShowPaymentPage] = useState(false);

  const handlePaymentClick = () => {
    // setShowPaymentPage(true);
    // navigate("/paymentform");
    // navigate("/checkout");

    window.location.href = "https://buy.stripe.com/test_6oEcOzgFM50mcg06oo"; // Your URL
    window.location.href = "https://buy.stripe.com/test_bIY7tI2jk2i94eI3cc"; // Your URL
  };
  const handlePaymentClick2 = () => {
    // setShowPaymentPage(true);
    // navigate("/paymentform");
    // navigate("/checkout");

    window.location.href = "https://buy.stripe.com/test_aEU01NdtA3Wi5RC6op"; // Your URL
    window.location.href = "https://buy.stripe.com/test_14k4gM21C7qWe5icMM"; // Your URL
  };

  return (
    <main className="mt-20 flex flex-col">
      <Box sx={{ py: 4, px: 2, width: "80%", margin: "auto" }}>
        <Typography
          fontSize={30}
          variant="h4"
          className="p-5"
          sx={{ mb: 4, textAlign: "justify" }}
        >
          Nestled in the heart of tranquility, our Senior Living Hub is
          perfectly situated on the serene outskirts of the bustling life of the
          University of Guelph. This idyllic setting offers the best of both
          worlds, where peaceful retirement living is just a stone's throw away
          from the vibrancy of academic life. Our community is seamlessly
          connected to the dynamic neighborhood of the Village,
          where engagement and interaction with fellow residents is a cherished
          way of life. At Senior Living Hub, we believe in building bridges,
          not just between places but between people.
        </Typography>

        <Typography
          fontSize={22}
          className="p-5"
          sx={{ mb: 2, textAlign: "justify" }}
        >
          At Senior Living Hub, each day dawns with the promise of new friendships and experiences, against the backdrop of our beautifully landscaped grounds. It's where every moment is about living your best life, surrounded by a community that's not just where you live, but truly your home.
        </Typography>
        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h4"
          // className="m-6 mt-10 text-center"
          className="mt-14 mb-6 text-center text-primary-500"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Example shadow
            color: "#0055aa", // Example color
          }}
        >
          Suites & Pricing
        </Typography>

        <Grid
          className="flex justify-evenly"
          container
          spacing={4}
          justifyContent="center"
        >
          <Card className="flex flex-col justify-center items-center my-5">
            <img
              src={suitesPrice1}
              alt="senior living hub"
              width={"600px"}
              // height={"400px"}
              className="object-cover"
            />
            <div className="flex items-center mt-3 mb-3">
              <div className="border rounded-lg bg-blue-200 py-3 px-10">
                <Typography>$2000</Typography>
              </div>
              <Button
                variant="contained"
                className="ms-4"
                onClick={handlePaymentClick}
              >
                Make a payment
              </Button>
            </div>
          </Card>
          <Card className="flex flex-col justify-center items-center my-5">
            <img
              src={suitesPrice2}
              alt="senior living hub"
              className="object-cover"
              width={"600px"}
              // height={"400px"}
            />
            <div className="flex items-center mt-3 mb-3">
              <div className="border rounded-lg bg-blue-200 py-3 px-10">
                <Typography>$2200</Typography>
              </div>
              <Button
                variant="contained"
                className="ms-4"
                onClick={handlePaymentClick2}
              >
                Make a payment
              </Button>
            </div>
          </Card>

          {/* <Grid container spacing={4} justifyContent="center">
            <ServiceCard image={suitesPrice} price="$2000" onClick={handlePaymentClick} />
            <ServiceCard image={suitesPrice} price="$2200" onClick={handlePaymentClick} />
          </Grid> */}
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box className="flex flex-col justify-center items-center my-5">
          <Typography
            variant="h4"
            // className="m-6 mt-10 text-center"
            className="mt-14 mb-6 text-center text-primary-500"
            style={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Example shadow
              color: "#0055aa", // Example color
            }}
          >
            Menu
          </Typography>
          <img
            src={menu}
            alt="senior living hub"
            width={"800px"}
            height={"1500px"}
          />
        </Box>
      </Box>
    </main>
  );
};
export default Services;
