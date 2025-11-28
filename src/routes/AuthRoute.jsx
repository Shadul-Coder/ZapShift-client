import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Loading from "../components/Loading/Loading";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  if (loading) {
    return <Loading />;
  }
  return children;
};

export default AuthRoute;
