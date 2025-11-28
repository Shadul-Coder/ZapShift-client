import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home/Home";
import AuthPage from "../layouts/AuthPage";
import Signin from "../pages/Auth/SignIn/Signin";
import Signup from "../pages/Auth/SignUp/Signup";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import AuthRoute from "./AuthRoute";

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
    ],
  },
  {
    path: "/",
    Component: AuthPage,
    children: [
      {
        path: "signin",
        element: (
          <AuthRoute>
            <Signin />
          </AuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthRoute>
            <Signup />
          </AuthRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthRoute>
            <ForgetPassword />
          </AuthRoute>
        ),
      },
    ],
  },
]);

export default router;
