import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/navbar";
import Section from "./components/section";
import About from "./components/about";
import Project from "./components/project";
import Contact from "./components/contact";
function App() {
 
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <Navbar />
     <Section/>
     <About/>
    <Project/>
    <Contact />
    </ThemeProvider>
  );
}

export default App;
