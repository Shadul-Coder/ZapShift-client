import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import icon from "../../../assets/image-upload-icon.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const { user, setUser, setLoading, googleSignIn, emailRegister, update } =
    useAuth();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
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
  const imageFile = useWatch({
    control,
    name: "image",
  });
  const handleSignUp = (data) => {
    emailRegister(data.email, data.password)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "SignUp Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        const formData = new FormData();
        formData.append("image", imageFile[0]);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_imgbbKey
            }`,
            formData
          )
          .then((response) => {
            const url = response.data.data.url;
            update(res.user, data.name, url)
              .then(() => {
                setUser({ ...res.user });
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
          title: "SignUp Successful!",
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
      <title>Sign Up | ZapShift</title>
      <div className="mt-35 mb-20">
        <div className="space-y-3.5 mb-7 md:mb-10">
          <h1 className="text-3xl text-secondary md:text-start lg:text-5xl font-bold text-center sm:text-4xl">
            Create Account
          </h1>
          <p className="text-center sm:text-lg md:text-left">
            Sign Up With ZapShift
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="min-w-[400px] flex flex-col gap-4 max-lg:min-w-[330px] max-md:min-w-[400px] max-sm:min-w-[85vw]"
        >
          <div className="flex items-center gap-3">
            <label
              className="text-sm font-semibold cursor-pointer"
              htmlFor="photo"
            >
              <img src={icon} alt="" />
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              id="photo"
              className="hidden"
            />
            {imageFile?.length === 1 && (
              <span className="text-sm text-gray-500">{imageFile[0].name}</span>
            )}
          </div>
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Name :</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                  message: "Enter a valid name",
                },
              })}
              placeholder="Enter Your Name"
              className="px-3.5 py-1.5 border border-[#cbd5e1] rounded-lg focus:outline-none"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
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
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Password :</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message: "Use uppercase, lowercase, number, min 6 chars",
                  },
                })}
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
          <div className="-mt-1.5">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="checkbox"
                {...register("terms", {
                  required: "You must accept our terms and conditions",
                })}
              />
              <span className="ml-2 text-gray-500 cursor-pointer">
                Accept our terms & conditions
              </span>
            </label>
          </div>
          <div className="w-full space-y-3">
            <div className="text-sm text-gray-500 w-full flex gap-1">
              <p>Already have an account? </p>
              <Link
                className="hover:underline active:underline text-[#acc857]"
                to={"/signin"}
                state={location.state}
              >
                Sign In
              </Link>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="w-full cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 text-secondary font-semibold py-2 rounded-lg"
            />
          </div>
          {errors.terms && (
            <span className="text-red-500 text-center text-sm">
              {errors.terms.message}
            </span>
          )}
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

export default Signup;
