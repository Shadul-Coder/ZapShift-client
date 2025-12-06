import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useSecure from "./useSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const secure = useSecure();
  const [myRole, setMyRole] = useState("user");
  const [roleLoading, setRoleLoading] = useState(true);
  useEffect(() => {
    const fetchRole = async () => {
      const response = await secure(`/users/${user.email}/role`);
      setMyRole(response.data.role);
      setRoleLoading(false);
    };
    if (!loading) {
      if (!user) {
        return;
      }
      fetchRole();
    }
  }, [secure, user, loading]);
  return { myRole, roleLoading };
};

export default useRole;
