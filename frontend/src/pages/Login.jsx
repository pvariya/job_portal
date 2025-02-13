import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../config/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

const validation = z.object({
  login: z.string().min(3, "Enter a valid username or email"),
  password: z
    .string()
    .min(8, "Minimum 8 characters required")
    .max(255)
    .regex(/[a-z]/, "At least one lowercase character required")
    .regex(/[A-Z]/, "At least one uppercase character required")
    .regex(/[0-9]/, "At least one number required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
    mode: "onChange",
  });

  const loginUser = async ({ login, password }) => {
    try {
      let res = await API.post(`user/login`, { login, password });
      let { user, tokendata } = res.data;

      Cookies.set("token", tokendata, { expires: 2 });
      toast.success("Login successful! 🎉", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error(error);
      let errorMessage = "Login failed! Please try again.";

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "User not found! Please register first.";
        } else if (error.response.status === 401) {
          errorMessage =
            "Invalid credentials! Please check your username/email and password.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
      Cookies.remove("token");
      
    }
  };

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 border overflow-hidden">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username or Email</label>
            <input
              type="text"
              name="login"
              {...register("login")}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
              required
            />
            {errors.login && <p className="text-red-500">{errors.login.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
              required
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
