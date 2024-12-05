import InputElement from "@/components/elements/input";
import ButtonElement from "@/components/elements/button";

const ForgotPasswordPage = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <div className="rounded-lg p-10 max-w-[500px] w-full bg-white">
        <h1 className="text-blue-sky text-2xl font-bold text-center">Forgot Password</h1>
        <p className="text-black  my-8">You'll get messages soon on your email</p>
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
          <ButtonElement className="w-full bg-blue-sky text-white p-2 rounded-full mt-8">Send</ButtonElement>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
