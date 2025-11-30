import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";

const ParcelDetails = () => {
  const { id } = useParams();
  const secure = useSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["parcel", id],
    queryFn: () => secure.get(`/parcels/${id}/info`).then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Parcel Info | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Parcel Details
        </h1>
        <div className="space-y-3.5 xl:space-y-5">
          <div className="flex flex-col gap-3.5 lg:flex-row xl:gap-5">
            <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl lg:flex-1">
              <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
                Sender Info
              </h2>
              <div className="flex gap-1.5">
                <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                  <p>Name </p>
                  <p>Phone </p>
                  <p>Email </p>
                  <p>Region </p>
                  <p>Address </p>
                </div>
                <div className="font-medium md:text-lg lg:text-base xl:text-lg">
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.senderName}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.senderNumber}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.email}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.senderDistrict}, {data.senderDivision}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.senderAddress}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl lg:flex-1">
              <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
                Receiver Info
              </h2>
              <div className="flex gap-1.5">
                <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                  <p>Name </p>
                  <p>Phone </p>
                  <p>Region </p>
                  <p>Address </p>
                </div>
                <div className="font-medium md:text-lg lg:text-base xl:text-lg">
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.receiverName}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.receiverNumber}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.receiverDistrict}, {data.receiverDivision}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.receiverAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl">
            <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
              Parcel Info
            </h2>
            <div className="flex gap-1.5">
              <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                <p>Title </p>
                <p>Type </p>
                <p>Weight </p>
                <p>Charge </p>
                <p>Payment Status </p>
                <p>Delivery Status </p>
                <p className="hidden md:block">Pickup Instruction </p>
                <p className="hidden md:block">Delivery Instruction </p>
                {data?.trackingID && <p>Tracking ID </p>}
              </div>
              <div className="font-medium md:text-lg lg:text-base xl:text-lg">
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.parcelName}
                </p>
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.isDocument === "true" ? "Document" : "Non-Document"}
                </p>
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.weight} KG
                </p>
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>$
                  {data.deliveryCharge}
                </p>
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                </p>
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.deliveryStatus === "pending" && "Pending"}
                </p>
                <p className="hidden md:block">
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.pickupInstruction}
                </p>
                <p className="hidden md:block">
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.deliveryInstruction}
                </p>
                {data?.trackingID && (
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.trackingID}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParcelDetails;
