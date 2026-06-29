import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "./Work";

interface ProjectDetailProps {
  index: number;
  onBack: () => void;
}

export default function ProjectDetail({ index, onBack }: ProjectDetailProps) {
  const project = PROJECTS[index];

  return (
    <div className="max-w-[1000px] mx-auto">
      <button
        onClick={onBack}
        className="font-cta inline-flex items-center gap-2 mb-10 transition-colors duration-300 btn-accent"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-3">
          {project.image ? (
            <picture>
              <source srcSet={project.imageWebp} type="image/webp" />
              <source srcSet={project.image} type={project.image.endsWith('.png') ? 'image/png' : 'image/jpeg'} />
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-auto rounded-2xl object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            </picture>
          ) : (
            <div
              className="w-full rounded-2xl flex items-center justify-center"
              style={{
                aspectRatio: '16/9',
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent-2) / 0.2))',
              }}
            >
              <span className="font-heading text-4xl opacity-40" style={{ color: 'hsl(var(--foreground))' }}>
                {project.name.split(' ').map(w => w[0]).join('')}
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center">
          <h1
            className="font-heading mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-1.5px', color: 'hsl(var(--foreground))' }}
          >
            {project.name}
          </h1>

          <p className="text-base mb-5" style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
            {project.description}
          </p>

          <p className="font-mono text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground) / 0.6)' }}>
            {project.tech}
          </p>

          <div className="flex items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 btn-primary"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-cta inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 btn-accent"
            >
              <Github size={16} />
              Source Code
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2
          className="font-heading mb-6"
          style={{ fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.5px', color: 'hsl(var(--foreground))' }}
        >
          Key Features
        </h2>
        <ul className="space-y-3">
          {getFeatures(project.name).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <span style={{ color: 'hsl(var(--primary))' }}>◆</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-12 p-6 rounded-xl"
        style={{
          background: 'hsl(var(--muted))',
          border: '1px solid hsl(var(--border))',
        }}
      >
        <p className="font-heading text-sm mb-2" style={{ color: 'hsl(var(--foreground))' }}>
          Interested in this project?
        </p>
        <p className="font-mono text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Check out the source code on GitHub or see it live. Want something similar?{" "}
          <a
            href="https://wa.me/918286075880?text=Hey%20Punit%2C%20I'd%20like%20to%20discuss%20a%20project%20similar%20to%20your%20work!"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: 'hsl(var(--primary))' }}
          >
            Let's build it together
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function getFeatures(name: string): string[] {
  const features: Record<string, string[]> = {
    'Admin Dashboard': [
      'Real-time analytics with live-updating charts and metrics',
      'User management with role-based access control (RBAC)',
      'Bulk operations and activity audit logging',
      'Responsive design with dark/light mode support',
      'WebSocket-powered live data streaming',
    ],
    'WhatsApp Business Bot': [
      'Automated customer support with 24/7 availability',
      'Order management and real-time status tracking',
      'Integration with external APIs and CRM systems',
      'Multi-language support with NLP-based intent detection',
      'Scalable architecture handling 10K+ conversations daily',
    ],
    'Express Builder': [
      'Interactive CLI with dynamic question flow',
      'Pre-configured JWT authentication and rate limiting',
      'MongoDB/PostgreSQL setup via environment variables',
      'Auto-generated test suite with Jest and Supertest',
      'Git initialization with meaningful .gitignore',
    ],
    'Healthy E-Living': [
      'Personalized nutrition plans based on user profile and goals',
      'Dietitian consultation booking and scheduling system',
      'Meal tracking with nutritional breakdown and insights',
      'Progress dashboard with visual health metrics',
      'Responsive design optimized for mobile users',
    ],
    'Orange Clinic': [
      'Appointment scheduling with calendar integration',
      'Patient record management with secure document storage',
      'Medical history tracking and prescription management',
      'Multi-clinic support with staff role management',
      'HIPAA-compliant data handling and encryption',
    ],
  };
  return features[name] || ['Modern responsive design', 'Clean, maintainable codebase', 'Performance optimized', 'SEO friendly'];
}
