"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isSubmitting } 
  } = useForm<SignUpFormInputs>();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Watch password field to compare with confirmPassword field
  const password = watch("password");

  const onSubmit = async (data: SignUpFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        router.push("/login");
      } else {
        alert(result.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup request failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flexCenter min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                errors.name ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

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
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                errors.password ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: "Confirm your password" })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg ${
                errors.confirmPassword ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
