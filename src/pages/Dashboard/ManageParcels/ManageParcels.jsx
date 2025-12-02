import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const ManageParcels = () => {
  const secure = useSecure();
  const modalRef = useRef();
  const [curParcel, setCurParcel] = useState("");
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingParcels"],
    queryFn: () => secure("/parcels?status=pending").then((res) => res.data),
  });
  const {
    data: riders = [],
    isLoading: riderLoading,
    refetch: riderRefetch,
  } = useQuery({
    queryKey: ["raiders", curParcel, "available"],
    enabled: !!curParcel,
    queryFn: () =>
      secure(`/riders?status=available&dis=${curParcel.district}`).then(
        (res) => res.data
      ),
  });
  const handleParcelAssign = (riderData) => {
    const info = {
      name: riderData.name,
      phoneNumber: riderData.phoneNumber,
      email: riderData.email,
      bikeModel: riderData.bikeModel,
      raiderID: riderData._id,
      parcelID: curParcel.parcelID,
      paymentID: curParcel._id,
    };
    secure.patch("/assign", info).then((res) => {
      if (
        res.data.parcelResult.modifiedCount &&
        res.data.riderResult.modifiedCount
      ) {
        refetch();
        riderRefetch();
        modalRef.current.close();
        Swal.fire({
          title: "Assigned",
          text: "Parcel has been assigned to the rider",
          icon: "success",
        });
      }
    });
  };
  const handleAssign = (parcel) => {
    setCurParcel(parcel);
    modalRef.current.showModal();
  };
  return (
    <>
      <title>Manage Parcels | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Manage All Parcels
        </h1>
        {isLoading ? (
          <Loading />
        ) : parcels.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No parcel found
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              All parcel will appear here for management
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold text-secondary">
                Pending Parcels
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
                      Transaction ID
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Paid On
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Region
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider truncate">
                      Delivery Status
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parcels.map((parcel, index) => (
                    <tr
                      key={parcel._id}
                      className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-3 sm:py-4 sm:px-4">{index + 1}</td>
                      <td className="py-3 px-3 sm:py-4">
                        {parcel.transactionID}
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        {new Date(parcel.paidAt)
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
                      <td className="py-3 px-3 sm:py-4">
                        {parcel.district}, {parcel.division}
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        {parcel.deliveryStatus}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <button
                          onClick={() => handleAssign(parcel)}
                          className="text-sm truncate font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Assign Rider
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box rounded-3xl max-w-xl">
            {!riderLoading && riders.length === 0 ? (
              <>
                <form method="dialog">
                  <button className="absolute right-9 top-9 btn btn-sm btn-circle btn-ghost">
                    ✕
                  </button>
                </form>
                <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
                  <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                    No Riders Available
                  </h3>
                  <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
                    No active riders available in this delivery region
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4">
                  <h2 className=" text-base sm:text-lg font-semibold text-secondary">
                    Available Riders
                  </h2>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost">
                      ✕
                    </button>
                  </form>
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
                        <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider truncate">
                          Bike Reg No
                        </th>
                        <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider truncate">
                          Work Status
                        </th>
                        <th className="py-3 px-2 sm:py-4 text-xs font-semibold text-secondary uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {riders.map((rider, index) => (
                        <tr
                          key={rider._id}
                          className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="py-3 px-3 sm:py-4 sm:px-4">
                            {index + 1}
                          </td>
                          <td className="py-3 px-3 sm:py-4 font-medium">
                            {rider.name}
                          </td>
                          <td className="py-3 px-3 sm:py-4 font-medium truncate">
                            {rider.bikeRegNo}
                          </td>
                          <td className="py-3 px-3 sm:py-4 text-[#0ab010]">
                            {rider.workStatus === "available" && "Available"}
                          </td>
                          <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                            <button
                              onClick={() => handleParcelAssign(rider)}
                              className="text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </dialog>
      </section>
    </>
  );
};

export default ManageParcels;
