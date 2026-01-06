
import React, { useState } from 'react';
import { Section, Project } from '../types';
import { PROJECTS, EXPERIENCES, ACHIEVEMENTS, SKILLS_CATEGORIES } from '../constants';
import { Github, Linkedin, Mail, Download, ExternalLink, ChevronRight, Menu, X, ArrowUpRight, Award, Briefcase, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OverlayProps {
  currentSection: Section;
  setSection: (s: Section) => void;
  loading: boolean;
}

const Overlay: React.FC<OverlayProps> = ({ currentSection, setSection, loading }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (loading) return null;

  const NavItem = ({ section, label }: { section: Section; label: string }) => (
    <button
      onClick={() => {
        setSection(section);
        setMobileMenuOpen(false);
      }}
      className={`transition-all duration-300 font-orbitron text-[10px] md:text-xs tracking-[0.2em] uppercase hover:text-indigo-400 ${
        currentSection === section ? 'text-indigo-500 font-bold border-b-2 border-indigo-500 pb-1' : 'text-gray-400'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col">
      {/* Navbar - Slimmed & More Transparent */}
      <nav className="p-3 md:p-5 flex justify-between items-center pointer-events-auto bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setSection(Section.HERO)}>
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-orbitron font-bold text-lg shadow-[0_0_15px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="font-orbitron tracking-tighter text-xs md:text-sm hidden sm:block text-white/90">SHIVANGI SHARMA</span>
        </div>

        <div className="hidden lg:flex gap-6 xl:gap-10">
          <NavItem section={Section.HERO} label="Home" />
          <NavItem section={Section.ABOUT} label="About" />
          <NavItem section={Section.SKILLS} label="Skills" />
          <NavItem section={Section.PROJECTS} label="Work" />
          <NavItem section={Section.EXPERIENCE} label="Exp" />
          <NavItem section={Section.ACHIEVEMENTS} label="Awards" />
          <NavItem section={Section.CONTACT} label="Contact" />
        </div>

        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-indigo-500 transition-colors pointer-events-auto p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pointer-events-auto z-[60]"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8">
              <X size={32} />
            </button>
            <NavItem section={Section.HERO} label="Home" />
            <NavItem section={Section.ABOUT} label="About" />
            <NavItem section={Section.SKILLS} label="Skills" />
            <NavItem section={Section.PROJECTS} label="Work" />
            <NavItem section={Section.EXPERIENCE} label="Experience" />
            <NavItem section={Section.ACHIEVEMENTS} label="Achievements" />
            <NavItem section={Section.CONTACT} label="Contact" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 pointer-events-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-zinc-950/40 backdrop-blur-2xl border border-white/10 w-full max-w-4xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-48 md:h-auto bg-gradient-to-br from-indigo-900/20 to-black/20 p-8 flex flex-col justify-end border-r border-white/5">
                <h2 className="text-3xl font-black font-orbitron mb-4 text-white uppercase">{selectedProject.title}</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.slice(0, 4).map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium uppercase tracking-widest">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-bold text-xs hover:bg-indigo-400 hover:text-white transition-all uppercase tracking-widest">
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full font-bold text-xs hover:bg-indigo-700 transition-all uppercase tracking-widest">
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto max-h-[50vh] md:max-h-[70vh] scrollbar-hide">
                <div className="text-indigo-400 font-orbitron text-[10px] font-black tracking-[0.3em] uppercase mb-4 opacity-70">Project Overview</div>
                <p className="text-gray-200 text-sm leading-relaxed mb-8">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>
                
                {selectedProject.features && (
                  <>
                    <div className="text-indigo-400 font-orbitron text-[10px] font-black tracking-[0.3em] uppercase mb-4 opacity-70">Key Features</div>
                    <ul className="space-y-2">
                      {selectedProject.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          {currentSection === Section.HERO && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl text-center pointer-events-auto"
            >
              <h1 className="text-4xl md:text-8xl font-black mb-4 tracking-tighter font-orbitron bg-gradient-to-b from-white to-indigo-500 bg-clip-text text-transparent leading-none">
                SHIVANGI SHARMA
              </h1>
              <p className="text-base md:text-2xl text-gray-300 font-light tracking-wide mb-10 max-w-2xl mx-auto">
                <span className="text-white font-medium">B.Tech CS Engineering</span> @ Amity University. 
                Full-Stack Developer & AI Innovator.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => setSection(Section.PROJECTS)}
                  className="px-6 py-3 md:px-8 md:py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all group"
                >
                  Explore Work
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all">
                  <Download size={18} /> Resume
                </button>
              </div>
            </motion.div>
          )}

          {currentSection === Section.ABOUT && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="max-w-3xl pointer-events-auto bg-black/10 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/10 shadow-3xl overflow-y-auto max-h-[65vh] scrollbar-hide"
            >
              <h2 className="text-2xl md:text-4xl font-black mb-6 font-orbitron uppercase tracking-tighter">ABOUT <span className="text-indigo-500">ME</span></h2>
              <div className="space-y-4 text-gray-200 leading-relaxed text-sm md:text-base">
                <p>
                  Hi, I’m <span className="text-white font-bold">Shivangi Sharma</span>, a B.Tech Computer Science Engineering student at Amity University, Punjab, with a passion for technology, innovation, and building real-world solutions.
                </p>
                <p>
                  I specialize in <span className="text-white font-semibold">Full-Stack Web Development</span>, with experience in JavaScript, Python, Node.js, React.js, and MongoDB, along with projects in AI-powered applications. I’ve completed certifications from <span className="text-indigo-400">Google, Microsoft, LinkedIn, and CS50</span>.
                </p>
                <p>
                  My experience includes internships at <span className="text-white">Trantor and Ycotes</span>, along with campus ambassador roles at Google and Techfest IIT Bombay.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { label: 'Internships', val: '2+' },
                    { label: 'Certificates', val: '10+' },
                    { label: 'Impact', val: 'High' }
                  ].map(stat => (
                    <div key={stat.label} className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                      <div className="text-lg md:text-2xl font-black text-indigo-500 font-orbitron">{stat.val}</div>
                      <div className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentSection === Section.SKILLS && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pointer-events-auto max-w-6xl w-full h-[65vh] overflow-y-auto scrollbar-hide p-2"
            >
              {SKILLS_CATEGORIES.map((cat, idx) => (
                <div key={cat.name} className="p-6 bg-zinc-900/10 border border-white/5 rounded-2xl backdrop-blur-md hover:border-indigo-500/50 transition-all flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-500/10 rounded flex items-center justify-center text-indigo-400">
                      {idx % 3 === 0 ? <Code2 size={16} /> : idx % 3 === 1 ? <Briefcase size={16} /> : <Award size={16} />}
                    </div>
                    <h3 className="text-white font-orbitron text-[10px] font-black tracking-[0.2em] uppercase">{cat.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-300 hover:text-white transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentSection === Section.PROJECTS && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full max-w-7xl pointer-events-auto overflow-x-auto pb-6 flex gap-6 scrollbar-hide"
            >
              {PROJECTS.map((proj) => (
                <div 
                  key={proj.id} 
                  className="min-w-[280px] md:min-w-[380px] p-6 bg-zinc-900/20 backdrop-blur-lg border border-white/10 rounded-3xl flex flex-col hover:border-indigo-500/50 transition-all group"
                >
                  <div className="h-40 bg-zinc-800/20 rounded-2xl mb-4 overflow-hidden relative flex items-center justify-center border border-white/5">
                    <Code2 size={40} className="text-indigo-500/30 group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => setSelectedProject(proj)}
                         className="px-6 py-2 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest"
                       >
                         Case Study
                       </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-orbitron mb-2 group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">{proj.title}</h3>
                  <p className="text-gray-300 text-xs mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-2">
                      {proj.github && (
                        <a href={proj.github} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
                          <Github size={14} />
                        </a>
                      )}
                      {proj.link && (
                        <a href={proj.link} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                    <button 
                      onClick={() => setSelectedProject(proj)}
                      className="text-[9px] font-black hover:text-indigo-400 transition-colors uppercase tracking-[0.3em] flex items-center gap-1"
                    >
                      Details <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentSection === Section.EXPERIENCE && (
            <motion.div
              key="exp"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-3xl w-full pointer-events-auto h-[60vh] overflow-y-auto scrollbar-hide p-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <Briefcase size={28} className="text-indigo-500" />
                <h2 className="text-2xl md:text-3xl font-black font-orbitron uppercase">PROFESSIONAL <span className="text-indigo-500">EXPERIENCE</span></h2>
              </div>
              <div className="space-y-10">
                {EXPERIENCES.map((item) => (
                  <div key={item.id} className="relative pl-8 border-l-2 border-indigo-500/20 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="absolute left-[-9px] top-6 w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,1)]"></div>
                    <div className="mb-1 text-indigo-400 font-orbitron text-[10px] font-black tracking-widest">{item.date}</div>
                    <h3 className="text-xl font-bold text-white mb-1 uppercase">{item.title}</h3>
                    <p className="text-indigo-400/80 font-bold mb-4 italic text-xs tracking-widest uppercase">{item.company}</p>
                    <ul className="space-y-3">
                      {item.details.map((d, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-3 leading-relaxed">
                          <span className="text-indigo-500 mt-1.5 shrink-0">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === Section.ACHIEVEMENTS && (
            <motion.div
              key="ach"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl w-full pointer-events-auto h-[60vh] overflow-y-auto scrollbar-hide p-2"
            >
              <div className="flex items-center gap-3 mb-8">
                <Award size={28} className="text-indigo-500" />
                <h2 className="text-2xl md:text-3xl font-black font-orbitron uppercase">HACKATHONS & <span className="text-indigo-500">AWARDS</span></h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {ACHIEVEMENTS.map((item) => (
                  <div key={item.id} className="p-6 bg-zinc-900/10 border border-white/5 rounded-3xl hover:bg-indigo-500/10 hover:border-indigo-500/30 backdrop-blur-md transition-all group">
                    <div className="text-[10px] font-orbitron text-indigo-500 mb-2 font-bold tracking-[0.2em]">{item.date}</div>
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                    <div className="text-xs text-indigo-400/80 font-medium mb-3">{item.event}</div>
                    <p className="text-[11px] text-gray-300 italic leading-relaxed">{item.result}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentSection === Section.CONTACT && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md w-full pointer-events-auto bg-black/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 shadow-3xl text-center"
            >
              <h2 className="text-3xl font-black font-orbitron mb-3 uppercase">LET'S <span className="text-indigo-500">TALK</span></h2>
              <p className="text-gray-400 mb-8 text-[10px] uppercase tracking-[0.3em]">Collaborations // Opportunities</p>
              
              <div className="flex flex-col gap-3 text-left">
                {[
                  { icon: Mail, label: 'Email', val: 'shivangidps40@gmail.com', href: 'mailto:shivangidps40@gmail.com' },
                  { icon: Linkedin, label: 'LinkedIn', val: 'shivangi-sharma2405', href: 'https://linkedin.com/in/shivangi-sharma2405/' },
                  { icon: Github, label: 'GitHub', val: 'Shiv24angi', href: 'https://github.com/Shiv24angi' }
                ].map(item => (
                  <a key={item.label} href={item.href} target="_blank" className="flex items-center gap-4 p-4 bg-white/5 hover:bg-indigo-500/10 border border-white/5 rounded-xl transition-all group">
                    <div className="w-10 h-10 bg-indigo-500/10 flex items-center justify-center rounded text-indigo-400 group-hover:scale-110 transition-transform">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-[8px] text-gray-500 uppercase font-black tracking-widest">{item.label}</div>
                      <div className="text-xs font-medium text-gray-100">{item.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer - Slimmed & More Transparent */}
      <footer className="p-3 md:p-5 flex justify-between items-end pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-1">
          <p className="text-[8px] md:text-[9px] font-orbitron tracking-[0.4em] text-zinc-500 uppercase">Shivangi Sharma // 2025 Architecture</p>
          <div className="flex gap-4 text-zinc-600">
            <a href="https://github.com/Shiv24angi" target="_blank" className="hover:text-white transition-colors"><Github size={14} /></a>
            <a href="https://linkedin.com/in/shivangi-sharma2405/" target="_blank" className="hover:text-white transition-colors"><Linkedin size={14} /></a>
          </div>
        </div>

        <div className="pointer-events-auto hidden md:flex flex-col items-end gap-1">
          <div className="flex gap-1 h-4 items-center">
            {Object.values(Section).map((s) => (
              <div 
                key={s}
                className={`w-0.5 transition-all duration-500 ${currentSection === s ? 'bg-indigo-500 h-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]' : 'bg-zinc-800/40 h-1.5'}`}
              ></div>
            ))}
          </div>
          <span className="text-[8px] font-orbitron font-bold text-zinc-800 uppercase tracking-widest">Active State Index</span>
        </div>
      </footer>
    </div>
  );
};

export default Overlay;
