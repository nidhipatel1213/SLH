import React, { lazy } from "react";
import ResidentSearchForm from "../pages/EditMedicalStaffDetails";

const Home = lazy(() => import("../pages/Home"));
const Signup = lazy(() => import("../pages/SignUpPage"));
const Resident = lazy(() => import("../pages/ResidentDetails"));
const MedicalStaffDetails = lazy(() => import("../pages/MedicalStaffDetials"));
const Services = lazy(() => import("../pages/Services"));
const About = lazy(() => import("../pages/About"));
const EditResident = lazy(() => import("../pages/EditResident"));
const PaymentForm =  lazy(()=>import("../pages/PaymentForm"));
const ContactPage = lazy(() => import("../pages/Contact"));
const Checkout = lazy(() => import("../pages/Checkout"));

const Routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/resident-details",
    element: <Resident />,
  },
  {
    path: "/medical-staff",
    element: <MedicalStaffDetails />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/Contact",
    element: <ContactPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: '/edit-resident',
    element: <EditResident/>
  },
  {
    path: '/edit-medicalStaff',
    element: <ResidentSearchForm/>
  },
  {
    path: "/paymentform",
    element: <PaymentForm />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },

];

export default Routes;
