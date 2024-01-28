import { FC } from "react";

const Contact: FC = () => {
  return (
    <div className="mb-4 px-4 lg:py-[5rem] lg:px-[20rem]">
      <div className="text-3xl font-bold font-mono ">Contact</div>
      <div className="flex items-center flex-col gap-2 justify-center h-[50vh]  mt-8">
        <div className="md:w-1/4">
          Want to start new project? Or just say hey. You can also follow me on{"  "}
          <span className="text-pink-600 hover:cursor-pointer hover:underline underline-offset-2">
            <a
              href="https://www.instagram.com/punitmistryy/"
              target="_blank"
            >
              Instagram.
            </a>
          </span>
        </div>
        <span className="text-3xl"> punitmistr@gmail.com</span>
      </div>
    </div>
  );
};

export default Contact;
