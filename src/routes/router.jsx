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
import ParcelDetails from "../pages/Dashboard/ParcelDetails/ParcelDetails";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import BeARider from "../pages/BeARider/BeARider";
import ManageRiders from "../pages/Dashboard/ManageRiders/ManageRiders";
import RiderDetails from "../pages/Dashboard/RiderDetails/RiderDetails";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageParcels from "../pages/Dashboard/ManageParcels/ManageParcels";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import MyDeliveries from "../pages/Dashboard/MyDeliveries/MyDeliveries";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import HomeDash from "../pages/Dashboard/Home/HomeDash";

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
        path: "track-order",
        Component: TrackOrder,
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
        path: "be-a-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
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
            index: true,
            Component: HomeDash,
          },
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
          {
            path: "payment-history",
            Component: PaymentHistory,
          },
          {
            path: "assigned-deliveries",
            element: (
              <RiderRoute>
                <AssignedDeliveries />
              </RiderRoute>
            ),
          },
          {
            path: "my-deliveries",
            element: (
              <RiderRoute>
                <MyDeliveries />
              </RiderRoute>
            ),
          },
          {
            path: "manage-parcels",
            Component: ManageParcels,
          },
          {
            path: "manage-riders",
            element: (
              <AdminRoute>
                <ManageRiders />
              </AdminRoute>
            ),
          },
          {
            path: "manage-riders/:id",
            element: (
              <AdminRoute>
                <RiderDetails />
              </AdminRoute>
            ),
          },
          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
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
