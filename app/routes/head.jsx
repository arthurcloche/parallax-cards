import Beasthead from "../components/Beasthead";

export default function Index() {
  return (
    <main className="bg-[#0a0a0a]">
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Mr Beast</h2>
      </div>
      <div className="flex items-center justify-center">
        <Beasthead
          className="w-full h-full"
          transform={{ scale: 2.5 }}
          animateModels={false}
        />
      </div>
    </main>
  );
}
