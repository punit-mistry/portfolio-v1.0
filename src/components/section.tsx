import React from 'react'
import { GoogleGeminiEffect } from "@/components/google-gemini-effect";
import SparklesCore from "@/components/sparkles"
import { useScroll, useTransform } from "framer-motion";
const section = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });
    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <div>
         {/* <div className=" p-2 h-[500vh]">
        <GoogleGeminiEffect
        title='Punit Mistry'
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div> */}
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
        <br/>
        I'm Punit,
        <br/>
        Full Stack Developer .
      </h1>
    </div>
    </div>
  )
}

export default section