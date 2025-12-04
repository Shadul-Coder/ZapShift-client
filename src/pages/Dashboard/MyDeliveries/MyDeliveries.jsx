import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Swal from "sweetalert2";

const MyDeliveries = () => {
  const { user, loading } = useAuth();
  const secure = useSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my deliveries", user.email],
    queryFn: () =>
      secure.get(`/rider/${user.email}/assigned`).then((res) => res.data),
  });
  if (loading || isLoading) {
    return <Loading />;
  }
  const handlePickUp = (trackingID, riderEmail) => {
    Swal.fire({
      title: "Parcel Collection",
      text: "Have you physically collected the parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        secure
          .patch("/parcels/updatestatus", {
            status: "picked-up",
            trackingID,
            riderEmail,
          })
          .then((res) => {
            refetch();
            if (
              res.data.parcelResult.modifiedCount &&
              res.data.paymentResult.modifiedCount &&
              res.data.riderResult.modifiedCount &&
              res.data.trackResult.modifiedCount
            ) {
              Swal.fire({
                title: "Parcel Collected",
                text: "Parcel is now in your possession. Go for delivery",
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleDelivered = (trackingID, riderEmail, parcelID, amount) => {
    Swal.fire({
      title: "Delivery Completed?",
      text: "Confirm you have delivered the parcel to the recipient",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        secure
          .patch("/parcels/updatestatus", {
            status: "delivered",
            trackingID,
            riderEmail,
            parcelID,
            amount,
          })
          .then((res) => {
            refetch();
            if (
              res.data.parcelResult.modifiedCount &&
              res.data.paymentResult.modifiedCount &&
              res.data.riderResult.modifiedCount &&
              res.data.trackResult.modifiedCount &&
              res.data.deliveryResult.insertedId
            ) {
              Swal.fire({
                title: "Delivery Successful",
                text: "Parcel delivery process completed",
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleWithdraw = (email, trackingID, amount) => {
    Swal.fire({
      title: "Withdraw Earnings?",
      text: "Transfer your earnings to your credit",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        secure
          .patch(`/riders/${email}/withdraw`, { trackingID, amount })
          .then((res) => {
            refetch();
            if (
              res.data.riderResult.modifiedCount &&
              res.data.deliveryResult.modifiedCount
            ) {
              Swal.fire({
                title: "Payment Received",
                text: "Earnings transferred to your account",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <title>My Deliveries | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          My All Deliveries
        </h1>
        <div>
          {!data.assignedResult ? (
            <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
              <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                Delivery Queue Empty
              </h3>
              <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
                Your accepted deliveries will appear here
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="text-base sm:text-lg font-semibold text-secondary">
                  Current Parcels
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-3xl sm:min-w-full">
                  <thead>
                    <tr className="bg-[#F3FADC]">
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
                    <tr className="hover:bg-[#FDFEF9] transition-colors duration-150 bg-gray-50">
                      <td className="py-3 px-3 sm:py-4">
                        {data.assignedResult.parcelName}
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">
                            {data.assignedResult.senderName}
                          </h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {data.assignedResult.senderDistrict},{" "}
                            {data.assignedResult.senderDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {data.assignedResult.senderNumber}
                          </h6>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">
                            {data.assignedResult.receiverName}
                          </h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {data.assignedResult.receiverDistrict},{" "}
                            {data.assignedResult.receiverDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {data.assignedResult.receiverNumber}
                          </h6>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4 truncate">
                        {data.assignedResult.weight} KG
                      </td>
                      <td className="py-3 px-3 font-medium sm:py-4 text-[#0ab010]">
                        ${data.assignedResult.deliveryCharge}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        {data.assignedResult.deliveryStatus === "assigned" && (
                          <button
                            onClick={() =>
                              handlePickUp(
                                data.assignedResult.trackingID,
                                data.assignedResult.riderInfo.email
                              )
                            }
                            className="text-sm font-medium bg-primary truncate hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Mark As Picked Up
                          </button>
                        )}
                        {data.assignedResult.deliveryStatus === "picked-up" && (
                          <button
                            onClick={() =>
                              handleDelivered(
                                data.assignedResult.trackingID,
                                data.assignedResult.riderInfo.email,
                                data.assignedResult._id,
                                data.assignedResult.deliveryCharge
                              )
                            }
                            className="text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                          >
                            Mark As Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 xl:mt-9">
          {data.deliveryResult.length === 0 ? (
            <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
              <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                No Delivery History
              </h3>
              <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
                Your completed deliveries will be listed here
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="text-base sm:text-lg font-semibold text-secondary">
                  Delivered Parcels
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
                        Parcel ID
                      </th>
                      <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Tracking ID
                      </th>
                      <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                        Delivery Time
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
                    {data.deliveryResult.map((parcel, index) => (
                      <tr
                        key={parcel._id}
                        className="hover:bg-[#FDFEF9] transition-colors duration-150 bg-gray-50"
                      >
                        <td className="py-3 px-3 sm:py-4 sm:px-4">
                          {index + 1}
                        </td>
                        <td className="py-3 px-3 sm:py-4">{parcel.parcelID}</td>
                        <td className="py-3 px-3 sm:py-4 truncate">
                          {parcel.trackingID}
                        </td>
                        <td className="py-3 px-3 sm:py-4">
                          {new Date(parcel.deliveredAt)
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
                        <td className="py-3 px-3 font-medium sm:py-4 text-[#0ab010]">
                          ${parcel.amount}
                        </td>
                        <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                          {!parcel.withdraw ? (
                            <button
                              onClick={() =>
                                handleWithdraw(
                                  parcel.riderEmail,
                                  parcel.trackingID,
                                  parcel.amount
                                )
                              }
                              className="text-sm font-medium bg-primary truncate hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Withdraw Earnings
                            </button>
                          ) : (
                            <span className="text-gray-500 truncate">
                              Earnings Withdrawn
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyDeliveries;
