import React, { useState, ChangeEvent } from "react";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import {
  Container,
  TextField,
  Button,
  Typography,
  RadioGroup,
  Box,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  InputAdornment,
  Grid,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";

// This is a simple style object for the modal. You can customize it as needed.
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [residenceFor, setResidenceFor] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleClearForm = () => {
    // Set each piece of state back to the initial value
    setFirstName("");
    setLastName("");
    setEmail("");
    setTelephone("");
    setResidenceFor("");
    setDescription("");
    setMessage("");
  };

  const [openModal, setOpenModal] = useState(false);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Here you would typically handle the submission of the form data
  //   setOpenModal(true);
  //   handleClearForm();

  //   console.log({
  //     firstName,
  //     lastName,
  //     email,
  //     telephone,
  //     residenceFor,
  //     description,
  //     message,
  //   });
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      telephone,
      residenceFor,
      description,
      message,
    };

    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        handleClearForm();
        setOpenModal(true);
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setOpenModal(true);
    handleClearForm();
  };

  const handleClose = () => setOpenModal(false);

  // Myself radio button
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };


  return (
    <div className="mt-5 flex flex-col min-h-screen">
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mb: 3 }}
              className="mt-5 mb-6 text-center text-primary-500"
              style={{
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Example shadow
                color: "#0055aa", // Example color
              }}
            >
              Your Personal Information
            </Typography>
            <form onSubmit={handleSubmit} method="POST">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name*"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name*"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email Address*"
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Telephone Number"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel
                      component="legend"
                      sx={{ textAlign: "left", fontWeight: "bold" }}
                    >
                      Are You Looking For A Residence For Yourself Or A Loved
                      One?*
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="residence for"
                      name="residenceFor"
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="myself"
                        control={<Radio required />}
                        label="Myself"
                      />
                      <FormControlLabel
                        value="lovedOne"
                        control={<Radio required />}
                        label="A Loved One"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {selectedOption === "lovedOne" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel
                        id="description-label"
                        sx={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Which Best Describes You?*
                      </FormLabel>
                      <Select
                        labelId="description-label"
                        id="description"
                        displayEmpty
                        required
                      >
                        <MenuItem value="">
                          <em>- Select -</em>
                        </MenuItem>
                        <MenuItem value="family">Family Member</MenuItem>
                        <MenuItem value="caregiver">Caregiver</MenuItem>
                        <MenuItem value="senior">Senior</MenuItem>
                        {/* ... Other menu items */}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    label="Message (Optional)"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MessageIcon style={{ marginTop: "-60px" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ px: 5 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="submission-modal-title"
          aria-describedby="submission-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="submission-modal-title" variant="h6" component="h2">
              Thank you for your submission
            </Typography>
            <Typography id="submission-modal-description" sx={{ mt: 2 }}>
              Your information has been received and we will contact you
              shortly.
            </Typography>
            <Box textAlign="center" marginTop={3}>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default Contact;
