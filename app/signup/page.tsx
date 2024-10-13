"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignUpFormInputs>();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: SignUpFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Signing up with:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    alert("Signup successful!");
    router.push("/login"); // Redirect to login after signup
  };

  return (
    <div className="flexCenter min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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
