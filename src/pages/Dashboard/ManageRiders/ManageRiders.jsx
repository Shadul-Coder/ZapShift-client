import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { MdPendingActions } from "react-icons/md";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ManageRiders = () => {
  const secure = useSecure();
  const navigate = useNavigate();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders"],
    queryFn: () => secure("riders").then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  const handleStatusUpdate = (id, info) => {
    secure.patch(`/riders/${id}`, info).then((res) => {
      refetch();
      if (res.data.userUpdate?.modifiedCount) {
        Swal.fire({
          title: "Approved",
          text: "Rider application has been approved",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Rejected",
          text: "Rider application has been rejected",
          icon: "error",
        });
      }
    });
  };
  const handleApprove = (id, status, email) => {
    Swal.fire({
      title: "Approve Rider?",
      text: "Confirm to approve this rider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        const info = { newStatus: status, email };
        handleStatusUpdate(id, info);
      }
    });
  };
  const handleReject = (id, status, email) => {
    Swal.fire({
      title: "Reject Rider?",
      text: "Confirm to reject this application",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Yes, Reject",
    }).then((result) => {
      if (!result.isConfirmed) {
        const info = { newStatus: status, email };
        handleStatusUpdate(id, info);
      }
    });
  };
  return (
    <>
      <title>Manage Riders | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Manage All Riders
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-7">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Total Riders
                </p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {data.length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-secondary text-xl">
                  <PiPersonSimpleBikeBold />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Approved
                </p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {data.filter((rider) => rider.status === "approved").length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-secondary text-xl">
                  <SiTicktick />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Pending
                </p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {data.filter((rider) => rider.status === "pending").length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-secondary text-xl">
                  <MdPendingActions />
                </span>
              </div>
            </div>
          </div>
        </div>
        {data.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex riders-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No applications found
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              All raider submissions will appear here for review
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold text-secondary">
                Riders
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
                      Name
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      NID
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Region
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Bike Model
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((rider, index) => (
                    <tr
                      key={rider._id}
                      className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-3 sm:py-4 sm:px-4">{index + 1}</td>
                      <td className="py-3 px-3 sm:py-4">{rider.name}</td>
                      <td className="py-3 px-3 sm:py-4">{rider.nidNo}</td>
                      <td className="py-3 px-3 sm:py-4">
                        {rider.district}, {rider.division}
                      </td>
                      <td className="py-3 px-3 sm:py-4">{rider.bikeModel}</td>
                      <td
                        className={`py-3 px-3 sm:py-4 ${
                          rider.status === "approved" && "text-[#0ab010]"
                        } ${rider.status === "pending" && "text-[#f99d25]"} ${
                          rider.status === "rejected" && "text-[#e83330]"
                        }`}
                      >
                        {rider.status}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="flex justify-center gap-1.5">
                          {rider.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleApprove(
                                    rider._id,
                                    "approved",
                                    rider.email
                                  )
                                }
                                className="text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleReject(
                                    rider._id,
                                    "rejected",
                                    rider.email
                                  )
                                }
                                className="text-sm font-medium bg-[#f3e1e1] text-[#e83330] hover:bg-[#e9d8d8] active:bg-[#e0cfcf] transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() =>
                              navigate(`/dashboard/manage-riders/${rider._id}`)
                            }
                            className="text-sm font-medium bg-[#e0ebec] hover:bg-[#d7e2e3] active:bg-[#ced8d9] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ManageRiders;
