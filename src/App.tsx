import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/navbar";
import Section from "./components/section";
import About from "./components/about";
import Project from "./components/project";
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
    </ThemeProvider>
  );
}

export default App;
