import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Globe } from "lucide-react";

import sidebarLogo from "../assets/sidebarLogo.svg";
import logoText from "../assets/logoText.svg";
import leftImage from "../assets/loginPage/leftImage.png";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex font-inter bg-white overflow-hidden">
      {/* Left Side - Illustration */}
      <div className="  hidden lg:flex lg:py-30 gap-y-0 flex-col w-1/2 bg-white relative items-center justify-center">
        {/* purple gradient underlay  */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_100%_at_center,rgba(98,13,255,0.32)_0%,rgba(120,52,255,0.26)_24%,rgba(160,120,255,0.22)_46%,rgba(196,174,255,0.18)_66%,rgba(228,218,255,0.14)_82%,rgba(255,255,255,0)_100%)] backdrop-blur-lg " />

        <div className="w-full  z-10 h-fit flex flex-row justify-center items-center">
          <img src={sidebarLogo} alt="logo" className="h-28 aspect-square " />

        </div>


        <div className="w-full h-full  z-10 flex items-center justify-center px-10">
          <img
            src={leftImage}
            alt="Dashboard Illustration"
            className="w-full h-full object-contain "
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative  bg-white items-center justify-between  h-full  py-4 overflow-y-auto lg:overflow-hidden ">
        {/* Top Logo */}
        <div className="flex items-center gap-3.5 lg:absolute  z-10 shrink-0">
          <img
            src={sidebarLogo}
            alt="Forza Logo"
            className="h-[40px] w-[40px] lg:h-[52px] lg:w-[52px] object-contain"
          />
          <img
            src={logoText}
            alt="FORZA"
            className="h-[18px] lg:h-[24px] w-auto object-contain"
          />
        </div>

        {/* Form Container */}
        <div className="flex-1   flex w-full items-center justify-center px-4 sm:px-6 mt-8 lg:mt-0">
          <div className="w-full max-w-[530px] max-h-[558px] flex flex-col  items-center bg-white  border border-[#F2E0FB] shadow-[0px_0px_20px_0px_#7158E23D] backdrop-blur-lg rounded-[16px] p-8 sm:p-10 lg:py-[45px] lg:px-[32px] ">
            <h1 className="text-[30px] font-semibold text-[#111827] mb-2 font-inter tracking-tight">
              Log in to your account
            </h1>
            <p className="text-[#6B7280] text-[16px] mb-4 font-inter">
              Welcome back! Please enter your details.
            </p>

            <Formik
              initialValues={{
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setFieldError }) => {
                if (values.email === "fs@gmail.com" && values.password === "admin") {
                  console.log("Login successful:", values);
                  navigate("/select-branch");
                } else {
                  setFieldError("email", "Invalid email or password");
                  setFieldError("password", "Invalid email or password");
                }
              }}
            >
              {({ touched, errors }) => (
                <Form className="flex flex-col gap-[12px]">
                  {/* Email Input */}
                  <div className="flex flex-col gap-1.25">
                    <label className="text-[14px] font-medium text-[#374151] font-inter">
                      Email<span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={`w-full px-3.25 py-[10px] rounded-[8px] border border-[#D0D5DD] bg-white text-[15px] text-[#0D011E] placeholder:text-[#667085] outline-none transition-all duration-200 font-inter
                          ${touched.email && errors.email
                            ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0px_0px_0px_4px_#FFEDED,0px_1px_2px_0px_#FF00001A]"
                            : "border-[#E5E7EB] focus:border-[#8F47EB] focus:shadow-[0px_0px_0px_4px_#F6F0FF,0px_1px_2px_0px_#1018280D]"
                          }
                        `}
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-[#EF4444] text-[13px] font-medium mt-1" />
                  </div>

                  {/* Password Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] font-medium text-[#374151] font-inter">
                      Password<span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter password"
                        className={`w-full px-3.25 py-[10px] rounded-[8px] border border-[#D0D5DD] bg-white text-[15px] text-[#0D011E] placeholder:text-[#667085] outline-none transition-all duration-200 font-inter
                           ${touched.password && errors.password
                            ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0px_0px_0px_4px_#FFEDED,0px_1px_2px_0px_#FF00001A]"
                            : "border-[#E5E7EB] focus:border-[#8F47EB] focus:shadow-[0px_0px_0px_4px_#F6F0FF,0px_1px_2px_0px_#1018280D]"
                          }
                        `}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors p-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} strokeWidth={2} />
                        ) : (
                          <Eye size={18} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-[#EF4444] text-[13px] font-medium mt-1" />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className=" lg:flex-row flex-col flex lg:items-center items-start gap-3 lg:justify-between mt-1">
                    <label className="flex items-center gap-1 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="peer appearance-none w-[15px] h-[15px] border border-[#D0D5DD] rounded-[4px] bg-white checked:bg-[#6F57DE] checked:border-[#6F57DE] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#6F57DE]/30 focus-visible:ring-offset-2"
                        />
                    <svg
                      className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block text-white"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#344054] font-medium group-hover:text-[#374151] transition-colors tracking-tight">
                    Remember for 30 days
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[13px] font-semibold text-[#6F57DE] hover:text-[#5949BE] tracking-tight  transition-colors"
                >
                  Forgot password
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-[#6F57DE] hover:bg-[#5949BE] text-white py-[10px] rounded-[10px] font-semibold text-[15px] mt-2 transition-all duration-200 active:scale-[0.98]"
              >
                Sign in
              </button>

                  {/* Register Link */}
                  <div className="text-center mt-3 text-[14px] text-[#6B7280] font-medium">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-[#6F57DE] hover:text-[#5949BE] transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-[#6B7280] text-[13px] font-medium lg:absolute lg:bottom-[4%] shrink-0 mt-8 lg:mt-0">
          <Globe size={15} strokeWidth={2} />
          <span>www.Sacrosys.com</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
