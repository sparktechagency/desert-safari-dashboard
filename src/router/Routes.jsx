import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";


import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";
import Category from "../Pages/Category/Category";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import Notifications from "../Pages/Notification/Notification";
import BookingDetails from "../Components/BookingDetails/BookingDetails";
import AllBooking from "../Pages/AllBooking/AllBooking";
import AllEvents from "../Pages/AllEvents/AllEvents";
import AllPackage from "../Pages/AllPackage/AllPackage";
import Blogs from "../Pages/Blogs/Blogs";
import Faq from "../Pages/Faq/Faq";
import AddPackage from "../Components/AddPackage/AddPackage";
import EditPackage from "../Components/EditPackage/EditPackage";
import Refund from "../Pages/Settings/Refund/Refund";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword></ForgatePassword>,
  },
  {
    path: "/varification",
    element: <VerifyPass></VerifyPass>,
  },

  {
    path: "/new-password",
    element: <Newpass></Newpass>,
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Analytics />,
      },
      {
        path: "/booking-details",
        element: <BookingDetails />,
      },
      {
        path: "/all-booking",
        element: <AllBooking />,
      },
      {
        path: "/all-events",
        element: <AllEvents />,
      },
      {
        path: "/pacakes",
        element: <AllPackage />,
      },
      {
        path: "/add-package",
        element: <AddPackage />,
      },
      {
        path: "/edit-package",
        element: <EditPackage />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },

      {
        path: "/add-category",
        element: <Category></Category>,
      },

      {
        path: "/make-admin",
        element: <MakeAdmin />,
      },

      // setting:
      {
        path: "/settings/about-us",
        element: <AboutUs />,
      },

      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/terms-condition",
        element: <TermsCondition />,
      },
      {
        path: "/settings/refund",
        element: <Refund />,
      },

      // Admin profile:
      {
        path: "/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
]);
