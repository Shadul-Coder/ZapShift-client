import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { SlSocialDropbox } from "react-icons/sl";
import { SiTicktick } from "react-icons/si";
import { MdPendingActions } from "react-icons/md";

const MyParcels = () => {
  const { user } = useAuth();
  const secure = useSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: () => secure.get(`/parcels/${user.email}`).then((res) => res.data),
  });
  useEffect(() => {
    if (session_id) {
      secure.patch(`/payment/${session_id}`).then((res) => {
        if (res.data.transactionID && res.data.trackingID) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `
                  Your payment has been processed successfully
                  <br>
                  <br>
                  <strong>Transaction ID :</strong> ${res.data.transactionID}
                  <br>
                  <strong>Tracking ID :</strong> ${res.data.trackingID}
                `,
          });
          navigate(location.pathname);
        }
      });
    }
  }, [session_id, secure, refetch, navigate, location.pathname]);
  useEffect(() => {
    if (location.search.includes("false")) {
      navigate(location.pathname);
      Swal.fire({
        title: "Transaction Failed",
        text: "Payment error. Check your details and try again",
        icon: "error",
      });
    }
  }, [location.search, navigate, location.pathname]);
  if (isLoading) {
    return <Loading />;
  }
  const handlePay = (parcel) => {
    Swal.fire({
      title: "Proceed to Payment",
      text: `Pay $${parcel.deliveryCharge} for delivery. Continue to checkout?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        secure.post("/payment", parcel).then((res) => {
          window.location.href = res.data.url;
        });
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Parcel?",
      text: "Are you sure? This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Yes, Delete",
    }).then((result) => {
      if (!result.isConfirmed) {
        secure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been successfully deleted",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <title>My Parcels | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          All My Parcels
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-7">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">
                  Total Parcels
                </p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {parcels.length}
                </p>
              </div>
              <div className="p-3 bg-base-200 rounded-xl">
                <span className="text-secondary text-xl">
                  <SlSocialDropbox />
                </span>
              </div>
            </div>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70 font-medium">Paid</p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {
                    parcels.filter((item) => item.paymentStatus === "paid")
                      .length
                  }
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
                  Unpaid
                </p>
                <p className="text-2xl text-secondary font-bold mt-1">
                  {
                    parcels.filter((item) => item.paymentStatus !== "paid")
                      .length
                  }
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
        {parcels.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No parcels yet
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              Get started by sending your first parcel
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold text-secondary">
                Parcels
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
                      Delivery
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {parcels.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-3 sm:py-4 sm:px-4">{index + 1}</td>
                      <td className="py-3 px-3 sm:py-4">{item.parcelName}</td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">{item.senderName}</h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {item.senderDistrict}, {item.senderDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {item.senderNumber}
                          </h6>
                        </div>
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        <div>
                          <h5 className="font-medium">{item.receiverName}</h5>
                          <h6 className="text-sm text-gray-500 truncate">
                            {item.receiverDistrict}, {item.receiverDivision}
                          </h6>
                          <h6 className="text-sm text-gray-500">
                            {item.receiverNumber}
                          </h6>
                        </div>
                      </td>
                      <td
                        className={`py-3 px-3 sm:py-4 ${
                          item.deliveryStatus === "pending"
                            ? "text-[#f99d25]"
                            : "text-[#0ab010]"
                        }`}
                      >
                        {item.deliveryStatus}
                      </td>
                      <td className="py-3 px-3 font-medium sm:py-4">
                        ${item.deliveryCharge}
                      </td>
                      <td
                        className={`py-3 px-3 sm:py-4 ${
                          item.paymentStatus === "paid"
                            ? "text-[#0ab010]"
                            : "text-[#f99d25]"
                        }`}
                      >
                        {item.paymentStatus}
                      </td>
                      <td className="py-3 px-4 sm:py-4 sm:px-5 lg:px-6">
                        <div className="flex justify-center gap-1.5">
                          {item.paymentStatus === "unpaid" && (
                            <button
                              onClick={() => handlePay(item)}
                              className="text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Pay
                            </button>
                          )}
                          <button
                            onClick={() =>
                              navigate(`/dashboard/my-parcels/${item._id}`)
                            }
                            className="text-sm font-medium bg-[#e0ebec] hover:bg-[#d7e2e3] active:bg-[#ced8d9] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                          >
                            View
                          </button>
                          {item.paymentStatus === "unpaid" && (
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="text-sm font-medium bg-[#f3e1e1] text-[#e83330] hover:bg-[#e9d8d8] active:bg-[#e0cfcf] transition-all duration-200 px-4 py-2 rounded-lg cursor-pointer"
                            >
                              Delete
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
        )}
      </section>
    </>
  );
};

export default MyParcels;
