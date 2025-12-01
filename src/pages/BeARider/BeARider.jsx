import { useForm, useWatch } from "react-hook-form";
import rider from "../../assets/rider.png";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import useSecure from "../../hooks/useSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const BeARider = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const secure = useSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: () => axios.get("/warehouses").then((res) => res.data),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const regionSen = useWatch({
    control,
    name: "division",
  });
  const districtByRegion = (region) => {
    return data
      .filter((district) => district.region === region)
      .map((city) => city.district);
  };
  const requestRider = (data) => {
    secure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          title: "Application Received",
          text: "Thank you. We'll review your form within 1 week",
          icon: "success",
        });
      }
      if (res.data.message === "already exist rider") {
        Swal.fire({
          title: "Submission Error",
          text: "You are already registered or being processed",
          icon: "error",
        });
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Be A Rider | ZapShift</title>
      <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Be A Rider
        </h1>
        <p className="text-center lg:w-[60%] sm:text-lg md:text-start pb-7 sm:pb-9 lg:pb-11">
          Become a trusted ZAPSHIFT partner. Enjoy flexible hours, competitive
          earnings, and the tools to manage your deliveries seamlessly. Power
          the future of local logistics.
        </p>
        <div className="border-b border-gray-200"></div>
        <h3 className="pt-7 md:pt-9 text-secondary text-center md:text-start text-xl sm:text-2xl font-semibold">
          Tell Us About Yourself
        </h3>
        <div className="flex items-center">
          <div className="flex-1">
            <form onSubmit={handleSubmit(requestRider)}>
              <div className="py-7 md:py-9 space-y-2 lg:space-y-4">
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Your Name :
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                        message: "Enter a valid name",
                      },
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Driving License Number :
                  </label>
                  <input
                    type="text"
                    {...register("licenseNum", {
                      required: "License Number is required",
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter License Number"
                  />
                  {errors.licenseNum && (
                    <span className="text-red-500 text-sm">
                      {errors.licenseNum.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Your Email :
                  </label>
                  <input
                    type="text"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    defaultValue={user.email}
                    disabled
                    placeholder="Enter Your Email"
                    className="input rounded-lg border-gray-300 w-full outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Your Division :
                  </label>
                  <select
                    defaultValue=""
                    {...register("division", {
                      required: "Division is required",
                    })}
                    className="select rounded-lg w-full outline-none focus:border-primary"
                  >
                    <option disabled={true} value={""}>
                      Select Your Division :
                    </option>
                    {[...new Set(data.map((district) => district.region))].map(
                      (region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      )
                    )}
                  </select>
                  {errors.division && (
                    <span className="text-red-500 text-sm">
                      {errors.division.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Your District :
                  </label>
                  <select
                    defaultValue=""
                    {...register("district", {
                      required: "District is required",
                    })}
                    className="select rounded-lg w-full outline-none focus:border-primary"
                  >
                    <option disabled={true} value={""}>
                      Select Your District :
                    </option>
                    {districtByRegion(regionSen).map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <span className="text-red-500 text-sm">
                      {errors.district.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    NID No :
                  </label>
                  <input
                    type="text"
                    {...register("nidNo", {
                      required: "NID Number is required",
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter NID Number"
                  />
                  {errors.nidNo && (
                    <span className="text-red-500 text-sm">
                      {errors.nidNo.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Phone Number :
                  </label>
                  <input
                    type="text"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(?:\+?88)?01[3-9]\d{8}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter Phone Number"
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Bike Model & Year :
                  </label>
                  <input
                    type="text"
                    {...register("bikeModel", {
                      required: "Bike Model & Year is required",
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter Bike Model & Year"
                  />
                  {errors.bikeModel && (
                    <span className="text-red-500 text-sm">
                      {errors.bikeModel.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Bike Registration No :
                  </label>
                  <input
                    type="text"
                    {...register("bikeRegNo", {
                      required: "Registration Number is required",
                    })}
                    className="input rounded-lg w-full outline-none focus:border-primary"
                    placeholder="Enter Bike Registration No"
                  />
                  {errors.bikeRegNo && (
                    <span className="text-red-500 text-sm">
                      {errors.bikeRegNo.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="" className="ml-0.5 text-sm font-semibold">
                    Tell Us About Yourself :
                  </label>
                  <textarea
                    {...register("aboutRider")}
                    className="textarea w-full rounded-lg outline-none focus:border-primary"
                    placeholder="Write About Yourself (Optional)"
                  ></textarea>
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="w-full md:text-center border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
              />
            </form>
          </div>
          <div className="hidden md:block flex-1">
            <img src={rider} alt="" className="w-[80%] mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
};

export default BeARider;
