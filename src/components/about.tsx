import React from "react";
const technologies = [
  "React",
  "Vue",
  "Javascript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "HTML",
  "CSS",
  "Git",
];
const about = () => {
  return (
    <div className=" my-[5rem] lg:my-[10rem] px-[1rem] lg:px-[20rem]  ">
      <div className="text-3xl uppercase font-bold ">About</div>
      <div className="md:mt-4  font-mono">
        <br />
        <br />
        My name is Punit Mistry, a Full Stack Developer and freelance Web
        Developer who finds joy in the dynamic world of technology. Beyond
        coding, I have a passion for gaming, exploring new destinations, and
        anything that excites me on the internet. In my ongoing professional
        journey, I currently contribute as a Frontend Developer at{" "}
        <span className="border-b-2 font-semibold hover:text-blue-600 transition-all hover:cursor-pointer border-black dark:border-white hover:border-b-blue-600 dark:hover:border-b-blue-600">
          IThink Logistics
        </span>
        .
        <br />
        <br />
        During my free time, I am dedicated to continuous learning, exploring
        new technologies, and channeling that knowledge into creating innovative
        applications. This commitment not only enhances my skills but also fuels
        my enthusiasm for delivering high-quality solutions. As a Full Stack
        Developer, I navigate both frontend and backend domains, ensuring a
        comprehensive understanding of the development landscape. My expertise
        spans a range of technologies, frameworks, and libraries, allowing me to
        tackle diverse challenges in the ever-evolving tech ecosystem.
        <br />
        <br />
        Apart from my professional pursuits, I enjoy the immersive world of
        gaming and seek inspiration through travel. These experiences not only
        provide a refreshing break but also infuse creativity into my
        development work. I am currently open to exciting opportunities and
        collaborations. Whether you're a business owner looking to initiate a
        new development project or a fellow developer eager to embark on an
        innovative journey, I'm here and ready to connect. Feel free to reach
        out, and let's create something extraordinary together.
      </div>
      <div className="mt-5 md:mt-10 flex lg:items-center lg:justify-center flex-col ">
        <div className="text-xl bg-white w-fit text-black  lg:px-4 font-bold shadow-white hover:shadow-md rounded-xl">


            
          FULL STACK DEVELOPMENT
        </div>
        <div className="flex  flex-wrap lg:w-1/3  lg:items-center lg:justify-center  mt-5 gap-2">
          {technologies.map((res) => {
            return (
              <>
                <div className="mr-4 bg-[#4d4d4d] font-semibold font-mono text-white rounded-md px-2">{res}</div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default about;
