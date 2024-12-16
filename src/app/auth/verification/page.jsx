"use client";
import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";
import { verifyForgotPassword, resendForgotPassword } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const VerifyCodePage = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const data = {
      code,
      new_password: newPassword,
    };
    const response = await verifyForgotPassword(data);
    alert(response.message);
    if (response.status === "success") {
      localStorage.removeItem("email");
      router.push("/auth/login");
    }
  };
  const handleResendCode = async () => {
    const response = await resendForgotPassword();
    alert(response.message);
  };
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="rounded-lg p-10 max-w-[500px] w-full bg-white">
        <h1 className="text-blue-sky text-2xl font-bold text-center">Verify Code</h1>
        <p className="text-black  my-8">Enter the code we sent to your email</p>
        <form onSubmit={handleVerifyCode}>
          <div className="mt-2">
            <InputElement
              label="Code"
              type="text"
              id="code"
              className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <InputElement
              label="New Password"
              type="password"
              id="new-password"
              className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <ButtonElement className="w-full bg-blue-sky text-white p-2 rounded-full mt-8">Verify</ButtonElement>
        </form>
        <p className="mt-5 text-center underline text-blue-sky font-semibold cursor-pointer" onClick={handleResendCode}>
          Resend code
        </p>
      </div>
    </div>
  );
};

export default VerifyCodePage;
