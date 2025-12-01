import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useSecure from "../../../hooks/useSecure";
import Loading from "../../../components/Loading/Loading";

const RiderDetails = () => {
  const { id } = useParams();
  const secure = useSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["rider", id],
    queryFn: () => secure.get(`/riders/${id}/info`).then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Rider Info | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Rider Details
        </h1>
        <div className="space-y-3.5 xl:space-y-5">
          <div className="flex flex-col gap-3.5 lg:flex-row xl:gap-5">
            <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl lg:flex-1">
              <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
                Personal Info
              </h2>
              <div className="flex gap-1.5">
                <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                  <p>Name</p>
                  <p>Email</p>
                  <p>Phone</p>
                  <p>NID No</p>
                  <p>License No</p>
                  <p>Region</p>
                  <p>Status</p>
                </div>
                <div className="font-medium md:text-lg lg:text-base xl:text-lg">
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.name}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.email}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.phoneNumber}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.nidNo}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.licenseNum}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.district}, {data.division}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.status === "approved" && "Approved"}
                    {data.status === "pending" && "Pending"}
                    {data.status === "rejected" && "Rejected"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl lg:flex-1">
              <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
                Bike & Timeline Info
              </h2>
              <div className="flex gap-1.5">
                <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                  <p>Bike Model</p>
                  <p>Bike Reg No</p>
                  <p>Submitted At</p>
                  <p>Reviewed At</p>
                </div>
                <div className="font-medium md:text-lg lg:text-base xl:text-lg">
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.bikeModel}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.bikeRegNo}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {new Date(data.submittedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <span className="px-2 sm:px-3 md:px-5">:</span>
                    {data.reviewedAt
                      ? new Date(data.reviewedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Not reviewed yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f5] p-3.5 sm:p-6 md:p-7 md:rounded-2xl rounded-xl">
            <h2 className="mb-2 text-xl md:text-2xl font-semibold text-secondary">
              About Rider
            </h2>
            <div className="flex gap-1.5">
              <div className="text-gray-500 md:text-lg lg:text-base xl:text-lg font-medium">
                <p>Bio</p>
              </div>
              <div className="font-medium md:text-lg lg:text-base xl:text-lg flex-1">
                <p>
                  <span className="px-2 sm:px-3 md:px-5">:</span>
                  {data.aboutRider || "No bio provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RiderDetails;
