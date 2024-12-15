import Link from "next/link";
import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="rounded-lg p-10 max-w-[500px] w-full bg-white">
        <h1 className="text-blue-sky text-2xl font-bold text-center">Login</h1>
        <p className="text-black  my-8">Hi, Welcome Back</p>
        <form>
          <div className="mt-2">
            <InputElement
              label="Email"
              type="email"
              id="email"
              className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-2">
            <InputElement
              label="Password"
              type="password"
              id="password"
              className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
              placeholder="Enter your password"
            />
          </div>
          <p className="text-blue-sky text-end my-4">
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </p>
          <ButtonElement className="w-full bg-blue-sky text-white p-2 rounded-full">Login</ButtonElement>
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500">Login with</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <ButtonElement className="w-full border border-blue-sky text-blue-sky p-2 rounded-full">Google</ButtonElement>

        <p className="text-center mt-8 text-black">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-sky font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
