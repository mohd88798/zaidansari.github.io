import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/* ============================================
   Profile Data
   ============================================ */
const PROFILE = {
  name: "Mohammad Zaid Ansari",
  role: "Software Engineer | Backend | AI/ML",
  summary: "Software engineer with experience in Java and Spring Boot–based backend development, enterprise application integration in SAP ecosystems, a growing focus on cloud concepts, DevOps fundamentals, and emerging experience in Generative AI and Agentic AI through project-based learning.",
  email: "mohdzaid88798@email.com",
  linkedin: "https://www.linkedin.com/in/mohammad-zaid-ansari-0919aa16b/",
  resumeUrl: "public/resume/CV.pdf",
  // Add your profile photo to /public/profile.jpg (or .png)
  profileImage: "/public/profile.png",
  about: `I am a software engineer with experience in building backend applications using Java and Spring Boot. My work includes API design, data integration, and application development within enterprise environments, including SAP ecosystems. I have a solid conceptual understanding of cloud computing and DevOps practices and am actively strengthening my practical skills through structured learning and projects. I am also exploring Generative AI and agentic AI through hands-on projects, focusing on intelligent agents for workflow automation and data-driven decision support.`,
};

/* ============================================
   LAYOUT OPTIONS - Switch between different hero styles
   ============================================ */
type HeroLayout = "centered-with-photo" | "side-by-side" | "centered-text-only";
const HERO_LAYOUT: HeroLayout = "centered-with-photo"; // Change this to switch layouts!

const SKILLS = {
  languages: ["Java", "JavaScript", "Python", "SQL", "Bash"],
  frameworks: ["Spring Boot", "React", "SAP UI5", "Node.js", "Hibernate"],
  tools: ["Git", "GitHub", "Docker", "Maven", "Gradle", "SonarQube", "Postman", "MySQL", "PostgreSQL", "VS Code", "IntelliJ IDEA", "SAP Cloud SDK"],
};


const EDUCATION = [
  {
    degree: "M.Tech in Software Engineering",
    institution: "BITS Pilani",
    duration: "2024 – 2026",
    details: "Ongoing with more focus on Distributed Systems and AI/ML",
  },
  {
    degree: "B.Tech in Information Technology",
    institution: "Don Bosco Institute of Technology",
    duration: "2020 – 2024",
    details: "First Class with Distinction and Majared in AI/ML",
  },
];

const EXPERIENCE = [
  {
    company: "SAP Labs India (Discrete Industry - Automotive)",
    role: "Scholar Intern",
    duration: "2024 September – 2025 May",
    achievements: [
      "Enhance VMS Events and APIs for data replication to support extension scenarios on SAP BTP and integration with BDC (Batch Data Communication)",
      "Led migration to Kubernetes, cutting infrastructure costs by 40%",
      "Mentored 4 junior engineers, improving team velocity by 25%",
    ],
  },
  {
    company: "SAP Labs India (Digital Manufacturing Cloud - QIR)",
    role: "Scholar Intern",
    duration: "2025 May – 2026 Present",
    achievements: [
      "Built real-time data pipeline processing 1M+ events/hour",
      "Designed and shipped auth system used by 500K+ users",
      "Improved CI/CD pipeline, reducing deploy time from 30min to 5min",
    ],
  },
];

const PROJECTS = [
  {
    name: "CloudDeploy CLI",
    description: "Open-source CLI tool for simplified Kubernetes deployments",
    stack: ["Go", "Kubernetes", "Docker"],
    github: "https://github.com/johndoe/clouddeploy",
  },
  {
    name: "DataSync",
    description: "Real-time data synchronization service for distributed systems",
    stack: ["Python", "Redis", "PostgreSQL"],
    github: "https://github.com/johndoe/datasync",
  },
  {
    name: "API Gateway",
    description: "High-performance API gateway with rate limiting and caching",
    stack: ["Rust", "Redis", "Docker"],
    github: "https://github.com/johndoe/api-gateway",
  },
];

const NAV_SECTIONS = ["profile", "skills", "education", "experience", "projects"];

/* ============================================
   HOOKS
   ============================================ */
const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of NAV_SECTIONS) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
};

/* ============================================
   ANIMATION VARIANTS
   ============================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

/* ============================================
   COMPONENTS
   ============================================ */

const Header = ({ activeSection }: { activeSection: string }) => {
  // Set to true to show small avatar in header
  const showHeaderAvatar = true;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {showHeaderAvatar && (
            <img 
              src={PROFILE.profileImage} 
              alt={PROFILE.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
              onError={(e) => {
                // Hide image if not found
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <span className="font-semibold text-foreground">{PROFILE.name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`text-sm transition-colors capitalize ${
                activeSection === section
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

/* ============================================
   HERO SECTION - Side-by-side layout
   ============================================ */

const HeroSection = () => (
  <section id="profile" className="min-h-screen flex items-center justify-center pt-16">
    <div className="container">
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
          {/* Profile Photo - Left Side */}
          <motion.div
            className="flex justify-center md:justify-start"
            variants={fadeInItem}
          >
            <div className="relative">
              <img 
                src={PROFILE.profileImage} 
                alt={PROFILE.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover border-4 border-primary/20 shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="80" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EMZ%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent" />
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4"
              variants={fadeInItem}
            >
              {PROFILE.name}
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-3"
              variants={fadeInItem}
            >
              {PROFILE.role}
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-muted-foreground/80 mb-6"
              variants={fadeInItem}
            >
              {PROFILE.summary}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center md:items-start gap-4"
              variants={fadeInItem}
            >
              <Button variant="cta" size="lg" asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail className="h-4 w-4" />
                  Contact via Email
                </a>
              </Button>
              <Button variant="cta-outline" size="lg" asChild>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
              </Button>
              <Button variant="cta-outline" size="lg" asChild>
                <a href={PROFILE.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SkillTag = ({ skill }: { skill: string }) => (
  <span className="inline-block px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-md">
    {skill}
  </span>
);

const SkillsSection = () => (
  <section id="skills" className="py-20 sm:py-24 bg-secondary/30">
    <div className="container">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8"
          variants={fadeInItem}
        >
          Skills
        </motion.h2>

        <div className="space-y-6">
          <motion.div variants={fadeInItem}>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.languages.map((skill) => <SkillTag key={skill} skill={skill} />)}
            </div>
          </motion.div>

          <motion.div variants={fadeInItem}>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.frameworks.map((skill) => <SkillTag key={skill} skill={skill} />)}
            </div>
          </motion.div>

          <motion.div variants={fadeInItem}>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.tools.map((skill) => <SkillTag key={skill} skill={skill} />)}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const EducationCard = ({ education }: { education: typeof EDUCATION[0] }) => (
  <motion.div
    className="relative pl-6 pb-8 last:pb-0 border-l-2 border-border"
    variants={fadeInItem}
  >
    <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
      <GraduationCap className="h-3 w-3 text-primary-foreground" />
    </div>
    <div className="mb-1">
      <h3 className="text-lg font-semibold text-foreground">{education.degree}</h3>
      <p className="text-muted-foreground">{education.institution}</p>
      <p className="text-sm text-muted-foreground/70">{education.duration}</p>
    </div>
    {education.details && (
      <p className="mt-2 text-sm text-muted-foreground">{education.details}</p>
    )}
  </motion.div>
);

const EducationSection = () => (
  <section id="education" className="py-20 sm:py-24">
    <div className="container">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8"
          variants={fadeInItem}
        >
          Education
        </motion.h2>
        <div className="space-y-0">
          {EDUCATION.map((edu, idx) => (
            <EducationCard key={idx} education={edu} />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const ExperienceCard = ({ experience }: { experience: typeof EXPERIENCE[0] }) => (
  <motion.div
    className="relative pl-6 pb-8 last:pb-0 border-l-2 border-border"
    variants={fadeInItem}
  >
    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
    <div className="mb-1">
      <h3 className="text-lg font-semibold text-foreground">{experience.role}</h3>
      <p className="text-muted-foreground">{experience.company}</p>
      <p className="text-sm text-muted-foreground/70">{experience.duration}</p>
    </div>
    <ul className="mt-3 space-y-2">
      {experience.achievements.map((achievement, idx) => (
        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-current flex-shrink-0" />
          {achievement}
        </li>
      ))}
    </ul>
  </motion.div>
);

const ExperienceSection = () => (
  <section id="experience" className="py-20 sm:py-24 bg-secondary/30">
    <div className="container">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8"
          variants={fadeInItem}
        >
          Experience
        </motion.h2>
        <div className="space-y-0">
          {EXPERIENCE.map((exp, idx) => (
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => (
  <motion.div
    className="p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
    variants={fadeInItem}
  >
    <div className="flex items-start justify-between gap-4 mb-3">
      <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`View ${project.name} on GitHub`}
        >
          <Github className="h-5 w-5" />
        </a>
      )}
    </div>
    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2">
      {project.stack.map((tech) => (
        <span key={tech} className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded">
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectsSection = () => (
  <section id="projects" className="py-20 sm:py-24">
    <div className="container">
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-foreground mb-8"
          variants={fadeInItem}
        >
          Projects
        </motion.h2>
        <div className="grid gap-4">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

/* ============================================
   MAIN PAGE
   ============================================ */
const Index = () => {
  const activeSection = useActiveSection();

  return (
    <div className="min-h-screen bg-background">
      <Header activeSection={activeSection} />
      <main>
        <HeroSection />
        <SkillsSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
