import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Information from "../component/Information";
import Modal from "@mui/material/Modal";
import LoginPage from "./LoginPage";
import { useNavigate } from "react-router-dom";
import PaymentFormComp from "../component/PaymentGateway/PaymentFormComp";



const PaymentForm: React.FC = () => {
  // You can manage form state using useState hooks
  // You would also handle form submission and validation here

  const navigate = useNavigate();
  return (
    <Box>
      <PaymentFormComp />
    </Box>
  );
};

export default PaymentForm;
