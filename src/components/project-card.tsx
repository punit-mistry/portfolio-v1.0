import { FC } from "react";
import { Button } from "./ui/button";

interface Props {
  title: string;
  description: string;
  techStack: string[];
  img: string;
  github: string;
}

const ProjectCard: FC<Props> = ({
  title,
  description,
  techStack,
  img,
  github,
}) => {
  return (
    <div className="mt-5 border-2 w-[350px] hover:cursor-pointer transition-all hover:-translate-y-2 border-black dark:border-white rounded-lg p-4">
      <div className="relative ">
        <div className="shadow-lg shadow-gray-700  absolute -top-9 w-full h-52 rounded-md">
          <img
            src={img}
            alt={title}
            className="w-full h-full rounded-md"
          />
        </div>
      </div>
      <div className="h-44" />
      <div className="mt-4 font-bold text-xl">{title}</div>
      <div className="min-h-32 p-2">{description}</div>
      <div className="min-h-20 ">
        <div className="capitalize text-sm rounded-md flex flex-wrap gap-2  ">
          {techStack.map((res, index) => (
            <>
              <div
                key={index}
                className="bg-[#4d4d4d] shadow-md font-mono text-white rounded-md px-2 w-fit"
              >
                {`<${res}/> `}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <Button variant="link">
          <a href={github} target="_blank">Github</a> 
          </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
