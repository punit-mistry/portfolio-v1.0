import SparklesCore from "@/components/sparkles";
const section = () => {
  return (
    <div>
      <div className="h-[100vh] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-screen absolute inset-0 min-h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className=" md:text-7xl text-3xl lg:text-6xl font-bold  text-white relative z-20">
          Hi,
          <br />
          I'm Punit,
          <br />
          Full Stack Developer .
        </h1>
      </div>
    </div>
  );
};

export default section;
