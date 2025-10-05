import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"; // assuming you have AuthContext
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function Login() {
  const { register, handleSubmit, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      login(response.data.user, response.data.token);

      navigate("/"); 
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError("email", { message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="Email"
        {...register("email", { required: true })}
        className="border px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true })}
        className="border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-yellow-500 text-white rounded py-2">
        Login
      </button>
    </form>
  );
}
