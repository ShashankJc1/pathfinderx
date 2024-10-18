"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi"; // Icons

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "General",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you! We will get in touch soon.");
        setFormData({ name: "", email: "", phone: "", inquiry: "General", message: "" });
      } else {
        const result = await response.json();
        alert(result.error || "Failed to submit your message.");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div
      className="relative flexCenter min-h-screen bg-cover bg-center bg-fixed animate-fadeIn"
      style={{ backgroundImage: "url('/contact.jpg')" }} // Ensure this is the correct path to your image
    >
      <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay to enhance readability */}
      <div className="relative z-10 w-full max-w-lg bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-gray-200" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full pl-10 px-4 py-3 bg-white/10 text-white border border-gray-400 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400 placeholder-gray-300"
            />
          </div>
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-gray-200" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full pl-10 px-4 py-3 bg-white/10 text-white border border-gray-400 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400 placeholder-gray-300"
            />
          </div>
          <div className="relative">
            <FiPhone className="absolute top-3 left-3 text-gray-200" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full pl-10 px-4 py-3 bg-white/10 text-white border border-gray-400 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400 placeholder-gray-300"
            />
          </div>
          <select
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 text-white border border-gray-400 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400"
          >
            <option value="General">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
            <option value="Feedback">Feedback</option>
          </select>
          <div className="relative">
            <FiMessageSquare className="absolute top-3 left-3 text-gray-200" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
              className="w-full pl-10 px-4 py-3 bg-white/10 text-white border border-gray-400 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-400 placeholder-gray-300"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
