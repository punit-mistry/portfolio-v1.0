import React from 'react';
import ProjectCard from "./project-card";

interface Project {
  title: string;
  techStack: string[];
  description: string;
}

const ProjectList: React.FC = () => {
  const projects: Project[] = [
    {
      title:'Nutrition',
      techStack:['react','tailwind','express','Node.JS','react','tailwind','express','Node.JS'],
      description:'this is the description this is the description this is the description this is the description this is the description this is the description'
    },
    {
      title:'Nutrition',
      techStack:['react','tailwind','express','Node.JS'],
      description:'this is the description this is the description this is the description this is the description this is the description this is the description'
    },
    {
      title:'Nutrition',
      techStack:['react','tailwind','express','Node.JS'],
      description:'this is the description this is the description this is the description this is the description this is the description this is the description'
    },
    {
      title:'Nutrition',
      techStack:['react','tailwind','express','Node.JS'],
      description:'this is the description this is the description this is the description this is the description this is the description this is the description'
    },
  ]
  return (
    <div className="h-[80vh] px-4 lg:py-[5rem] lg:px-[20rem]">
      <div className="text-3xl font-bold font-mono ">
        {"<"}Projects{"/>"}
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} title={project.title} techStack={project.techStack} description={project.description} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
