import React, { useState } from 'react';
import { X, Printer, Copy, CheckCircle2, Github, Linkedin, Mail, MapPin, Sparkles, Terminal, Code2, Layers } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
${PROFILE.name.toUpperCase()}
Software Engineer · Creative Technologist · Artist & Writer
GitHub: ${PROFILE.social.github.url}
LinkedIn: ${PROFILE.social.linkedin.url}

SUMMARY
Interdisciplinary Software Engineer specializing in scalable full-stack web applications, interactive WebGL/WebGPU graphics, developer tools, and machine learning diffusion models. Combines strong computer science fundamentals with aesthetic precision from visual arts and architectural systems theory.

CORE TECHNICAL SKILLS
• Languages: TypeScript, JavaScript, Python, Rust, C++, GLSL/WGSL, HTML5/CSS3, SQL
• Frontend & Web: React 19, Next.js, Vite, Tailwind CSS, Web Workers, Canvas API, WebGL, Three.js
• Backend & Systems: Node.js, Express, FastAPI, PostgreSQL, SQLite, Redis, REST & GraphQL APIs, Docker
• Machine Learning & Graphics: PyTorch, HuggingFace Diffusers, OpenCV, SIMD optimizations, Raymarching
• Developer Tools: Git, GitHub Actions, CI/CD, Vite plugins, esbuild, Jest, Vitest

FEATURED SOFTWARE PROJECTS
1. Chronosync OPFS — Local-First Offline Collaborative Workspace
   • Built a high-performance local-first notes & canvas engine using Origin Private File System (OPFS) and CRDT sync.
   • Achieved sub-5ms transaction commits and seamless multi-device convergence.

2. Aetheria Engine — Real-Time WebGL Raymarching & Fluid Simulator
   • Developed a procedural volumetric fluid simulator and Signed Distance Field (SDF) raymarcher running at 60fps on web browsers.
   • Implemented custom compute shaders with ping-pong framebuffers for realistic fluid advection.

3. InkDiffusion Core — Latent Diffusion Engine for Asian Ink Wash
   • Fine-tuned latent diffusion models with LoRA weights specialized in Shuimo traditional Chinese brush strokes.
   • Designed an interactive prompt-guided canvas interface generating high-resolution Xuan paper textures.

4. RustLint CLI — Ultra-Fast SIMD Code Inspector
   • Open-source command-line tool written in Rust utilizing AVX-512 SIMD vectorization to parse large monorepos 12x faster than standard linters.

EXPERIENCE & HIGHLIGHTS
• Software Engineering & Creative Technology: Designed and deployed production web applications, interactive visualization tools, and generative ML pipelines.
• Interdisciplinary Practice: Published author on architectural aesthetics and art theory; exhibited fine artist in traditional Chinese painting and digital media.
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:static">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden print:border-none print:shadow-none print:max-h-none print:w-full print:bg-white print:text-black">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              CV
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-neutral-100 flex items-center gap-2">
                Tech Recruiter & Hiring Manager Resume
                <span className="bubbly-pill-prog text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Software Engineering
                </span>
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                {PROFILE.name} · Full-Stack, WebGL & ML Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors border border-neutral-700"
              title="Copy plain-text resume"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl ombre-btn-prog text-neutral-950 text-xs font-bold transition-transform hover:scale-105 shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors border border-neutral-700"
              title="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 print:p-0 print:overflow-visible text-neutral-200 print:text-black bg-neutral-950/40 font-sans">
          
          {/* Header Info */}
          <div className="border-b border-neutral-800 print:border-neutral-300 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-white print:text-black tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-sm font-mono text-sky-400 print:text-sky-700 mt-1 font-semibold">
                Software Engineer · Creative Technologist · Systems Architect
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 print:text-neutral-600 mt-2.5">
                <span className="flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-sky-400 print:text-neutral-700" />
                  <a href={PROFILE.social.github.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {PROFILE.social.github.display}
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-purple-400 print:text-neutral-700" />
                  <a href={PROFILE.social.linkedin.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {PROFILE.social.linkedin.display}
                  </a>
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end gap-1.5 print:hidden">
              <span className="bubbly-pill-prog text-xs font-mono px-3 py-1 rounded-full font-bold">
                ● Open for SWE Roles
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Full-Stack · Graphics · ML
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-2.5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 print:text-neutral-800">
              Interdisciplinary Software Engineer specializing in scalable React 19 / TypeScript web architectures, real-time WebGL/WebGPU graphics shaders, SIMD-accelerated developer tools, and latent diffusion machine learning models. Combines strong computer science fundamentals with acute visual design sensibility and longform architectural systems thinking.
            </p>
          </div>

          {/* Core Technical Skills Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-3 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-neutral-900/80 print:bg-neutral-50 border border-neutral-800 print:border-neutral-200">
                <span className="font-bold text-neutral-100 print:text-neutral-900 block mb-1">
                  Languages & Core:
                </span>
                <p className="text-neutral-300 print:text-neutral-700 font-mono">
                  TypeScript, JavaScript (ESNext), Python, Rust, C++, GLSL/WGSL, HTML5, CSS3, SQL
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-900/80 print:bg-neutral-50 border border-neutral-800 print:border-neutral-200">
                <span className="font-bold text-neutral-100 print:text-neutral-900 block mb-1">
                  Frontend & Graphics:
                </span>
                <p className="text-neutral-300 print:text-neutral-700 font-mono">
                  React 19, Next.js, Vite, Tailwind CSS, Three.js, WebGL 2.0, Web Workers, Canvas 2D
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-900/80 print:bg-neutral-50 border border-neutral-800 print:border-neutral-200">
                <span className="font-bold text-neutral-100 print:text-neutral-900 block mb-1">
                  Backend & Distributed Systems:
                </span>
                <p className="text-neutral-300 print:text-neutral-700 font-mono">
                  Node.js, Express, FastAPI, PostgreSQL, SQLite, Redis, CRDT Synchronization, Docker
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-900/80 print:bg-neutral-50 border border-neutral-800 print:border-neutral-200">
                <span className="font-bold text-neutral-100 print:text-neutral-900 block mb-1">
                  Machine Learning & Tooling:
                </span>
                <p className="text-neutral-300 print:text-neutral-700 font-mono">
                  PyTorch, Diffusers, LoRA Tuning, Git, GitHub Actions, Vitest, esbuild, SIMD parsing
                </p>
              </div>
            </div>
          </div>

          {/* Featured Systems Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-3 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5" /> Featured Engineering Projects
            </h2>
            <div className="space-y-4 text-xs">
              
              {/* Project 1 */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 print:bg-transparent border border-neutral-800 print:border-neutral-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    Chronosync OPFS — Local-First Collaborative Workspace
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-400 print:text-cyan-800 font-semibold">
                    TypeScript · React · Web Workers · OPFS
                  </span>
                </div>
                <p className="text-neutral-300 print:text-neutral-700 leading-relaxed">
                  Architected a high-throughput local-first storage and canvas engine utilizing Origin Private File System and CRDT state synchronizers. Achieved sub-5ms commit latency with zero server dependency for offline editing.
                </p>
              </div>

              {/* Project 2 */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 print:bg-transparent border border-neutral-800 print:border-neutral-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    Aetheria Engine — Real-Time WebGL Raymarching & Fluid Simulation
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-400 print:text-cyan-800 font-semibold">
                    GLSL · WebGL 2.0 · Three.js · Compute Buffers
                  </span>
                </div>
                <p className="text-neutral-300 print:text-neutral-700 leading-relaxed">
                  Engineered procedural fluid advection shaders and Signed Distance Field volumetric renderers maintaining a consistent 60 FPS in browser viewports across desktop and mobile GPUs.
                </p>
              </div>

              {/* Project 3 */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 print:bg-transparent border border-neutral-800 print:border-neutral-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    InkDiffusion Core — Latent Diffusion Model for East Asian Ink Wash
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-400 print:text-cyan-800 font-semibold">
                    Python · PyTorch · HuggingFace · FastAPI
                  </span>
                </div>
                <p className="text-neutral-300 print:text-neutral-700 leading-relaxed">
                  Trained customized LoRA weights and latent attention masks capturing pigment diffusion dynamics on textured Xuan paper. Built accompanying interactive inference frontend.
                </p>
              </div>

              {/* Project 4 */}
              <div className="p-4 rounded-2xl bg-neutral-900/60 print:bg-transparent border border-neutral-800 print:border-neutral-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white print:text-black">
                    RustLint CLI — Ultra-Fast SIMD Code Inspector
                  </h3>
                  <span className="font-mono text-[11px] text-cyan-400 print:text-cyan-800 font-semibold">
                    Rust · AVX-512 SIMD · CLI Tool
                  </span>
                </div>
                <p className="text-neutral-300 print:text-neutral-700 leading-relaxed">
                  Open-source static analyzer leveraging SIMD vectorization to parse large codebases 12x faster than standard AST tools with memory-mapped file indexing.
                </p>
              </div>

            </div>
          </div>

          {/* Interdisciplinary Accreditations */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 print:text-cyan-800 font-bold mb-2.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" /> Interdisciplinary Honors & Publications
            </h2>
            <div className="text-xs space-y-1.5 text-neutral-300 print:text-neutral-800 leading-relaxed">
              <p>• <strong>Published Literary Author & Essayist:</strong> Critical examinations of digital aesthetics, game theory, and East Asian art philosophy.</p>
              <p>• <strong>Exhibited Fine Artist:</strong> Traditional Chinese brushwork and contemporary digital installations exhibited in regional galleries.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
