import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaypalCheckoutButton from "./PaypalCheckoutButton";


// Styling for the modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

interface FormValues {
  firstName: string;
  lastName: string;
  cardNumber: string;
  cvc: string;
  expiryDate: string;
  phoneNumber: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  cardNumber?: string;
  cvc?: string;
  expiryDate?: string;
  phoneNumber?: string;
}

// Create a custom theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e35b1", // Deep purple
    },
    secondary: {
      main: "#f44336", // Red
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#5e35b1",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#5e35b1",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#5e35b1",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: "bold",
          textTransform: "none",
          padding: "10px 20px",
        },
      },
    },
  },
});

// pdf 
// Define the type for payment details
interface PaymentDetails {
  transactionId: string;
  amount: string;
  // Add other relevant fields
}

const PaymentFormComp: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cvc: "",
    expiryDate: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const theme = useTheme();

  const validate = (): boolean => {
    // Explicitly declare tempErrors with the FormErrors type
    let tempErrors: FormErrors = {};
    tempErrors.firstName = values.firstName ? "" : "This field is required.";
    tempErrors.lastName = values.lastName ? "" : "This field is required.";
    tempErrors.cardNumber =
      values.cardNumber.length === 16 ? "" : "Card number is not valid.";
    tempErrors.cvc = values.cvc.length === 3 ? "" : "CVC is not valid.";
    tempErrors.expiryDate = values.expiryDate.match(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    )
      ? ""
      : "Date is not valid.";
    tempErrors.phoneNumber = values.phoneNumber.match(/\d{10}/)
      ? ""
      : "Phone number is not valid.";

    // Now TypeScript knows that tempErrors is of type FormErrors
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleCancel = () => {
    // Clear all form fields
    setValues({
      firstName: "",
      lastName: "",
      cardNumber: "",
      cvc: "",
      expiryDate: "",
      phoneNumber: "",
    });
    // Clear all error messages
    setErrors({});
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleModalClose = () => {
    setValues({
      firstName: "",
      lastName: "",
      cardNumber: "",
      cvc: "",
      expiryDate: "",
      phoneNumber: "",
    });
    // Clear any errors
    setErrors({});
    // Close the modal
    setModalOpen(false);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validate()) {
      // Here you can add the logic to submit the data, for example, sending it to a server
      console.log("Form submitted", values);
      // Optionally clear the form or navigate the user to another page

      // Open the modal
      setModalOpen(true);
    }
  };

  // Paypal desc
  const product = {
    id: "1",
    name: "room 1",
    description: "Product Description",
    price: 2000,
  };

  const paypalClientId = process.env.PAYPAL_CLIENT_ID || "";

     return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                bgcolor: "white",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: 2,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: 1, // border width of 1px
                borderColor: "grey.300", // border color
                // boxShadow: 3, // shadow depth
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
              >
                Payment Information
              </Typography>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                variant="outlined"
                value={values.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  startAdornment: (
                    <AccountCircle sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={values.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputProps={{
                  startAdornment: (
                    <AccountCircle sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                value={values.phoneNumber}
                onChange={handleInputChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                InputProps={{
                  startAdornment: (
                    <PhoneIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              />
              {/* <TextField
                fullWidth
                name="cardNumber"
                label="Card Number"
                variant="outlined"
                value={values.cardNumber}
                onChange={handleInputChange}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                InputProps={{
                  startAdornment: (
                    <CreditCardIcon sx={{ color: "action.active", mr: 1 }} />
                  ),
                }}
              /> */}
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <TextField
                  name="expiryDate"
                  label="MM/YY"
                  variant="outlined"
                  sx={{ width: "70%" }}
                  value={values.expiryDate}
                  onChange={handleInputChange}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate}
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                />
                <TextField
                  name="cvc"
                  label="CVC"
                  variant="outlined"
                  sx={{ width: "30%" }}
                  value={values.cvc}
                  onChange={handleInputChange}
                  error={!!errors.cvc}
                  helperText={errors.cvc}
                  InputProps={{
                    startAdornment: (
                      <LockIcon sx={{ color: "action.active", mr: 1 }} />
                    ),
                  }}
                />
              </Box> */}

              {/* PayPal Checkout Button */}
              <Box
                id="paypal-button-container"
                sx={{
                  mt: 2, // margin top
                  p: 2, // padding
                  pb: 0,
                  // display: "flex",
                  // justifyContent: "center", // center the button horizontally
                  // alignItems: "center", // center the button vertically
                  backgroundColor: "background.paper", // background color
                }}
              >
                <PaypalCheckoutButton product={product}  />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 2,
                  pt: 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    sx={{ width: "100%" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: "100%" }}
                  >
                    Confirm Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Container>

        {/* Modal  */}
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="success-modal-title"
          aria-describedby="success-modal-description"
        >
          <Box sx={modalStyle}>
            <CheckCircleOutlineIcon
              sx={{ fontSize: 60, color: theme.palette.success.main }}
            />
            <Typography
              id="success-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              Success!
            </Typography>
            <Typography
              id="success-modal-description"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Your payment has been processed. Thank you!
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.success.main,
                "&:hover": { bgcolor: theme.palette.success.dark },
              }}
              onClick={handleModalClose}
            >
              OKAY
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </PayPalScriptProvider>
  );
};

export default PaymentFormComp;
