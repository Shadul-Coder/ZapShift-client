import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading/Loading";
import useSecure from "../../../hooks/useSecure";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const SendParcel = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const secure = useSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: () => axios.get("/warehouses").then((res) => res.data),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate();
  const handleParcel = (formData) => {
    const deliveryCharge = parseInt(
      calculatePrice(
        formData.isDocument,
        formData.senderDistrict,
        formData.receiverDistrict,
        parseFloat(formData.weight)
      )
    );
    Swal.fire({
      title: "Confirm Parcel Delivery",
      text: `Delivery charge will be $${deliveryCharge}. Ready to proceed?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed to Pay",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelsData = { ...formData, deliveryCharge, email: user.email };
        secure.post("/parcels", parcelsData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Parcel Scheduled!",
              text: "Complete payment to confirm delivery",
              icon: "success",
            });
            navigate("/dashboard/my-parcels");
          }
        });
      }
    });
  };
  const regionSen = useWatch({
    control,
    name: "senderDivision",
  });
  const regionRec = useWatch({
    control,
    name: "receiverDivision",
  });
  const districtByRegion = (region) => {
    return data
      .filter((district) => district.region === region)
      .map((city) => city.district);
  };
  const calculatePrice = (isDoc, senDis, recDis, wei) => {
    if (isDoc === "true") {
      if (senDis === recDis) {
        return 70;
      } else {
        return 90;
      }
    } else {
      if (wei > 3.0) {
        if (senDis === recDis) {
          return 130 + (wei - 3.0) * 50;
        } else {
          return 170 + (wei - 3.0) * 50 + 50;
        }
      } else {
        if (senDis === recDis) {
          return 130;
        } else {
          return 170;
        }
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Send Parcel | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Send A Parcel
        </h1>
        <h2 className="pb-7 md:pb-9 text-secondary text-center md:text-start text-xl sm:text-2xl font-semibold border-b border-gray-200">
          Enter your parcel details
        </h2>
        <form onSubmit={handleSubmit(handleParcel)}>
          <div className="py-7 md:py-9 space-y-2 lg:space-y-4 border-b border-gray-200">
            <div className="flex gap-5">
              <label
                htmlFor="document"
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="radio"
                  value={true}
                  {...register("isDocument")}
                  className="radio checked:text-primary checked:border-primary"
                  defaultChecked
                  id="document"
                />
                <span>Document</span>
              </label>
              <label
                htmlFor="nonDocument"
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <input
                  type="radio"
                  name="radio"
                  value={false}
                  {...register("isDocument")}
                  className="radio checked:text-primary checked:border-primary"
                  id="nonDocument"
                />
                <span>Non-Document</span>
              </label>
            </div>
            <div className="space-y-2 md:flex gap-3 lg:gap-5">
              <div className="md:flex-1">
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Parcel Name :
                </label>
                <input
                  type="text"
                  {...register("parcelName", {
                    required: "Parcel name is required",
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Parcel Name"
                />
                {errors.parcelName && (
                  <span className="text-red-500 text-sm">
                    {errors.parcelName.message}
                  </span>
                )}
              </div>
              <div className="md:flex-1">
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Parcel Weight (KG) :
                </label>
                <input
                  type="text"
                  {...register("weight", {
                    required: "Weight is required",
                    pattern: {
                      value: /^(?:0*[1-9]\d*(?:\.\d+)?|0*\.\d*[1-9]\d*)$/,
                      message: "Weight must be greater than zero",
                    },
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Parcel Weight (KG)"
                />
                {errors.weight && (
                  <span className="text-red-500 text-sm">
                    {errors.weight.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="md:flex gap-3 lg:gap-5">
            <div className="py-7 md:py-9 space-y-2 lg:space-y-4 md:flex-1">
              <h3 className="text-lg sm:text-xl font-semibold">
                Sender Details
              </h3>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Sender Name :
                </label>
                <input
                  type="text"
                  {...register("senderName", {
                    required: "Sender name is required",
                    pattern: {
                      value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                      message: "Enter a valid name",
                    },
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Sender Name"
                />
                {errors.senderName && (
                  <span className="text-red-500 text-sm">
                    {errors.senderName.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Sender Address :
                </label>
                <input
                  type="text"
                  {...register("senderAddress", {
                    required: "Sender address is required",
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Sender Address"
                />
                {errors.senderAddress && (
                  <span className="text-red-500 text-sm">
                    {errors.senderAddress.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Sender Phone No :
                </label>
                <input
                  type="text"
                  {...register("senderNumber", {
                    required: "Sender number is required",
                    pattern: {
                      value: /^(?:\+?88)?01[3-9]\d{8}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Sender Phone Number"
                />
                {errors.senderNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.senderNumber.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Sender Division :
                </label>
                <select
                  defaultValue=""
                  {...register("senderDivision", {
                    required: "Sender division is required",
                  })}
                  className="select rounded-lg w-full outline-none focus:border-primary"
                >
                  <option disabled={true} value={""}>
                    Select Sender Division :
                  </option>
                  {[...new Set(data.map((district) => district.region))].map(
                    (region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    )
                  )}
                </select>
                {errors.senderDivision && (
                  <span className="text-red-500 text-sm">
                    {errors.senderDivision.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Sender District :
                </label>
                <select
                  defaultValue=""
                  {...register("senderDistrict", {
                    required: "Sender district is required",
                  })}
                  className="select rounded-lg w-full outline-none focus:border-primary"
                >
                  <option disabled={true} value={""}>
                    Select Sender District :
                  </option>
                  {districtByRegion(regionSen).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <span className="text-red-500 text-sm">
                    {errors.senderDistrict.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Pickup Instruction :
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  className="textarea w-full rounded-lg outline-none focus:border-primary"
                  placeholder="Enter Pickup Instruction (Optional)"
                ></textarea>
              </div>
            </div>
            <div className="py-7 md:py-9 border-t border-gray-200 md:border-none space-y-2 lg:space-y-4 md:flex-1">
              <h3 className="text-lg sm:text-xl font-semibold">
                Receiver Details
              </h3>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Receiver Name :
                </label>
                <input
                  type="text"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                    pattern: {
                      value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                      message: "Enter a valid name",
                    },
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Receiver Name"
                />
                {errors.receiverName && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverName.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Receiver Address :
                </label>
                <input
                  type="text"
                  {...register("receiverAddress", {
                    required: "Receiver address is required",
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Receiver Address"
                />
                {errors.receiverAddress && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverAddress.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Receiver Phone No :
                </label>
                <input
                  type="text"
                  {...register("receiverNumber", {
                    required: "Receiver number is required",
                    pattern: {
                      value: /^(?:\+?88)?01[3-9]\d{8}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className="input rounded-lg w-full outline-none focus:border-primary"
                  placeholder="Enter Receiver Phone Number"
                />
                {errors.receiverNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverNumber.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Receiver Division :
                </label>
                <select
                  defaultValue=""
                  {...register("receiverDivision", {
                    required: "Receiver division is required",
                  })}
                  className="select rounded-lg w-full outline-none focus:border-primary"
                >
                  <option disabled={true} value={""}>
                    Select Receiver Division
                  </option>
                  {[...new Set(data.map((district) => district.region))].map(
                    (region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    )
                  )}
                </select>
                {errors.receiverDivision && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverDivision.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Receiver District :
                </label>
                <select
                  defaultValue=""
                  {...register("receiverDistrict", {
                    required: "Receiver district is required",
                  })}
                  className="select rounded-lg w-full outline-none focus:border-primary"
                >
                  <option disabled={true} value={""}>
                    Select Receiver District
                  </option>
                  {districtByRegion(regionRec).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <span className="text-red-500 text-sm">
                    {errors.receiverDistrict.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                  Delivery Instruction :
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  className="textarea w-full rounded-lg outline-none focus:border-primary"
                  placeholder="Enter Delivery Instruction (Optional)"
                ></textarea>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Submit Shipment"
            className="w-full md:text-center md:max-w-xs border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
          />
        </form>
      </section>
    </>
  );
};

export default SendParcel;
