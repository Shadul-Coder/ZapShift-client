import { useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { myRole, roleLoading } = useRole();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !roleLoading && !user) {
      navigate("/signin");
    }
    if (!loading && !roleLoading && user && myRole !== "admin") {
      navigate("/");
    }
  }, [user, myRole, loading, roleLoading, navigate]);
  if (loading || roleLoading) {
    return <Loading />;
  }
  if (user && myRole === "admin") {
    return children;
  }
};

export default AdminRoute;
