import React from 'react';
import ProjectCard from "./project-card";
import nutr from "../assets/nutr.png";
import express from "../assets/express.png";
import map from "../assets/map.png";
import Booking from "../assets/booking.png";
import Chat from "../assets/chat-app.png";
import Crypto from "../assets/crypto.png";
import Netflix from "../assets/netflix.png";
import Admin from "../assets/admin.png";
import TimeLine from '../assets/Timeline.png'
import MigrainApp from '../assets/migraineApp.png'
interface Project {
  title: string;
  techStack: string[];
  description: string;
  github: string;
  img: string;
}

const ProjectList: React.FC = () => {
  const projects:Project[] = [
    {
      title: "Admin Dashboard",
      techStack: ["react", "scss", "tailwind" ,'Express.JS','Node.JS','mongoDB'],
      description:
        "An admin dashboard is a web-based interface that provides administrative functionality and tools for managing and monitoring a system or application.",
      github: "https://github.com/punit-mistry/Admin-dashboard",
      img: Admin,
    },
    
    {
      title: "WhatsApp Bot",
      techStack: ["react", "scss", "tailwind",'Express.JS','Node.JS'],
      description:
        "WhatsApp bot using Node.js involves integrating with the WhatsApp Business API and implementing the desired bot functionality.",
      github: "https://github.com/punit-mistry/WhatsApp-bot",
      img: "https://static.whatsapp.net/rsrc.php/v3/yI/r/dmsjl8aYsry.png",
    },
    {
      title: "Express Builder",
      techStack: ["react", "scss", "tailwind", ],
      description:
        "An Express app is a web application built using the Express.js framework, which is a popular web application framework for Node.js.",
      github: "https://github.com/punit-mistry/Express_builder_app",
      img: express,
    },
    {
      title: "Nutrition",
      techStack: ["react", "tailwind"],
      description:
        "It covers a wide range of topics, including macronutrients, micronutrients, dietary guidelines, dietary trends, and debunking common nutrition myths.",
      github: "https://github.com/punit-mistry/Nutrition-website",
      img: nutr,
    },
    {
      title: "Timeline",
      techStack: ["Next.js",  "tailwind",'Express.JS','Node.JS','Supabase'],
      description:
        "A TimeLine app where the user can track the Timeline of their Task's ",
      github: "https://github.com/punit-mistry/timeline",
      img: TimeLine,
    },
    {
      title: "Migraine App",
      techStack: ["Next.js",  "tailwind",'Express.JS','Node.JS','Supabase'],
      description:
        "A migraineApp app where the user can track thier information about migraine's attacked ",
      github: "https://github.com/punit-mistry/migraineapp",
      img: MigrainApp ,
    },
    {
      title: "Chat App",
      techStack: ["react", "scss", "tailwind",'Express.JS','Node.JS','FireBase'],
      description:
        "A chat app allows users to exchange messages in real-time, enabling communication and collaboration.",
      github: "https://github.com/punit-mistry/Chat-app",
      img: Chat,
    },
    {
      title: "Slot Booking",
      techStack: ["react", "scss", "tailwind",'Express.JS','Node.JS','Supabase'],
      description:
        "Implementing slot booking functionality through a WhatsApp bot involves integrating with the WhatsApp Business API and designing a system to manage and allocate slots.",
      github: "https://github.com/punit-mistry/Slot-booking",
      img: Booking,
    },
    {
      title: "Route Map",
      techStack: ["react", "scss", "tailwind",'Express.JS','Node.JS'],
      description:
        "Route calculation involves between two locations. It is used in scenario where you need to find the efficient route from a starting point to a destination.",
      github: "https://github.com/punit-mistry/Map",
      img: map,
    },
    {
      title: "Crypto World",
      techStack: ["react", "scss", "tailwind"],
      description:
        "It encompasses various aspects, including cryptocurrencies, blockchain networks, decentralized finance (DeFi), non-fungible tokens (NFTs), and crypto exchanges.",
      github: "https://github.com/punit-mistry/coinbase_react",
      img: Crypto,
    },
    {
      title: "Netflix Clone",
      techStack: ["react", "scss", "tailwind"],
      description:
        "A Netflix clone is a website or application that emulates the functionalities and features of the popular streaming platform Netflix.",
      github: "https://github.com/punit-mistry/Netflix_react",
      img: Netflix,
    },
  ];
  
  return (
    <div className="mb-4 px-4 lg:py-[5rem] lg:px-[20rem]">
      <div className="text-3xl font-bold font-mono ">
        {"<"}Projects{"/>"}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center mt-4 ">
        {projects.map((project, index) => (
          <ProjectCard key={index} title={project.title} techStack={project.techStack} description={project.description} img={project.img} github={project.github} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
