import { FC } from "react";
interface Props {
  title: string;
  description: string;
  techStack: string[];
}
const ProjectCard: FC<Props> = ({ title, description, techStack }) => {
  return (
    <div className="mt-5  border-2 w-[350px] hover:cursor-pointer  transition-all border-black dark:border-white rounded-lg p-4">
      <div className="relative ">
        <div className="animate-pulse w-full h-52 bg-gray-500 rounded-md" />
        <div className="absolute top-50 left-50">This is the Link</div>
      </div>
      <div className="mt-4 font-bold text-xl">{title}</div>
      <div className="min-h-32  p-2">{description}</div>
      <div className="capitalize text-sm rounded-md flex flex-wrap gap-2">
        {techStack.map((res) => {
          return (
            <>
              <div className=" bg-[#4d4d4d] shadow-md font-mono text-white rounded-md px-2 w-fit">{`<${res}/> `}</div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;
