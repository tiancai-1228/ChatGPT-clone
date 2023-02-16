"use client";
import React from "react";
import { signIn } from "next-auth/react";
import ChatPGT from "../public/image/ChatPGT.png";

function Login() {
  return (
    <div className="bg-[#202123] h-screen flex flex-col justify-center items-center text-center">
      <p className="text-white font-bold text-3xl animate-pulse  mb-6">
        Robby ChatGPT Clone
      </p>
      <img src={ChatPGT.src} alt="" className="h-20 w-20 mb-6" />
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
