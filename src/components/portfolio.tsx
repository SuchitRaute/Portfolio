"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Database,
  Eye,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  LockKeyhole,
  Menu,
  Network,
  ScanSearch,
  Shield,
  X,
} from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { certificates, type Certificate } from "@/data/certificates";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Frontend",
    icon: Layers3,
    skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & DB",
    icon: Database,
    skills: ["Node.js", "PostgreSQL", "MongoDB", "Prisma", "REST APIs"],
  },
  {
    title: "Tools & Security",
    icon: Shield,
    skills: ["Git", "GitHub", "VS Code", "Linux", "Networking fundamentals", "TryHackMe"],
  },
];
const interests = [
  { title: "SOC analysis", icon: ScanSearch },
  { title: "Networking", icon: Network },
  { title: "Linux", icon: Code2 },
  { title: "Threat detection", icon: Shield },
  { title: "Digital forensics", icon: LockKeyhole },
];
const timeline = [
  {
    title: "Learning fundamentals",
    description: "Studying Computer Science and Business Systems as a B.Tech student.",
    icon: GraduationCap,
  },
  {
    title: "Building projects",
    description: "Turning ideas into practical software and learning through hands-on work.",
    icon: Code2,
  },
  {
    title: "Exploring security",
    description: "Developing foundations in networking, Linux, threat detection, and forensics.",
    icon: Shield,
  },
  {
    title: "Seeking internships",
    description: "Looking for an opportunity to contribute, learn, and grow with a team.",
    icon: BriefcaseBusiness,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={reveal}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2><span>{title}</span></h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  );
}

function setPointerStyle(element: HTMLElement, event: ReactPointerEvent<HTMLElement>) {
  if (
    event.pointerType !== "mouse" ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) return;
  const bounds = element.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  element.style.setProperty("--pointer-x", `${x}px`);
  element.style.setProperty("--pointer-y", `${y}px`);
  element.style.setProperty("--tilt-x", `${((y / bounds.height) * 2 - 1) * -2.2}deg`);
  element.style.setProperty("--tilt-y", `${((x / bounds.width) * 2 - 1) * 2.2}deg`);
}

function CertificateArt({ certificate }: { certificate: Certificate }) {
  return (
    <div className="certificate-art">
      <Image
        src={certificate.image}
        alt={`${certificate.title} certificate`}
        fill
        sizes="(max-width: 760px) 90vw, (max-width: 1050px) 45vw, 33vw"
        className="certificate-original"
      />
    </div>
  );
}

function CertificateCard({
  certificate,
  index,
  onOpen,
}: {
  certificate: Certificate;
  index: number;
  onOpen: (index: number, element: HTMLElement) => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28 }}
      className="certificate-card spotlight-card"
      onPointerMove={(event) => setPointerStyle(event.currentTarget, event)}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <div className="certificate-thumb">
        <CertificateArt certificate={certificate} />
      </div>
      <div className="certificate-card-copy">
        <h3>{certificate.title}</h3>
        <p>{certificate.issuer}</p>
        <button
          type="button"
          className="button button-secondary certificate-view-button"
          onClick={(event) => onOpen(index, event.currentTarget)}
          aria-label={`View ${certificate.title}`}
        >
          <Eye size={16} />
          View Certificate
        </button>
      </div>
    </motion.article>
  );
}

function CertificateLightbox({
  index,
  onClose,
  onChange,
}: {
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const certificate = certificates[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
    const first = focusable()?.[0];
    first?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((index - 1 + certificates.length) % certificates.length);
      if (event.key === "ArrowRight") onChange((index + 1) % certificates.length);
      if (event.key === "Tab") {
        const items = focusable();
        if (!items?.length) return;
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === items[0]) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          items[0].focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, onChange, onClose]);

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    if (start === null || end === undefined) return;
    const distance = end - start;
    if (Math.abs(distance) > 55) onChange((index + (distance < 0 ? 1 : -1) + certificates.length) % certificates.length);
    touchStartX.current = null;
  };

  return (
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${certificate.title} certificate`}
        ref={dialogRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lightbox-top">
          <p><span>{index + 1}</span> / {certificates.length}</p>
          <button type="button" className="icon-button lightbox-close" onClick={onClose} aria-label="Close certificate viewer">
            <X size={20} />
          </button>
        </div>
        <div className="lightbox-image-area">
          <button
            type="button"
            className="icon-button lightbox-arrow lightbox-prev"
            onClick={() => onChange((index - 1 + certificates.length) % certificates.length)}
            aria-label="Previous certificate"
          >
            <ArrowLeft size={20} />
          </button>
          <Image
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            fill
            sizes="(max-width: 800px) 94vw, 1000px"
            className="lightbox-original"
            priority
          />
          <button
            type="button"
            className="icon-button lightbox-arrow lightbox-next"
            onClick={() => onChange((index + 1) % certificates.length)}
            aria-label="Next certificate"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="lightbox-caption">
          <div>
            <h2>{certificate.title}</h2>
            <p>{certificate.issuer}</p>
          </div>
          <div className="lightbox-thumbnails" aria-label="Choose a certificate">
            {certificates.map((item, itemIndex) => (
              <button
                type="button"
                key={item.title}
                className={`lightbox-thumb ${itemIndex === index ? "is-current" : ""}`}
                onClick={() => onChange(itemIndex)}
                aria-label={`Show certificate ${itemIndex + 1}: ${item.title}`}
                aria-current={itemIndex === index}
              >
                <Image src={item.image} alt="" width={24} height={24} className="lightbox-thumb-image" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const changeLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const openLightbox = (index: number, element?: HTMLElement) => {
    triggerRef.current = element ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setLightboxIndex(index);
  };

  useEffect(() => {
    const sections = ["home", ...site.navigation.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );
    sections.forEach((section) => observer.observe(section));
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <main>
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Suchit Raute — home">
            <span>SR</span><i>.</i>
          </a>
          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            {site.navigation.map((item) => {
              const section = item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === section ? "nav-link is-active" : "nav-link"}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === section ? "location" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <a className="nav-github" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <Github size={19} />
          </a>
          <button
            type="button"
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <section
        id="home"
        className="hero-section page-section"
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--hero-x", `${event.clientX - bounds.left}px`);
          event.currentTarget.style.setProperty("--hero-y", `${event.clientY - bounds.top}px`);
        }}
      >
        <div className="hero-ambient" aria-hidden="true" />
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" as const }}
          >
            <h1>Hi, I&apos;m <strong>Suchit Raute</strong>.</h1>
            <p className="hero-headline">
              A Developer Passionate About <span>Cybersecurity</span> &amp; <span>Networking</span>.
            </p>
            <p className="hero-description">{site.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore My Projects <ArrowDown size={16} />
              </a>
            </div>
            <div className="hero-meta">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="Suchit's GitHub profile">
                <Github size={18} /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Suchit's LinkedIn profile">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-portrait"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" as const }}
          >
            <Image
              src="/suchit.jpg"
              alt="Suchit Raute"
              width={320}
              height={320}
              priority
            />
          </motion.div>
        </div>
      </section>

      <section id="about" className="page-section about-section">
        <div className="content-width">
          <SectionHeading eyebrow="A little about me" title="Curiosity, meet craft." />
          <motion.div
            className="about-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
          >
            <div className="about-monogram" aria-hidden="true">SR<span>.</span></div>
            <div className="about-copy">
              <p>
                I&apos;m Suchit, a third-year B.Tech Computer Science and Business Systems student who enjoys building useful apps and solving practical problems. I&apos;m strengthening my programming and networking fundamentals while exploring Linux, threat detection, and digital forensics. I&apos;m looking forward to bringing curiosity, care, and a willingness to learn to an internship.
              </p>
              <div className="about-tags"><span>Build useful things</span><span>Keep learning</span><span>Explore security</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="page-section skills-section">
        <div className="content-width">
          <SectionHeading eyebrow="What I work with" title="Skills in progress." description="A growing toolkit, built through coursework, practice, and projects." />
          <div className="skills-grid">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.article
                  key={group.title}
                  className="skill-card surface-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.08 } } }}
                >
                  <div className="skill-title"><span className="skill-icon"><Icon size={18} /></span><h3>{group.title}</h3></div>
                  <ul className="skill-list">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.li key={skill} style={{ transitionDelay: `${skillIndex * 20}ms` }}>{skill}</motion.li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="page-section projects-section">
        <div className="content-width">
          <SectionHeading eyebrow="Selected work" title="Ideas into interfaces." description="Projects and concepts shaped by hands-on exploration." />
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="page-section journey-section">
        <div className="content-width">
          <SectionHeading eyebrow="Learning & journey" title="One step at a time." description="A student journey guided by curiosity, practice, and the next challenge." />
          <div className="timeline">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  className="timeline-item"
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.08 } } }}
                >
                  <div className="timeline-marker"><Icon size={17} /></div>
                  <div className="timeline-copy"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="interests" className="page-section interests-section">
        <div className="content-width">
          <SectionHeading eyebrow="Cybersecurity interests" title="A field worth exploring." />
          <div className="interest-grid">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  className="interest-card surface-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.06 } } }}
                >
                  <Icon size={19} /><span>{interest.title}</span><ArrowRight size={14} className="interest-arrow" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="certificates" className="page-section certificates-section">
        <div className="content-width">
          <SectionHeading
            eyebrow="Certifications & achievements"
            title="Milestones that matter."
            description="A growing record of learning, participation, and ideas put forward."
          />
          <motion.div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <CertificateCard key={certificate.title} certificate={certificate} index={index} onOpen={openLightbox} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div className="content-width">
          <motion.div
            className="contact-panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={reveal}
          >
            <div className="contact-copy">
              <p className="eyebrow">Let&apos;s connect</p>
              <h2>Good work starts with a conversation.</h2>
              <p>I&apos;m open to learning opportunities, internships, and thoughtful collaborations.</p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={site.github} target="_blank" rel="noopener noreferrer">
                <Github size={18} /> Find me on GitHub <ArrowRight size={16} />
              </a>
              <a className="button button-secondary" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Suchit's LinkedIn profile">
                <Linkedin size={18} /> Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#home"><span>SR</span><i>.</i> <b>Suchit Raute</b></a>
          <p>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> Suchit Raute</p>
          <div className="footer-links">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="Suchit's GitHub profile"><Github size={16} /> GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Suchit's LinkedIn profile"><Linkedin size={16} /> LinkedIn</a>
            <a href="#home">Back to top <ArrowUp size={15} /></a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <CertificateLightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onChange={changeLightbox}
          />
        )}
      </AnimatePresence>
    </main>
    </MotionConfig>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const safeFeaturesId = `project-features-${index}`;
  const statusClass = project.status.toLowerCase().replaceAll(" ", "-");
  return (
    <motion.article
      className="project-card surface-card spotlight-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.06 } } }}
      onPointerMove={(event) => setPointerStyle(event.currentTarget, event)}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--tilt-x", "0deg");
        event.currentTarget.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <div className={`project-visual project-visual-${index + 1}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 33vw"
            className="project-image"
          />
        ) : (
          <div className="project-placeholder" aria-label="Project preview not provided">
            <span className="project-placeholder-index">0{index + 1}</span>
            <span className="project-placeholder-name">{project.title}</span>
            <span className="project-placeholder-label">Project preview not provided</span>
          </div>
        )}
        <span className={`status-badge status-${statusClass}`}>{project.status}</span>
        <span className="project-visual-glow" aria-hidden="true" />
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.stack.length > 0 && (
          <ul className="project-stack" aria-label="Technology stack">
            {project.stack.map((item, stackIndex) => (
              <li key={item} style={{ transitionDelay: `${stackIndex * 28}ms` }}>{item}</li>
            ))}
          </ul>
        )}
        {project.features.length > 0 && (
          <div className="project-features-wrap">
            <button
              type="button"
              className="features-toggle"
              aria-expanded={expanded}
              aria-controls={safeFeaturesId}
              onClick={() => setExpanded((value) => !value)}
            >
              Key features <ChevronDown size={15} className={expanded ? "chevron-open" : ""} />
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  id={safeFeaturesId}
                  className="project-features"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
        {(project.github || project.demo) && (
          <div className="project-links">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowRight size={14} /></a>}
          </div>
        )}
      </div>
    </motion.article>
  );
}
