"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col justify-center items-center text-center">
      <button
        onClick={() => {
          signIn("google");
        }}
        className="text-white font-bold text-3xl animate-pulse"
      >
        登入
      </button>
    </div>
  );
}

export default Login;
