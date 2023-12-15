import React, { useCallback, useState, KeyboardEvent, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LoginPage from "../../pages/LoginPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleCurrentUser } from "../../Redux/Reducers/navigationReducer";
import { useMediaQuery, useTheme, IconButton, Drawer } from "@mui/material";
import "../../css/navbar.css"
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon
const logo = require("../../assests/images/logo.png");


 // Define a custom style for the buttons
 const buttonStyle = {
  color: '#ffffff',
  backgroundColor: '#4c51bf', // A nice shade of indigo
  margin: '0 10px',
  '&:hover': {
    backgroundColor: '#667eea', // Lighter shade for hover
  },
  borderRadius: '4px', // Rounded corners
  border: 'none',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
  padding: '10px 15px', // Spacious padding for comfort
  fontWeight: 'bold', // Bold font for prominence
};

export default function NavigationBar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false); // Define state for menu open/close

  const handleMenuOpen = () => setMenuOpen(true); // Define function to handle menu open
  const handleMenuClose = () => setMenuOpen(false); // Define function to handle menu close

  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (event.type === 'keydown' && (event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift') {
      return;
    }
    setDrawerOpen(open);
  };

  const mobileMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button color="inherit" className="m-3" style={buttonStyle} onClick={() => navigate("/")}>Home</Button>
      <Button color="inherit" className="m-3" style={buttonStyle} onClick={() => navigate("/services")}>Services</Button>
      <Button color="inherit" className="m-3" style={buttonStyle} onClick={() => navigate("/about")}>About</Button>
      <Button color="inherit" className="m-3" style={buttonStyle} onClick={() => navigate("/contact")}>Contact</Button>
      <ModalLogin />
      <ProfileDetails />
      {/* Add additional buttons as needed */}
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }} className="shadow-2xl">
      <AppBar position="fixed" className=" bg-slate-700">
        <Toolbar>

        {isMobile ? (
            <IconButton color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}>
              <MenuIcon /> 
            </IconButton>
          ) : (
            // Desktop version, render the logo and buttons
            <>
              {/* <Logo /> */}
              {/* Buttons here */}
           

          <img
            src={logo}
            alt="logo"
            className="h-auto mr-3"
            style={{ width: "100px" }}
          />
          <Logo />
          <Button color="inherit" style={buttonStyle} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" style={buttonStyle} onClick={() => navigate("/services")}>
            Services
          </Button>
          <Button color="inherit" style={buttonStyle} onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" style={buttonStyle} onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <ModalLogin />
          <ProfileDetails />
          </>
          )}
          {/* Rest of your code */}

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left" 
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {/* Navigation links here */}
        {mobileMenu}
      </Drawer>
    </Box>
  );
}

// Define your mobile menu component here
// type MobileMenuProps = {
//   open: boolean;
//   onClose: () => void;
// };

// const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
//   // Make sure to return valid JSX or null
//   return (
//     <Drawer open={open} onClose={onClose}>
//       {/* Your navigation links should go here */}
//       <div>
//         {/* Assuming you have a list of navigation items */}
//         <button onClick={onClose}>Link 1</button>
//         <button onClick={onClose}>Link 2</button>
//         <button onClick={onClose}>Link 3</button>
//       </div>
//     </Drawer>
//   );
// };

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h1"
      fontSize={40}
      className="font-bold cursor-pointer"
      component="div"
      sx={{ flexGrow: 1 }}
      onClick={() => navigate("/")}
    >
      Senior Living Hub
    </Typography>
  );
};

const ProfileDetails = () => {
  const store = useSelector(
    (state: any) => state.seniorLivingStore.currentUsersData
  );
  const navigate = useNavigate();

  if (store?.userType) {
    return (
      <Button
      color="inherit"
      style={buttonStyle}
        onClick={() =>
          navigate(
            store.userType === "resident"
              ? "/resident-details"
              : "/medical-staff"
          )
        }
      >
        Profile
      </Button>
    );
  } else {
    return <></>;
  }
};

const ModalLogin = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleRemoveToken = useCallback(() => {
    localStorage.clear();
    navigate("/");
    dispatch(handleCurrentUser({}));
  }, [dispatch, navigate]);

  if (token) {
    return (
      <div>
        <Button color="inherit" style={buttonStyle} onClick={handleRemoveToken}>
          Logout
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button color="inherit" style={buttonStyle} onClick={handleOpen}>
          Login
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute w-fit shadow-lg p-4 rounded-lg bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <LoginPage handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    );
  }
};
