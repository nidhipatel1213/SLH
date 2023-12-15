// Footer.tsx

// const Footer: React.FC = () => {
//   return (
//     <div className="bg-black text-white p-8">
//       <div className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div className="flex items-center space-x-4">
//             <h6 className="text-2xl font-bold">Senior Living Hub</h6>
//             <p className="text-sm">A Hub of Care, Comfort, and Community."</p>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <Link to="#" className="text-white">Contact</Link>
//             <Link to="/about" className="text-white">About</Link>
//             <Link to="#" className="text-white">Services</Link>
//             <Link to="/payment" className="text-white">Payment</Link>
//           </div>
//         </div>
//         <div className="mt-8 text-center">
//           <p className="text-sm">&copy; {new Date().getFullYear()} Senior Living Hub. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styled from "styled-components";
import "../../footer.css";
const logo = require("../../assests/images/logo.png");

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  & > img {
    // width: 100px;
    // height: auto;
    // margin-right: 10px;
  }

  & .text-amber-500.font-extrabold {
    font-size: 25px !important; // Override the font size
    // Add any additional styles you need
  }
`;

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#4a4a4a", // Replace with the exact color from the image
        color: "white",
        py: 6,
        px: 2,
        // width: "100%",
      }}
    >
      <Container maxWidth="lg" style={{ width: "100%" }}>
        <Box>
              <LogoWrapper>
                <img
                  src={logo}
                  alt="logo"
                  className="h-auto mr-3"
                  style={{ width: "100px" }}
                />
                <Typography
                  variant="h1"
                  fontSize={30}
                  className="text-amber-500 font-extrabold"
                >
                  Senior Living Hub
                </Typography>
              </LogoWrapper>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Support Office
                <br />
                299 Doon Valley Dr,
                <br />
                Kitchener, Ontario
                <br />
                N2G 4M4
              </Typography>
              <Link href="/" variant="body1" sx={{ display: "block", mt: 1, color:"white" }}>
                Contact Us
              </Link>
              <Link href="/" variant="body1" sx={{ display: "block", mt: 1, color:"white" }}>
                Career Opportunities Email
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ margin: "auto",}}>
          <Link href="/" variant="body1" sx={{ display: "block", mt: 1 }}  className="text-white pl-20">
              Home
            </Link>
            <Link href="/contact" variant="body1" sx={{ display: "block", mt: 1 }} className="text-white pl-20">
              Contact
            </Link>
            <Link href="/about" variant="body1" sx={{ display: "block", mt: 1 }} className="text-white pl-20">
              About
            </Link>
            <Link href="/services" variant="body1" sx={{ display: "block", mt: 1 }} className="text-white pl-20">
              Services
            </Link>
            {/* Repeat for other columns */}
          </Grid>
          <Grid item xs={12} sm={4} sx={{ margin: "auto" }}>
            <Link href="/" variant="body1" sx={{ display: "block", mt: 1, color:"white" }}>
              Website
            </Link>
            <Link href="/" variant="body1" sx={{ display: "block", mt: 1, color:"white" }}>
              Privacy Policy
            </Link>
            {/* Include CARF Canada accreditation badge and other information */}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            pt: 3,
            borderTop: "1px solid white",
          }}
        >
          <Typography variant="body2">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Senior Living Hub. All rights
              reserved.
            </p>
          </Typography>
          <Box>
            <Link href="/" color="inherit" sx={{ ml: 2 }}>
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="/" color="inherit" sx={{ ml: 2 }}>
              <TwitterIcon />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="/" color="inherit" sx={{ ml: 2 }}>
              <FacebookIcon />
              <span className="sr-only">FACEBOOK</span>
            </Link>
            <Link href="/" color="inherit" sx={{ ml: 2 }}>
              <LinkedInIcon />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
