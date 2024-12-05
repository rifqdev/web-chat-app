"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const SplashScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLogin = localStorage.getItem("access_token");

    // Timer untuk splash screen
    setTimeout(() => {
      setIsLoading(false);
      // Cek login dan navigasi setelah splash screen selesai
      // if (!isLogin) {
      //   router.push("/auth/login");
      // }
    }, 3000);
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#7E98DF]">
      <div className="text-center">
        <Image src="/splash.svg" alt="Logo" width={100} height={100} />
      </div>
    </div>
  );
};

export default SplashScreen;
