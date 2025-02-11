import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "../config/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validation = z.object({
  name: z.string().min(3, "minimum 3 characters required").max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "minimum 8 characters required")
    .max(255)
    .regex(/[a-z]/, "at least one lowercase character required")
    .regex(/[A-Z]/, "at least one uppercase character required")
    .regex(/[0-9]/, "at least one number required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
    mode: "onChange",
  });
  const create = async (data) => {
    try {
      console.log("Sending Data:", data);

      let res = await API.post("/user/signup", {
        name: data.name,
        email: data.email,
        role: "user",
        password: data.password,
      });
      const { user, tokendata } = res.data;

      if (res.data?.success) {
        Cookies.set("token", tokendata, { expires: 2 });
        toast.success("Signup successful! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/"), 3000);
      } else {
        // toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
        // setTimeout(() => navigate("/login"), 3000);
        alert('email not found');
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (error.response) {
        console.error("Backend Error:", error.response.data);
        toast.warn('email allReady axist', { position: "top-right", autoClose: 3000 });
        setTimeout(() => navigate("/login"), 3000);
      } else {
        alert("Network error or server not responding");
      }
    }
  };

  const onSubmit = (data) => {
    // console.log("Submitted Data:", data);
    create(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 border overflow-hidden">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              {...register("name")}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
              required
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-300"
              required
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
