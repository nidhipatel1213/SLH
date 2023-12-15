import Router from "./router/Router";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "./Theme";
import NavigationBar from "./component/navigationBar/NavigationBar";
import Footer from "./component/footer/Footer";
import { handleCurrentUser } from "./Redux/Reducers/navigationReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch<any>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
    const userData = localStorage.getItem("userData");
    if (userData) dispatch(handleCurrentUser(JSON.parse(userData)));
  }, []);

  const paypalClientId = process.env.PAYPAL_CLIENT_ID || '';

  return (
    <PayPalScriptProvider options={{ clientId: paypalClientId }}>
      <ThemeProvider theme={DefaultTheme}>
        <NavigationBar />
        <div className="mt-20 App flex justify-center">
          <Router />
        </div>
        <Footer />
      </ThemeProvider>
    </PayPalScriptProvider>
  );
}

export default App;
