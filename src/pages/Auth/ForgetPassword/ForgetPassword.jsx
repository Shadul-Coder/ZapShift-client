import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ForgetPassword = () => {
  const { setLoading, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleReset = (data) => {
    resetPassword(data.email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Check Your Mail!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/signin");
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      <title>Forgot Password | ZapShift</title>
      <div className="mt-35 mb-20">
        <div className="space-y-3.5 mb-7 md:mb-10">
          <h1 className="text-3xl text-secondary md:text-start lg:text-5xl font-bold text-center sm:text-4xl">
            Forgot Password
          </h1>
          <p className="text-center sm:text-lg md:text-left">
            Enter Your Email Address To Get A Reset Link
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleReset)}
          className="min-w-[400px] flex flex-col gap-4 max-lg:min-w-[330px] max-md:min-w-[400px] max-sm:min-w-[85vw]"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Email :</label>
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter Your Email"
              className="px-3.5 py-1.5 border border-[#cbd5e1] rounded-lg focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="w-full space-y-3">
            <div className="text-sm text-gray-500 w-full flex gap-1">
              <p>Remember your password? </p>
              <Link
                className="hover:underline active:underline text-[#acc857]"
                to={"/signin"}
              >
                Sign In
              </Link>
            </div>
            <input
              type="submit"
              value="Get Mail"
              className="w-full cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 text-secondary font-semibold py-2 rounded-lg"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
