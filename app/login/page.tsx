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
        router.push("/dashboard");
      }, 300);
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="flexCenter min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
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
