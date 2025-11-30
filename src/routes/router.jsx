import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home/Home";
import AuthPage from "../layouts/AuthPage";
import Signin from "../pages/Auth/SignIn/Signin";
import Signup from "../pages/Auth/SignUp/Signup";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import SendParcel from "../pages/Dashboard/SendParcel/SendParcel";
import ParcelDetails from "../pages/Dashboard/MyParcels/ParcelDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "send-parcel",
            Component: SendParcel,
          },
          {
            path: "my-parcels",
            Component: MyParcels,
          },
          {
            path: "my-parcels/:id",
            Component: ParcelDetails,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: AuthPage,
    children: [
      {
        path: "signin",
        Component: Signin,
      },
      {
        path: "signup",
        Component: Signup,
      },
      {
        path: "forgot-password",
        Component: ForgetPassword,
      },
    ],
  },
]);

export default router;
