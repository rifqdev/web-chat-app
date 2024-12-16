"use client";
import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";
import { forgotPassword } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const data = {
      email,
    };
    const response = await forgotPassword(data);
    alert(response.message);
    if (response.status === "success") {
      localStorage.setItem("email", email);
      router.push("/auth/verification");
    }
  };
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="rounded-lg p-10 max-w-[500px] w-full bg-white">
        <h1 className="text-blue-sky text-2xl font-bold text-center">Forgot Password</h1>
        <p className="text-black  my-8">You'll get messages soon on your email</p>
        <form onSubmit={handleForgotPassword}>
          <div className="mt-2">
            <InputElement
              label="Email"
              type="email"
              id="email"
              className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <ButtonElement className="w-full bg-blue-sky text-white p-2 rounded-full mt-8">Send</ButtonElement>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
