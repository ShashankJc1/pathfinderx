"use client";

import { useState } from "react";

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
    <div className="flexCenter min-h-screen bg-gray-100 px-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="General">General Inquiry</option>
            <option value="Support">Support</option>
            <option value="Sales">Sales</option>
            <option value="Feedback">Feedback</option>
          </select>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Enter your message"
            className="w-full px-4 py-2 border rounded-lg"
            rows={4}
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
