"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setErrorMessage(error);
        return;
      }

      const { token } = await response.json();
      document.cookie = `token=${token}; path=/`;

      alert("Login successful!");

      // Small delay to ensure the token is set before redirect
      setTimeout(() => {
        router.push("/pages/dashboard");
      }, 300);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div
      className="flexCenter min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/login.jpg')" }} // Using the uploaded background image
    >
      <div className="w-full max-w-md bg-white/90 p-8 rounded-lg shadow-lg border border-gray-200 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login to PathfinderX</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-1 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-1 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/pages/signup")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
