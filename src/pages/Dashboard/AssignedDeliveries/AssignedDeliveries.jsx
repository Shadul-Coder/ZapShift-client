import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import useSecure from "../../../hooks/useSecure";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user, loading } = useAuth();
  const secure = useSecure();
  const {
    data: assignedParcels,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["assignedParcels", user.email],
    queryFn: () =>
      secure.get(`/rider/${user.email}/parcel`).then((res) => res.data),
  });
  if (loading || isLoading) {
    return <Loading />;
  }
  const handleAccept = (email, id) => {
    Swal.fire({
      title: "Accept This Parcel?",
      text: "You'll be responsible for this delivery",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        secure.patch(`/riders/${id}/accept`, { email }).then((res) => {
          refetch();
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Delivery Accepted",
              text: "Parcel has been added to your delivery list",
              icon: "success",
            });
          }
          if (res.data.message === "already assigned") {
            Swal.fire({
              title: "Cannot Accept",
              text: "Finish your current delivery before accepting another",
              icon: "error",
            });
          }
        });
      }
    });
  };
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Rejecting this parcel will assign it to another rider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Yes, Reject",
    }).then((result) => {
      if (!result.isConfirmed) {
        secure.patch(`/riders/${id}/reject`).then((res) => {
          if (
            res.data.parcelResult.modifiedCount &&
            res.data.paymentResult.modifiedCount &&
            res.data.trackResult.modifiedCount
          ) {
            refetch();
            Swal.fire({
              title: "Delivery Declined",
              text: "The parcel has been removed from your assignments",
              icon: "error",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <title>Assigned Parcels | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          My Assigned Parcels
        </h1>
        {assignedParcels.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No parcels assigned yet
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              Check back soon for assigned parcels updates
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold text-secondary">
                Assigned Parcels
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
                      Sender Info
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Reciever Info
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      weight
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assignedParcels.map((assignedParcel, index) => (
                    <tr
                      key={assignedParcel._id}
                      className="hover:bg-[#FDFEF9] transition-colors duration-150 bg-gray-50"
                    >
                      <td className="py-3 px-3 sm:py-4 sm:px-4">{index + 1}</td>
                      <td className="py-3 px-3 sm:py-4">
                        {assignedParcel.parcelName}
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">
                            {assignedParcel.senderName}
                          </h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {assignedParcel.senderDistrict},{" "}
                            {assignedParcel.senderDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {assignedParcel.senderNumber}
                          </h6>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">
                            {assignedParcel.receiverName}
                          </h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {assignedParcel.receiverDistrict},{" "}
                            {assignedParcel.receiverDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {assignedParcel.receiverNumber}
                          </h6>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4 truncate">
                        {assignedParcel.weight} KG
                      </td>
                      <td className="py-3 px-3 font-medium sm:py-4 text-[#0ab010]">
                        ${assignedParcel.deliveryCharge}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="flex justify-center gap-1.5">
                          <button
                            onClick={() =>
                              handleAccept(
                                assignedParcel.riderInfo.email,
                                assignedParcel._id
                              )
                            }
                            className="text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(assignedParcel._id)}
                            className="text-sm font-medium bg-[#f3e1e1] text-[#e83330] hover:bg-[#e9d8d8] active:bg-[#e0cfcf] transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Reject
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

export default AssignedDeliveries;
