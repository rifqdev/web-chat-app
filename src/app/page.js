import SplashScreen from "@/components/elements/splash-screen";

export default function Home() {
  return (
    <div className="grid grid-cols-12 h-screen">
      <SplashScreen />
      <div className="bg-blue-400 col-span-3 p-2">
        <h1 className="text-black">Chat page kiri</h1>
      </div>
      <div className="bg-red-400 col-span-9 p-2">
        <h1 className="text-black">Chat page Kanan</h1>
      </div>
    </div>
  );
}
