import Link from "next/link";
import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";

const RegisterPage = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="rounded-lg p-10 max-w-[500px] w-full bg-white">
        <h1 className="text-blue-sky text-2xl font-bold text-center">Register</h1>
        <p className="text-black  my-8">Let's create your account</p>
        <form>
          <InputElement
            label="Name"
            type="text"
            id="name"
            className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
            placeholder="Enter your name"
          />
          <InputElement
            label="Email"
            type="email"
            id="email"
            className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
            placeholder="Enter your email"
          />
          <InputElement
            label="Password"
            type="password"
            id="password"
            className="w-full p-2 border-b border-black focus:outline-none text-black font-bold"
            placeholder="Enter your password"
          />
          <ButtonElement className="w-full bg-blue-sky text-white p-2 rounded-full mt-8">Register</ButtonElement>
        </form>
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500">Register with</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <ButtonElement className="w-full border border-blue-sky text-blue-sky p-2 rounded-full">Google</ButtonElement>

        <p className="text-center mt-8 text-black">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-sky font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
