import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";
import {
  HiMiniMagnifyingGlass,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const secure = useSecure();
  const [searchData, setSearchData] = useState("");
  const [curLoad, setCurLoad] = useState(10);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", searchData, curLoad],
    queryFn: () =>
      secure
        .get(`/users?search=${searchData}&load=${curLoad}`)
        .then((res) => res.data),
  });
  const handleMakeAdmin = (id, curRole) => {
    Swal.fire({
      title: "Make Admin?",
      text: "Grant this user admin privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Grant Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        secure.patch(`/admin/${id}/make`, { curRole }).then((res) => {
          refetch();
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Admin Granted",
              text: "User is now an administrator",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: "Remove Admin?",
      text: "Revoke admin access from this user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Revoke Admin",
    }).then((result) => {
      if (!result.isConfirmed) {
        secure.patch(`/admin/${id}/remove`).then((res) => {
          refetch();
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Admin Revoked",
              text: "User admin access has been removed",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <>
      <title>Manage Users</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Manage All Users
        </h1>
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[#eff2f6] md:max-w-md mb-7 sm:mb-9 rounded-xl flex"
        >
          <button type="submit">
            <HiMiniMagnifyingGlass className="mx-3 text-xl" />
          </button>
          <input
            onChange={(e) => setSearchData(e.target.value)}
            type="search"
            name="search"
            placeholder="Search User…"
            className="flex-1 py-3 pr-3 focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 px-5 text-secondary font-semibold rounded-xl"
          >
            Search
          </button>
        </form>
        {isLoading ? (
          <Loading />
        ) : data.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No users found
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              All users will appear here for management
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="text-base sm:text-lg font-semibold text-secondary">
                  Users
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-3xl sm:min-w-full">
                  <thead>
                    <tr className="bg-[#F3FADC]">
                      <th className="py-3 px-3 sm:py-4 sm:px-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        No.
                      </th>
                      <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Name
                      </th>
                      <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Role
                      </th>
                      <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="py-3 px-2 sm:py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-3 px-3 sm:py-4 sm:px-4">
                          {index + 1}
                        </td>
                        <td className="py-3 px-3 sm:py-4">
                          <div className="h-13 w-13 rounded-lg border border-gray-200 md:h-15 md:w-15 xl:h-17 xl:w-17 overflow-hidden">
                            <img
                              src={user.photo}
                              alt=""
                              crossOrigin="anonymous"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-3 sm:py-4 truncate">
                          {user.name}
                        </td>
                        <td className="py-3 px-3 sm:py-4">{user.email}</td>
                        <td className="py-3 px-3 sm:py-4 font-medium">
                          {user.role === "user" && "User"}
                          {user.role === "rider" && "Rider"}
                          {user.role === "admin" && "Admin"}
                        </td>
                        <td className="py-3 px-3 sm:py-4">
                          {new Date(user.createdAt)
                            .toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(",", "")}
                        </td>
                        <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                          <div className="flex justify-center gap-1.5">
                            {user.role === "admin" ? (
                              <button
                                onClick={() => handleRemoveAdmin(user._id)}
                                className="text-sm truncate font-medium bg-[#f3e1e1] text-[#e83330] hover:bg-[#e9d8d8] active:bg-[#e0cfcf] transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
                              >
                                Remove Admin
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleMakeAdmin(user._id, user.role)
                                }
                                className="text-sm truncate font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                              >
                                Make Admin
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={() => setCurLoad((prev) => prev + 10)}
              className="w-full mt-7 md:mt-9 md:text-center md:max-w-xs border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
            >
              See More
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default ManageUsers;
