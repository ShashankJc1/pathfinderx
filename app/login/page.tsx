"use client";

import { useForm } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Email:', data.email);
    console.log('Password:', data.password);
    // Add your login logic here
  };

  return (
    <div className="flexCenter min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-green-500'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
