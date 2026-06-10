"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      console.log("Forgot password email sent", response.data);
      toast.success("Reset link sent to your email!");
      setSubmitted(true);
    } catch (error: any) {
      console.log("Forgot password failed", error.message);
      toast.error(error.response?.data?.error || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">{loading ? "Processing" : "Forgot Password"}</h1>
      <hr className=" my-4" />

      {submitted ? (
        <div className="flex flex-col items-center">
          <h2 className="p-3 bg-green-500 text-white rounded">
            Check your email for reset link
          </h2>
          <Link href="/login" className="text-blue-500 mt-4">
            Back to Login
          </Link>
        </div>
      ) : (
        <>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button
            onClick={onSubmit}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-blue-500 text-white hover:bg-blue-700"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          <Link href="/login" className="text-blue-500">
            Back to Login
          </Link>
        </>
      )}
    </div>
  );
}
