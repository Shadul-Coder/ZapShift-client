import Loading from "../../../components/Loading/Loading";
import useRole from "../../../hooks/useRole";
import AdminDash from "./AdminDash";
import RiderDash from "./RiderDash";
import UserDash from "./UserDash";

const HomeDash = () => {
  const { myRole, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading />;
  }
  if (myRole === "admin") {
    return <AdminDash />;
  } else if (myRole === "rider") {
    return <RiderDash />;
  } else {
    return <UserDash />;
  }
};

export default HomeDash;
