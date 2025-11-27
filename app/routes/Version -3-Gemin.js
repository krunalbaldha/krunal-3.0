import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Instagram } from "lucide-react";

// ==============================
// 3D LIQUID GLASS PORTFOLIO – NAVIGATION FIX APPLIED
// ==============================

const skills = [
  "Product Management|90%",
  "QA & Automation|95%",
  "UX Understanding|80%",
  "Project Coordination|60%",
  "Data Analysis & Reporting|85%",
  "Market Research & Analysis|80%",
  "Product Documentation|80%",
  "Roadmapping & Prioritization|88%",
];

const projects = [
  { name: "Vepaar", tag: "Commerce Suite", desc: "No‑code store & CRM for small businesses." },
  { name: "Livvy", tag: "Ticketing Platform", desc: "Event tickets and passes with live analytics." },
  { name: "Pagemaker", tag: "No‑code Builder", desc: "Visual website builder for creators." },
  { name: "DateDish", tag: "Social Dining", desc: "Curated date‑night food experiences." },
  { name: "Voliz", tag: "Polls & Surveys", desc: "One‑tap WhatsApp polls for fast feedback." },
  { name: "Dimboo", tag: "Marketing SaaS", desc: "Social media campaign automation." },
];

const glass =
  "rounded-[26px] border border-white/25 bg-white/70 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.35)]";

// Follow system theme (adds/removes .dark on <html>)
function useSystemTheme() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      document.documentElement.classList.toggle("dark", mq.matches);
    };

    updateTheme();
    mq.addEventListener("change", updateTheme);
    return () => mq.removeEventListener("change", updateTheme);
  }, []);
}

// Lightweight typing animation
function TypingTitle({ roles }: { roles: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let index = 0;
    const current = roles[roleIndex];

    const interval = setInterval(() => {
      if (index < current.length) {
        setDisplayed(current.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayed("");
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [roleIndex, roles]);

  return (
    <p className="text-lg font-medium text-teal-700 min-h-[28px]">
      {displayed}
      <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-teal-600" />
    </p>
  );
}

export function parseSkill(item: string) {
  const [label, value = ""] = item.split("|");
  return { label, value };
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80, // account for sticky navbar height
        behavior: "smooth",
      });
    }
  };

  useSystemTheme();

  // 🎯 FIX: Active section highlight using IntersectionObserver with rootMargin
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ["hero", "about", "experience", "projects", "contact"];
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // This logic is simplified because rootMargin handles the complex scrolling area
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px", // Top: -20% (for offset), Bottom: -50% (makes intersection only happen in the top half)
        threshold: 0.01, // Low threshold, letting rootMargin dictate the intersection point
      },
    );

    sectionElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      
      {/* COLORFUL LIQUID BACKGROUND - STATIC (Optimized) */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.3),_transparent_55%)]" />
      </div>

      {/* subtle glow grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:120px_120px] opacity-30" />

      {/* HEADER */}
      <header className="sticky top-4 z-50 mx-auto w-full px-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/60 px-6 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "hero")}
            className="mr-4 flex items-center gap-3 cursor-pointer"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 text-[11px] font-bold text-white shadow-lg">
              KB
            </div>
            <span className="text-sm font-semibold text-slate-800">Krunal Baldha</span>
          </a>

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-700">
            {[
              { label: "About", id: "about" },
              { label: "Experience", id: "experience" },
              { label: "Portfolio", id: "projects" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  activeSection === item.id
                    ? "bg-white text-slate-900 shadow"
                    : "hover:bg-white hover:text-slate-900"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative mx-auto mt-6 flex max-w-6xl flex-col gap-14 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        {/* HERO */}
        <section
          id="hero"
          className="min-h-[calc(100vh-96px)] flex items-center grid items-center gap-12 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-xs tracking-widest text-slate-500">I'M</p>

            <h1 className="text-5xl font-extrabold text-slate-900 sm:text-6xl md:text-7xl">
              Krunal Baldha
            </h1>

            <TypingTitle
              roles={[
                "Product Manager",
                "Quality Engineer",
                "Problem Solver",
              ]}
            />

            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              I create impactful digital products that solve real problems and drive measurable results. I
              build user‑focused digital products through strategy, research, and quality engineering.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="rounded-full border border-slate-300 px-6 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                View Portfolio
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Product Strategy",
                "User Research",
                "QA Automation",
                "Python",
                "Roadmapping",
                "Feature Prioritization",
                "Quality‑focused execution",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200/60 bg-white/60 px-4 py-1 text-xs text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative pl-6">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-300 blur-2xl opacity-50" />
              <div className="relative h-70 w-70 overflow-hidden rounded-full border-8 border-white shadow-xl md:h-96 md:w-96">
                <img
                  src="/images/krunal.png"
                  alt="Krunal Baldha"
                  className="h-full w-full object-cover"
                  loading="lazy" 
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT ME */}
        <section
          id="about"
          className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          <div className={`${glass} p-6`}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-400 text-white font-bold">
                KB
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Krunal Baldha</h3>
                <p className="text-sm text-teal-500">Product Manager</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              I transform ideas into meaningful, user‑centered solutions, focused on delivering clarity,
              alignment, and impact across teams.
            </p>

            <div className="mt-4 text-sm">
              <p className="text-xs text-slate-400">Email</p>
              <p className="font-medium text-slate-800">krunalbaldha1@gmail.com</p>
            </div>

            <div className="mt-3 text-sm">
              <p className="text-xs text-slate-400">Location</p>
              <p className="font-medium text-slate-800">Ahmedabad, India</p>
            </div>
          </div>

          <div className={`${glass} p-6`}>
            <h2 className="mb-3 text-xl font-semibold text-slate-900">About Me</h2>

            <p className="text-sm leading-relaxed text-slate-600">
              I’m a Product Manager with a strong technical background, passionate about building products
              that are intuitive, scalable, and genuinely helpful.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Over the last few years, I’ve worked on SaaS products, automation systems, and internal tools,
              always with the goal of improving user experience and product quality.
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-slate-900">Tools & Tech</h4>
                <div className="flex flex-wrap gap-2 text-sm">
                  {[
                    "Product & Design Tools",
                    "Python",
                    "Project & Team Tools",
                    "Analytics Tools",
                    "G‑Suite",
                    "MS Office",
                    "QA & Automation",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-slate-300 bg-white/70 px-3 py-1 text-xs text-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold text-slate-900">Highlights</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                  <li>Delivered features across multiple SaaS releases</li>
                  <li>Built QA automation to reduce regressions</li>
                  <li>Improved user activation through research</li>
                  <li>Strengthened collaboration across teams</li>
                  <li>Optimized UX flows for higher satisfaction</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE + SKILLS + SERVICES */}
        <div className="text-2xl font-bold text-slate-900">Experience</div>
        <section
          id="experience"
          className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
        >
          <div className="space-y-10 border-l border-slate-200 pl-6">
            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500">Jan 2024 – Present</p>
              <h3 className="text-sm font-semibold text-slate-900">Associate Product Manager</h3>
              <p className="text-sm text-teal-600">7Span</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600">
                <li>Owned roadmap for core features</li>
                <li>Coordinated cross‑team releases</li>
                <li>Strong in strategy & research</li>
                <li>Built intuitive, user‑first solutions</li>
                <li>Data‑driven decision making</li>
                <li>Delivered real business impact</li>
              </ul>
            </div>

            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500">Jan 2023 – Oct 2023</p>
              <h3 className="text-sm font-semibold text-slate-900">
                Placement & Training Coordinator – Volunteer
              </h3>
              <p className="text-sm text-teal-600">LJ University</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600">
                <li>Led end‑to‑end placement drives</li>
                <li>Liaison between students & recruiters</li>
                <li>Improved scheduling & workflows</li>
                <li>Provided pre‑placement support</li>
                <li>Organized career events</li>
              </ul>
            </div>

            <div className="relative pl-6">
              <span className="absolute left-0 top-[6px] h-3 w-3 rounded-full bg-teal-500" />
              <p className="text-xs text-slate-500">Jan 2021 – Jun 2022</p>
              <h3 className="text-sm font-semibold text-slate-900">Software Engineer (Python Developer)</h3>
              <p className="text-sm text-teal-600">Identiq InfoTech</p>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600">
                <li>Hands‑on with Python & REST APIs</li>
                <li>Built scalable applications</li>
                <li>Wrote clean, maintainable code</li>
                <li>Optimized system performance</li>
                <li>Solved complex engineering problems</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div id="skills" className={`${glass} p-6`}>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Skills</h2>
              <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-700">
                {skills.map((item) => {
                  const { label, value } = parseSkill(item);
                  return (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: value }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="services" className={`${glass} p-6`}>
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Services</h2>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                {[
                  "Product Management|Roadmaps, metrics, prioritization",
                  "QA & Automation|CI automation & test strategies",
                  "UI/UX Optimization|Data‑driven UI improvements",
                  "Market & User Research|User behavior analysis",
                  "Web Development|Fast, responsive products",
                  "Digital Marketing|Drives traffic & growth",
                ].map((service) => {
                  const [title, desc] = service.split("|");
                  return (
                    <div key={title} className="rounded-xl border border-slate-200 p-4 shadow-sm">
                      <h3 className="mb-1 font-semibold text-slate-900">{title}</h3>
                      <p className="text-xs text-slate-600">{desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS / SELECTED WORK */}
        <section id="projects" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Selected Work</h2>
              <p className="mt-1 text-[11px] text-slate-500">
                A mix of shipped products, experiments, and side projects.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                className={`${glass} group relative flex cursor-pointer flex-col justify-between bg-white/80 p-4 sm:p-5`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.07, duration: 0.6, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ y: -14, rotateX: 4, rotateY: -4 }}
              >
                <div className="relative h-28 overflow-hidden rounded-2xl bg-slate-900">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.6),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,114,182,0.6),transparent_55%),radial-gradient(circle_at_50%_100%,rgba(74,222,128,0.55),transparent_55%)] opacity-80 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.2),transparent,rgba(15,23,42,0.35))]" />
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    {project.tag}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900">{project.name}</h3>
                  <p className="text-[11px] text-slate-600">{project.desc}</p>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-600">
                  <span className="inline-flex items-center gap-1">
                    View case study
                    <ExternalLink className="h-3 w-3" />
                  </span>
                  <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] text-slate-700">
                    Product · Open
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="grid gap-6 pt-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]"
        >
          <motion.div
            className={`${glass} p-6 sm:p-7`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
          >
            <h2 className="text-sm font-semibold text-slate-900">Let’s build something vivid</h2>
            <p className="mt-2 text-xs text-slate-600">
              I’m open to freelance, consulting, and full‑time roles. Share a little about the product or
              team, and I’ll reply with ideas and next steps.
            </p>

            <div className="mt-4 space-y-1 text-[11px] text-slate-700">
              <p>
                Email: <span className="font-semibold text-slate-900">krunalbaldha1@gmail.com</span>
              </p>
              <p>Location: Ahmedabad, India (IST)</p>
            </div>

            <div className="mt-4 flex gap-3 text-xs text-slate-700">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 hover:bg-white"
              >
                <Github className="h-5.5 w-3.5" /> 
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 hover:bg-white"
              >
                <Linkedin className="h-3.5 w-3.5" /> 
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 hover:bg-white"
              >
                <Instagram className="h-3.5 w-3.5" /> 
              </a>

            </div>
          </motion.div>

          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! (Demo only)");
            }}
            className={`${glass} space-y-3 p-6 sm:p-7`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1 text-[11px]">
                <label className="text-slate-600">Your name</label>
                <input
                  className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-1 text-[11px]">
                <label className="text-slate-600">Your email</label>
                <input
                  className="w-full rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-1 text-[11px]">
              <label className="text-slate-600">Message</label>
              <textarea
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/60 bg-white/80 px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400"
                placeholder="Tell me about your product, idea, or role."
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-[0_18px_45px_rgba(236,72,153,0.65)] transition hover:translate-y-0.5 hover:brightness-110"
            >
              Send message
            </button>
          </motion.form>
        </section>

        <footer className="mt-2 flex flex-col items-center justify-between gap-2 border-t border-white/60 pt-4 text-[10px] text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} krunal.live</span>
          <span>Designed with 3D liquid‑glass cards & colorful gradients.</span>
        </footer>
      </main>
    </div>
  );
}