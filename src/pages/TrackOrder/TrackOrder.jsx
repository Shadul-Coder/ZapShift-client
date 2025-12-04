import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import { TbFileSad } from "react-icons/tb";

const TrackOrder = () => {
  const [search, setSearch] = useState("");
  const axios = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["parceltrack", search],
    queryFn: () => axios.get(`/trackorder/${search}`).then((res) => res.data),
    enabled: !!search,
  });
  return (
    <>
      <title>Track Order | ZapShift</title>
      <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Track Your Order
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(e.target.search.value);
          }}
          className="bg-[#eff2f6] md:max-w-md mb-7 sm:mb-9 rounded-xl flex"
        >
          <button type="submit">
            <HiMiniMagnifyingGlass className="mx-3 text-xl" />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search Tracking ID…"
            className="flex-1 py-3 pr-3 focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 px-5 text-secondary font-semibold rounded-xl"
          >
            Search
          </button>
        </form>
        <div className="my-7 sm:my-9 border-t border-gray-200"></div>
        {!data ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiMiniMagnifyingGlass className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              Track Your Parcel
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              Check the real-time status of your delivery
            </p>
          </div>
        ) : (
          <>
            {!data.trackResult && !data.parcelResult ? (
              <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
                <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <TbFileSad className="text-gray-400 text-2xl md:text-3xl" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
                  Invalid Tracking ID
                </h3>
                <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
                  The tracking ID you entered is not valid
                </p>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col lg:flex-row gap-5 md:gap-7">
                    <div className="flex-1 bg-[#eff2f6] rounded-2xl p-7 sm:p-9 md:p-11 lg:p-13">
                      <h3 className="text-xl md:text-start lg:text-3xl sm:text-2xl pb-3 sm:pb-5 font-semibold text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        Parcel Details
                      </h3>
                      <div className="space-y-5 md:space-y-7">
                        <div className="space-y-1.5 md:space-y-2 sm:text-lg">
                          <p>
                            <span className="font-semibold">
                              Tracking ID :{" "}
                            </span>
                            {data?.parcelResult?.trackingID}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Delivery Charge :
                            </span>{" "}
                            ${data?.parcelResult?.deliveryCharge}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Payment Status :{" "}
                            </span>
                            {data?.parcelResult?.paymentStatus === "paid" && (
                              <span className="text-[#0ab010]">Paid</span>
                            )}
                            {data?.parcelResult?.paymentStatus === "unpaid" && (
                              <span className="text-[#f99d25]">Unpaid</span>
                            )}
                          </p>
                        </div>
                        <div className="space-y-1.5 md:space-y-2 sm:text-lg">
                          <p>
                            <span className="font-semibold">
                              Parcel Name :{" "}
                            </span>
                            {data?.parcelResult?.parcelName}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Parcel Weight :{" "}
                            </span>
                            {data?.parcelResult?.weight}
                          </p>
                        </div>
                        <div className="space-y-1.5 md:space-y-2 sm:text-lg">
                          <p>
                            <span className="font-semibold">
                              Sender Name :{" "}
                            </span>
                            {data?.parcelResult?.senderName}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Sender Region :{" "}
                            </span>
                            {data?.parcelResult?.senderDistrict},{" "}
                            {data?.parcelResult?.senderDivision}
                          </p>
                        </div>
                        <div className="space-y-1.5 md:space-y-2 sm:text-lg">
                          <p>
                            <span className="font-semibold">
                              Receiver Name :{" "}
                            </span>
                            {data?.parcelResult?.receiverName}
                          </p>
                          <p>
                            <span className="font-semibold">
                              Receiver Region :{" "}
                            </span>
                            {data?.parcelResult?.receiverDistrict},{" "}
                            {data?.parcelResult?.receiverDivision}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-[#eff2f6] rounded-2xl p-7 sm:p-9 md:p-11 lg:p-13">
                      <h3 className="text-xl md:text-start lg:text-3xl sm:text-2xl pb-3 sm:pb-5 font-semibold text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                        Tracking Updates
                      </h3>
                      <div className="flex justify-center">
                        <div className="relative max-w-2xl w-full">
                          <div className="absolute left-1/2 transform -translate-x-1/2 h-[90%] mt-3 w-[3px] bg-gray-200 top-0"></div>
                          <div className="space-y-16">
                            {data?.trackResult?.createdAt && (
                              <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                  <div className="timeline-box inline-block">
                                    Parcel Created
                                  </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                  <div className="bg-green-100 p-3 rounded-full border border-white">
                                    <GiCheckMark className="text-[#25bb2f]" />
                                  </div>
                                </div>
                                <div className="w-1/2 pl-8">
                                  <div className="timeline-box inline-block">
                                    {new Date(data?.trackResult?.createdAt)
                                      .toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", "")}
                                  </div>
                                </div>
                              </div>
                            )}
                            {data?.trackResult?.paymentAt && (
                              <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                  <div className="timeline-box inline-block">
                                    Payment Completed
                                  </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                  <div className="bg-green-100 p-3 rounded-full border border-white">
                                    <GiCheckMark className="text-[#25bb2f]" />
                                  </div>
                                </div>
                                <div className="w-1/2 pl-8">
                                  <div className="timeline-box inline-block">
                                    {new Date(data?.trackResult?.paymentAt)
                                      .toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", "")}
                                  </div>
                                </div>
                              </div>
                            )}
                            {data?.trackResult?.assignedAt && (
                              <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                  <div className="timeline-box inline-block">
                                    Rider Assigned
                                  </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                  <div className="bg-green-100 p-3 rounded-full border border-white">
                                    <GiCheckMark className="text-[#25bb2f]" />
                                  </div>
                                </div>
                                <div className="w-1/2 pl-8">
                                  <div className="timeline-box inline-block">
                                    {new Date(data?.trackResult?.assignedAt)
                                      .toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", "")}
                                  </div>
                                </div>
                              </div>
                            )}
                            {data?.trackResult?.pickedUpAt && (
                              <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                  <div className="timeline-box inline-block">
                                    Parcel Picked Up
                                  </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                  <div className="bg-green-100 p-3 rounded-full border border-white">
                                    <GiCheckMark className="text-[#25bb2f]" />
                                  </div>
                                </div>
                                <div className="w-1/2 pl-8">
                                  <div className="timeline-box inline-block">
                                    {new Date(data?.trackResult?.pickedUpAt)
                                      .toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", "")}
                                  </div>
                                </div>
                              </div>
                            )}
                            {data?.trackResult?.deliveredAt && (
                              <div className="relative flex items-center">
                                <div className="w-1/2 pr-8 text-right">
                                  <div className="timeline-box inline-block">
                                    Parcel Delivered
                                  </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2">
                                  <div className="bg-green-100 p-3 rounded-full border border-white">
                                    <GiCheckMark className="text-[#25bb2f]" />
                                  </div>
                                </div>
                                <div className="w-1/2 pl-8">
                                  <div className="timeline-box inline-block">
                                    {new Date(data?.trackResult?.deliveredAt)
                                      .toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                      .replace(",", "")}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default TrackOrder;
