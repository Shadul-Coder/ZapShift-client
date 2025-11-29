import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Signin = () => {
  const { user, setLoading, googleSignIn, emailSignIn } = useAuth();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [remember, setRemember] = useState(localStorage.getItem("email") || "");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(location.state || "/");
    }
  }, [user, location.state, navigate]);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  const handleSignIn = (data) => {
    emailSignIn(data.email, data.password)
      .then(() => {
        if (data.remember) {
          localStorage.setItem("email", data.email);
          setRemember(data.email);
        }
        Swal.fire({
          icon: "success",
          title: "SignIn Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
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
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "SignIn Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
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
      <title>Sign In | ZapShift</title>
      <div className="mt-35 mb-20">
        <div className="space-y-3.5 mb-7 md:mb-10">
          <h1 className="text-3xl text-secondary md:text-start lg:text-5xl font-bold text-center sm:text-4xl">
            Welcome Back
          </h1>
          <p className="text-center sm:text-lg md:text-left">
            Sign In With ZapShift
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignIn)}
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
              defaultValue={remember}
              placeholder="Enter Your Email"
              className="px-3.5 py-1.5 border border-[#cbd5e1] rounded-lg focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Password :</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter Your Password"
                className="w-full px-3.5 py-1.5 border border-[#cbd5e1] rounded-lg focus:outline-none"
              />
              <button
                className="absolute top-2.5 right-3 cursor-pointer"
                onClick={handleShowPass}
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="-mt-1.5 flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="checkbox"
                {...register("remember")}
              />
              <span className="ml-2 text-gray-500 cursor-pointer">
                Remember me
              </span>
            </label>
            <Link
              to={"/forgot-password"}
              className="text-sm text-gray-500 hover:underline active:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="w-full space-y-3">
            <div className="text-sm text-gray-500 w-full flex gap-1">
              <p>New to our website? </p>
              <Link
                className="hover:underline active:underline text-[#acc857]"
                to={"/signup"}
                state={location.state}
              >
                Sign Up
              </Link>
            </div>
            <input
              type="submit"
              value="Sign In"
              className="w-full cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 text-secondary font-semibold py-2 rounded-lg"
            />
          </div>
        </form>
        <div className="flex justify-center mt-3">
          <p className="text-gray-400">OR</p>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full cursor-pointer mt-3 bg-[#e9ecf1] hover:bg-[#F0F2F6] active:bg-[#E3E6EB] transition-colors duration-300 flex justify-center items-center gap-1.5 text-secondary font-semibold py-2 rounded-lg"
        >
          <FcGoogle className="text-xl" /> Continue With Google
        </button>
      </div>
    </>
  );
};

export default Signin;
