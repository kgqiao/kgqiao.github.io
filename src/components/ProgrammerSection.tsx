/**
 * ============================================================================
 * DISCIPLINE 01: PROGRAMMER & SYSTEMS SECTION
 * ============================================================================
 * 
 * Displays software engineering projects and technical skills matrix.
 * 
 * Key Features:
 * - Category filter pills (All, Web Applications, Creative Coding, Developer Tools, ML Models)
 * - Lightbox modal for project details (replaces previous in-page page jump)
 * - Code snippet viewer with one-click copy
 * - Interactive in-browser live sandboxes (Terminal, WebGL Particles, Synthesizer)
 * - Software & Systems Technical Skills Matrix
 * 
 * Clean UX: Social metrics (likes, star counts) removed as requested.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Terminal,
  Code,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Play,
  RotateCcw,
  Zap,
  Activity,
  CornerDownRight,
  X
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { ENGINEERING_SKILLS } from '../data/initialData';

interface ProgrammerSectionProps {
  projects: Project[];
  activeProjectSubpage?: Project | null;
  setActiveProjectSubpage?: (project: Project | null) => void;
}

export const ProgrammerSection: React.FC<ProgrammerSectionProps> = ({
  projects,
  activeProjectSubpage,
  setActiveProjectSubpage,
}) => {
  // ---------------------------------------------------------------------------
  // 1. Gallery State
  // ---------------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(activeProjectSubpage || null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync with external state if provided
  useEffect(() => {
    if (activeProjectSubpage !== undefined) {
      setSelectedProject(activeProjectSubpage);
    }
  }, [activeProjectSubpage]);

  const handleOpenProject = (proj: Project) => {
    setSelectedProject(proj);
    if (setActiveProjectSubpage) setActiveProjectSubpage(proj);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (setActiveProjectSubpage) setActiveProjectSubpage(null);
  };

  // ---------------------------------------------------------------------------
  // 2. Interactive Sandbox State (Terminal, Canvas, Audio)
  // ---------------------------------------------------------------------------
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'System Engine v2.4.0 [x86_64-avx512]',
    'Type "help", "bench", "search <term>", or "stats" to test.'
  ]);

  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);

  // ---------------------------------------------------------------------------
  // 3. Skills Matrix State & Filter
  // ---------------------------------------------------------------------------
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  const skillCategories = [
    'All',
    'Languages & Core',
    'Frontend & Architecture',
    'Graphics & Visual Computing',
    'Backend & Infrastructure',
    'Developer Tooling & DevOps'
  ];

  const filteredSkills = activeSkillCategory === 'All'
    ? ENGINEERING_SKILLS
    : ENGINEERING_SKILLS.filter(s => s.category === activeSkillCategory);

  // Dynamically discover all unique categories across projects
  const categories: ProjectCategory[] = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  // ---------------------------------------------------------------------------
  // 4. Modal Keyboard & Body Scroll Listeners
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        handleCloseProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Handle Copying Code Snippet
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Next / Previous Navigation in Project Lightbox
  const currentIndex = selectedProject
    ? projects.findIndex(p => p.id === selectedProject.id)
    : -1;

  const handleNextProject = () => {
    if (currentIndex >= 0 && currentIndex < projects.length - 1) {
      handleOpenProject(projects[currentIndex + 1]);
    } else if (projects.length > 0) {
      handleOpenProject(projects[0]);
    }
  };

  const handlePrevProject = () => {
    if (currentIndex > 0) {
      handleOpenProject(projects[currentIndex - 1]);
    } else if (projects.length > 0) {
      handleOpenProject(projects[projects.length - 1]);
    }
  };

  // Interactive Particle Canvas Loop for 'particles' demo
  useEffect(() => {
    if (!selectedProject || selectedProject.interactiveDemoType !== 'particles') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 280);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }> = [];

    const colors = ['#06b6d4', '#38bdf8', '#818cf8', '#c084fc', '#ffffff'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (isHovering) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            p.vx += (dx / dist) * 0.2;
            p.vy += (dy / dist) * 0.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(6, 182, 212, ' + (1 - dist / 60) * 0.3 + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [selectedProject]);

  // Terminal submission handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `> ${terminalInput}`];

    if (cmd === 'help') {
      newLogs.push('Available commands: bench, search <term>, stats, clear, info');
    } else if (cmd === 'bench') {
      newLogs.push('⚡ Running AVX-512 SIMD Quantized Benchmark on 1,000,000 vectors...');
      newLogs.push('✔ Latency: 0.74ms | Throughput: 1,351,351 queries/sec | Recall@10: 98.6%');
    } else if (cmd.startsWith('search')) {
      const query = terminalInput.slice(7) || 'unspecified';
      newLogs.push(`🔎 Finding top-3 HNSW neighbors for: "${query}"`);
      newLogs.push('  [1] Score: 0.964 | Doc #8412: "Computational Aesthetics in Latent Spaces"');
      newLogs.push('  [2] Score: 0.891 | Doc #2109: "Navier-Stokes Real-Time Solvers"');
      newLogs.push('  [3] Score: 0.842 | Doc #5031: "CRDTs for Local-First Sync"');
    } else if (cmd === 'stats') {
      newLogs.push('📊 Index: 1,000,000 vectors | Dimensions: 1536 | Index RAM: 82.4 MB | Quant: PQ-8');
    } else if (cmd === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'info') {
      newLogs.push('Engine: Written in Rust with SIMD assembly bindings for Node.js.');
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help" for list.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  return (
    <section id="programmer-projects-section" className="py-12 md:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-code text-xs font-semibold uppercase tracking-wider mb-3 shadow-md">
            <Terminal className="w-3.5 h-3.5" />
            <span>Discipline 01 · Software & Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-neutral-100 tracking-tight">
            Software Systems, Tools & ML Models
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Interactive gallery of full-stack web applications, creative coding shaders, and machine learning models. Click any project card to view its technical case study.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'btn-pill-code-active font-bold'
                  : 'text-neutral-400 hover-text-code hover:bg-neutral-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Previews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            id={`project-card-${proj.id}`}
            onClick={() => handleOpenProject(proj)}
            className="group relative bento-card bento-card-programmer rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Thumbnail Preview Banner */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
              <img
                src={proj.thumbnail}
                alt={proj.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Category & Status Badge on Thumbnail */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-neutral-950/80 backdrop-blur-md border border-neutral-700 text-code">
                  {proj.category}
                </span>
                {proj.status && (
                  <span className="px-2 py-1 rounded-xl text-[10px] font-mono font-medium bg-cyan-950/80 backdrop-blur-md border border-cyan-700/60 text-cyan-300">
                    ● {proj.status}
                  </span>
                )}
              </div>

              {/* Hover Cue */}
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-xl bg-code-primary text-neutral-950 text-[11px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-lg">
                <span>View Case Study</span>
                <ArrowRight className="w-3 h-3" />
              </div>

              {/* Bottom Title on Thumbnail */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-mono text-neutral-400 mb-1 block">
                  {proj.year ? `${proj.year} · ` : ''}{proj.role || 'Software Engineering'}
                </span>
                <h3 className="text-xl font-mono font-bold text-neutral-100 group-hover:text-code transition-colors">
                  {proj.title}
                </h3>
              </div>
            </div>

            {/* Card Content & Tech Stack */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 line-clamp-2">
                {proj.tagline}
              </p>

              {/* Tech Stack Pills */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-neutral-950 text-neutral-400 border border-neutral-800"
                    >
                      {tech.name}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="px-2 py-1 text-[11px] font-mono text-neutral-500">
                      +{proj.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Lightbox Trigger CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs">
                  <span className="text-neutral-400 font-mono flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-code" /> Technical Details
                  </span>
                  <span className="inline-flex items-center gap-1 text-code font-bold group-hover:translate-x-1 transition-transform font-mono">
                    Inspect <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* =====================================================================
          POPUP LIGHTBOX MODAL (STANDARD PATTERN MATCHING ART GALLERY)
         ===================================================================== */}
      {selectedProject && (
        <div
          id="project-lightbox-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in"
          onClick={handleCloseProject}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-neutral-900 border-code rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-100"
            onClick={e => e.stopPropagation()}
          >
            {/* Sticky Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold badge-code">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  {selectedProject.year} · {selectedProject.role}
                </span>
              </div>

              {/* Prev / Next / External Links / Close */}
              <div className="flex items-center gap-2">
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl btn-pill-code-active text-xs font-bold font-mono transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Live Demo</span>
                  </a>
                )}

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono border border-neutral-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Source</span>
                  </a>
                )}

                <div className="h-4 w-[1px] bg-neutral-800 mx-1 hidden sm:block" />

                <button
                  onClick={handlePrevProject}
                  className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
                  title="Previous Project"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextProject}
                  className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
                  title="Next Project"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCloseProject}
                  className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors ml-1"
                  title="Close Modal (Esc)"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Interior */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              
              {/* Header Title & Tagline */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-neutral-100 tracking-tight mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-3xl">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Cover Banner if available */}
              {selectedProject.coverImage && (
                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[21/9] max-h-[360px] relative shadow-lg">
                  <img
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Overview */}
              <div>
                <h3 className="text-sm font-bold font-mono text-code uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Project Overview
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800/80">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Problem & Solution Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-900/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 font-mono">
                    Problem & Engineering Challenge
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bento-card-programmer">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-code mb-2 font-mono">
                    Engineered Solution
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack & Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tech Stack */}
                <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-mono flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-code" /> Applied Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, tIdx) => (
                      <div
                        key={tIdx}
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono flex items-center gap-2"
                      >
                        <span className="text-neutral-200 font-semibold">{tech.name}</span>
                        <span className="text-[10px] text-neutral-500">[{tech.category}]</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                    Key Features & Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {selectedProject.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-code-primary mt-1.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Interactive Demo Sandbox if present */}
              {selectedProject.interactiveDemoType && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold font-mono text-code uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Interactive Simulation Sandbox
                    </h3>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      In-Browser Live Demo
                    </span>
                  </div>

                  {/* Demo: Particles Canvas */}
                  {selectedProject.interactiveDemoType === 'particles' && (
                    <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-4">
                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                        <span>Fluid Particle Dynamics Emitter</span>
                        <span>Move mouse / touch to interact</span>
                      </div>
                      <canvas
                        ref={particleCanvasRef}
                        className="w-full h-64 rounded-xl bg-neutral-950 cursor-crosshair border border-neutral-800"
                      />
                    </div>
                  )}

                  {/* Demo: Terminal Sim */}
                  {selectedProject.interactiveDemoType === 'terminal-sim' && (
                    <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs shadow-md">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                          <span className="text-neutral-400 ml-2">system-cli (interactive)</span>
                        </span>
                        <button
                          onClick={() => setTerminalLogs(['Type "help", "bench", or "search <term>".'])}
                          className="text-neutral-400 hover:text-white text-[11px]"
                        >
                          Clear
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-48 overflow-y-auto mb-3 text-neutral-300">
                        {terminalLogs.map((log, lIdx) => (
                          <div
                            key={lIdx}
                            className={log.startsWith('>') ? 'text-code font-bold' : 'text-neutral-300'}
                          >
                            {log}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-800">
                        <span className="text-code font-bold">$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={e => setTerminalInput(e.target.value)}
                          placeholder="Try 'bench', 'search neural', or 'stats'..."
                          className="flex-1 bg-transparent text-neutral-100 focus:outline-none text-xs font-mono"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1 rounded btn-pill-code-active text-[11px] font-semibold"
                        >
                          Run
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Demo: Shader Canvas preview */}
                  {selectedProject.interactiveDemoType === 'shader-canvas' && (
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center shadow-sm">
                      <div className="text-xs text-neutral-400 font-mono mb-4">
                        Web Audio DSP Moog Filter Synthesizer
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setIsSynthPlaying(!isSynthPlaying)}
                          className="px-5 py-2.5 rounded-xl btn-pill-code-active text-xs font-bold flex items-center gap-2 shadow-lg"
                        >
                          {isSynthPlaying ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isSynthPlaying ? 'Pause Oscillators' : 'Generate Audio Wave'}</span>
                        </button>
                      </div>
                      {isSynthPlaying && (
                        <div className="mt-4 text-xs font-mono text-code animate-pulse">
                          Synthesizing 440Hz Sine & 110Hz Sawtooth with 24dB Moog Cutoff...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Architecture Highlights */}
              <div>
                <h3 className="text-sm font-bold font-mono text-code uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Architectural Breakdown
                </h3>
                <div className="space-y-2">
                  {selectedProject.architecture.map((arch, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300"
                    >
                      <CornerDownRight className="w-4 h-4 text-code flex-shrink-0 mt-0.5" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Snippet Viewer */}
              {selectedProject.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold font-mono text-code uppercase tracking-wider flex items-center gap-2">
                      <Code className="w-4 h-4" /> Source Implementation Highlight
                    </h3>
                    <button
                      onClick={() => handleCopyCode(selectedProject.codeSnippet!.code)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 font-mono text-xs shadow-md">
                    <div className="px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 text-neutral-400 flex items-center justify-between">
                      <span>{selectedProject.codeSnippet.filename}</span>
                      <span className="text-[10px] uppercase text-code">
                        {selectedProject.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="p-4 text-neutral-200 overflow-x-auto leading-relaxed">
                      <code>{selectedProject.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Milestones if available */}
              {selectedProject.milestones && selectedProject.milestones.length > 0 && (
                <div className="p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 font-mono">
                    Development Milestones
                  </h4>
                  <div className="space-y-3">
                    {selectedProject.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="border-l-2 border-code pl-3">
                        <h5 className="text-xs font-bold text-neutral-200 font-mono">{m.title}</h5>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SOFTWARE & SYSTEMS SKILLS MATRIX                                      */}
      {/* ===================================================================== */}
      <div className="mt-20 pt-16 border-t border-neutral-800/80 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-code text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineering Capabilities</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-neutral-100 tracking-tight">
              Software & Systems Skills Matrix
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
              Core competencies across full-stack architecture, graphics pipelines, developer tooling, and applied machine learning.
            </p>
          </div>

          {/* Category Filter for Skills */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md self-start sm:self-auto">
            {skillCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeSkillCategory === cat
                    ? 'btn-pill-code-active font-bold'
                    : 'text-neutral-400 hover-text-code hover:bg-neutral-800/60'
                }`}
              >
                {cat === 'All' ? 'All Skills' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill, sIdx) => (
            <div
              key={sIdx}
              className="bento-card bento-card-programmer rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl badge-code flex items-center justify-center">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold text-neutral-100 text-sm sm:text-base">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full badge-code font-bold">
                    {skill.level}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                  {skill.focus}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-3 border-t border-code">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                  Key Technologies & Tooling
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-code"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
