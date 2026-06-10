"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log("Email verification success", response.data);
      setverified(true);
    } catch (error: any) {
      console.log("Email verification failed", error.message);
      seterror(true);
    }
  };

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setoken(urltoken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>{" "}
      <Link href="/forgot-password">Forgot Password?</Link>
      {verified && (
        <div>
          <h2 className="p-2 bg-green-500 text-black">Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="p-2 text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
