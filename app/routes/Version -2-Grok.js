import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Instagram } from "lucide-react";

// ==============================
// 3D LIQUID GLASS PORTFOLIO – Nodemailer Connected
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
  { name: "Vepaar", tag: "Commerce Suite", desc: "No-code store & CRM for small businesses." },
  { name: "Livvy", tag: "Ticketing Platform", desc: "Event tickets and passes with live analytics." },
  { name: "Pagemaker", tag: "No-code Builder", desc: "Visual website builder for creators." },
];

const glass =
  "rounded-[26px] border border-white/25 bg-white/70 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.35)]";

// ===========================
// Typing Animation
// ===========================
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

// ============================
// Main Component
// ============================
export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Contact Form Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Failed: " + data.error);
      }

    } catch (err) {
      console.error("Frontend Error:", err);
      alert("⚠️ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">

      {/* HERO */}
      <section className="max-w-5xl mx-auto py-16">
        <h1 className="text-5xl font-bold mb-2">Krunal Baldha</h1>
        <TypingTitle roles={["Product Manager", "Quality Engineer", "Problem Solver"]} />
      </section>

      {/* PROJECTS */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.name} className={`${glass} p-4`}>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-xs text-gray-600">{project.tag}</p>
              <p className="text-sm mt-2">{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Contact Me</h2>

        <form onSubmit={handleSubmit} className={`${glass} p-6 space-y-4`}>

          {/* NAME */}
          <div>
            <label className="text-xs text-slate-600">Your Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full rounded-xl border bg-white/80 px-3 py-2 text-sm outline-none"
              placeholder="Jane Doe"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-xs text-slate-600">Your Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full rounded-xl border bg-white/80 px-3 py-2 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-xs text-slate-600">Message</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full rounded-xl border bg-white/80 px-3 py-2 text-sm outline-none"
              placeholder="Tell me about your product..."
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 py-2 text-white font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-4 mt-6">
          <a href="https://github.com" target="_blank" rel="noreferrer"><Github /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
        </div>
      </section>

    </div>
  );
}
