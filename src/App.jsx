import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ExternalLink,
  Menu,
  X,
  CheckCircle2,
  Phone,
  ChevronRight,
  Download,
  Code,
  Layout,
  Smartphone,
  Server,
  User
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// Custom SVG Icons
const Github = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const Whatsapp = ({ size = 24, ...props }) => (
  <svg width={size} height={size} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L22 4l-1.5 6.5z"></path></svg>
);

// Constant Data
const PROJECTS_DATA = [
  { 
    id: 1,
    title: 'Web Development', 
    category: 'Web App', 
    image: 'src/assets/money.png',
    desc: 'A full-scale SaaS platform built for enterprise management. It features real-time data visualization, user authentication, and multi-tenant support.',
    tech: ['React', 'Next.js', 'Firebase', 'Tailwind CSS'],
    demoUrl: 'https://app.millionaze.com/v2/preview/OiopNKgCpBaRfK61ztZ2'
  },
  { 
    id: 2,
    title: 'E-commerce Website Design', 
    category: 'UI/UX Design', 
    image: 'src/assets/Arovie.png',
    desc: 'An intuitive e-commerce experience designed for mobile-first users. Focused on conversion optimization and seamless checkout flows.',
    tech: ['Figma', 'React Native', 'Node.js'],
    demoUrl: 'https://arovie.store'
  },
  { 
    id: 3,
    title: 'Mobile App Development', 
    category: 'Mobile App', 
    image: 'src/assets/angency.png',
    desc: 'A secure and fast cryptocurrency wallet supporting multiple blockchains. Includes features like biometrics, real-time price tracking, and swapping.',
    tech: ['Flutter', 'Solidity', 'Web3.js'],
    demoUrl: 'https://app.millionaze.com/v2/preview/swMUvXAF4FCdbYKO1oqj'
  },
  { 
    id: 4,
    title: 'Social Media Marketing', 
    category: 'Web Interface', 
    image: 'src/assets/maketing social.png',
    desc: 'Advanced AI management console with real-time analytics, user prompt history, and model performance monitoring.',
    tech: ['TypeScript', 'OpenAI API', 'Three.js'],
    demoUrl: 'https://app.millionaze.com/v2/preview/nYk5DGMNHhibjg5CpNRm'
  },
  { 
    id: 5,
    title: 'Fitness Website', 
    category: 'Web App', 
    image: 'src/assets/Fintness.png',
    desc: 'Track workouts, diet, and progress with social features and wearable integration for all-day health monitoring.',
    tech: ['React Native', 'HealthKit', 'Redux'],
    demoUrl: 'https://app.millionaze.com/v2/preview/G796jysomlPyyUxeeQpy'
  },
  { 
    id: 6,
    title: 'Business Websites', 
    category: 'Web App', 
    image: 'src/assets/Ai bot.png',
    desc: 'Deep insights for social campaigns. Tracks engagement, sentiment analysis, and ROI for multiple brand profiles.',
    tech: ['Vue.js', 'Chart.js', 'Python'],
    demoUrl: 'https://app.millionaze.com/v2/preview/kfbTCHYtty80m2Y9XPzH'
  },
  { 
    id: 7,
    title: 'Real Estate Portal', 
    category: 'Web Portal', 
    image: 'src/assets/houes.png',
    desc: 'Modern property marketplace with interactive maps, 3D tours, and direct communication features between agents and buyers.',
    tech: ['Next.js', 'Mapbox', 'PostgreSQL'],
    demoUrl: 'https://app.millionaze.com/v2/preview/OgKP1ureZzuqEHdcmOUd'
  },
  { 
    id: 8,
    title: 'Automation & System Solutions', 
    category: 'EdTech App', 
    image: 'src/assets/Immigrate.png',
    desc: 'Complete online education platform with course management, live sessions, and progress tracking for students and teachers.',
    tech: ['React', 'Node.js', 'WebRTC'],
    demoUrl: 'https://app.millionaze.com/v2/preview/bsFuRab5iuueVzTR3Cwf'
  },
  { 
    id: 9,
    title: 'TLanding Page Design', 
    category: 'Full Stack', 
    image: 'src/assets/medinice.png',
    desc: 'A robust system for finding and booking flights, hotels, and tours. Features intelligent recommendation and secure payments.',
    tech: ['AWS', 'Stripe API', 'GraphQL'],
    demoUrl: 'https://app.millionaze.com/v2/preview/suaTxRFOLiV49QpkiWNY'
  },
];

// Components
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-primary-dark border border-white/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-primary/50 text-white p-2 rounded-full hover:bg-secondary hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm block mb-2">{project.category}</span>
          <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-6">{project.desc}</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex space-x-4">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary flex-1 text-center py-3"
            >
              Launch Demo
            </a>
            <button className="btn-outline flex items-center justify-center space-x-2 px-6">
              <Github size={20} />
              <span>Source</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-lg py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold heading-gradient">ZUBAIR ZAHID</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link font-medium">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary py-2 px-6">Hire Me</a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg hover:text-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center">Hire Me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-primary z-[-2]"></div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] z-[-1]"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] z-[-1]"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-semibold uppercase tracking-widest block mb-4">Welcome to my universe</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hy! I'm <br />
              <span className="heading-gradient">Zubair Zahid</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              I am a dedicated developer with hands-on experience in web development, app development, and e-commerce solutions. I enjoy turning ideas into real-world products using modern technologies. </p>
            <div className="flex space-x-4">
              <a href="#contact" className="btn-primary">Hire Me</a>
              <a href="#work" className="btn-outline">View Work</a>
            </div>
          </motion.div>
        </div>

        <div className="hidden md:block" data-aos="zoom-in">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 w-[450px] h-[450px] mx-auto bg-gradient-to-br from-secondary/40 to-primary/20 rounded-full p-4">
              <img
                src="src/assets/asad.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white/10"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-card !p-4 flex items-center space-x-3"
            >
              <div className="bg-secondary/20 p-2 rounded-lg"><Layout size={20} className="text-secondary" /></div>
              <div><p className="text-xs text-secondary font-bold">Frontend Development</p><p className="text-[10px] text-gray-400">Award Winning</p></div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 -left-10 glass-card !p-4 flex items-center space-x-3"
            >
              <div className="bg-secondary/20 p-2 rounded-lg"><Code size={20} className="text-secondary" /></div>
              <div><p className="text-xs text-secondary font-bold">Web Development</p><p className="text-[10px] text-gray-400">Next.js Expert</p></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <a href="#services" className="text-gray-500 hover:text-secondary">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-500 rounded-full"
            ></motion.div>
          </div>
        </a>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Layout />, title: 'E-commerce Store Setup', desc: 'Complete online store setup with product optimization and sales focus.' },
    { icon: <Code />, title: 'Web Development', desc: 'Modern, fast, and responsive websites tailored to your business needs.' },
    { icon: <Smartphone />, title: 'Mobile App Design', desc: 'High-performance mobile apps with smooth UI and great user experience.' },
    { icon: <Server />, title: 'Backend Solutions', desc: 'Providing robust server-side development and database management services.' },
  ];

  return (
    <section id="services" className="py-24 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">My Awesome <span className="heading-gradient">Services</span></h2>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto" data-aos="fade-up">I provide a wide range of creative and technical services to help you achieve your digital goals.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="glass-card flex flex-col items-center text-center group hover:-translate-y-2"
            >
              <div className="bg-secondary/10 p-4 rounded-2xl mb-6 group-hover:bg-secondary group-hover:text-primary transition-all duration-300 text-secondary">
                {React.cloneElement(service.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.desc}</p>
              <a href="#contact" className="text-secondary font-semibold inline-flex items-center space-x-2 text-sm">
                <span>LEARN MORE</span> <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ onProjectClick }) => {
  return (
    <section id="work" className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4">A curated portfolio of my <span className="heading-gradient">most impactful work</span></h2>
            <p className="text-gray-400 max-w-xl">Every project reflects a blend of creative execution, strategic thinking, and a strong focus on delivering real results.</p>
          </div>
          <a href="#" className="btn-outline mt-8 md:mt-0" data-aos="fade-left">View All Projects</a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              className="group cursor-pointer relative glass-card !p-0 overflow-hidden rounded-3xl border border-white/10 hover:border-secondary/50 transition-all duration-500"
            >
              {/* Image Container with Hover Scroll */}
              <div 
                className="relative h-[350px] overflow-hidden"
                onClick={() => onProjectClick(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full absolute top-0 left-0 transition-transform duration-[4s] ease-in-out group-hover:translate-y-[calc(-100%+350px)]"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <div className="bg-secondary p-4 rounded-full text-primary mb-4 transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                    <ExternalLink size={24} />
                  </div>
                  <p className="text-secondary font-bold tracking-wider">VIEW CASE STUDY</p>
                </div>
              </div>

              {/* Info Area Below Image */}
              <div className="p-6 bg-primary-dark/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">{project.title}</h4>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    {project.tech.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [showPhone, setShowPhone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // To fix the "Public Key is invalid" error, you must:
    // 1. Create a file named ".env" in the root directory (New folder)
    // 2. Add your actual IDs from https://dashboard.emailjs.com/
    //    VITE_EMAILJS_SERVICE_ID=your_actual_service_id
    //    VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
    //    VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
    // 3. Restart your dev server (npm run dev)

    const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID || 'service_id_here';
    const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID || 'template_id_here';
    const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY || 'public_key_here';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then((result) => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus(''), 5000);
      }, (error) => {
          setStatus('error');
          console.error('EmailJS Error:', error);
          setTimeout(() => setStatus(''), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 bg-primary-dark relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6">Let's build something <span className="heading-gradient">Great Together</span></h2>
            <p className="text-gray-400 text-lg mb-12">I’m open to freelance projects, collaborations, and new opportunities.</p>

            <div className="space-y-6">
              <div 
                onClick={() => setShowPhone(!showPhone)} 
                className="flex items-center space-x-4 cursor-pointer hover:translate-x-2 transition-transform duration-300 group"
              >
                <div className="bg-secondary/10 p-4 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300"><Phone size={24} /></div>
                <div>
                  <p className="text-sm text-gray-400">Call Me</p>
                  <p className="font-semibold text-lg">
                    {showPhone ? "+92 329-4400384" : "+92 329 •••••••"}
                    {!showPhone && <span className="text-xs text-secondary ml-2 underline">Click to show</span>}
                  </p>
                </div>
              </div>
              <a href="mailto:darazseller970@gmail.com" className="flex items-center space-x-4 hover:translate-x-2 transition-transform duration-300 group">
                <div className="bg-secondary/10 p-4 rounded-xl text-secondary group-hover:bg-secondary group-hover:text-primary transition-all duration-300"><Mail size={24} /></div>
                <div><p className="text-sm text-gray-400">Email Me</p><p className="font-semibold text-sm md:text-base">darazseller970@gmail.com</p></div>
              </a>
              
              <div className="flex space-x-4 mt-12 pt-12 border-t border-white/5">
                <a href="#" className="bg-white/5 p-4 rounded-full text-gray-400 hover:bg-black hover:text-white transition-all duration-300">
                  <Github size={20} />
                </a>
                <a href="#" className="bg-white/5 p-4 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Linkedin size={20} />
                </a>
                <a href="https://wa.me/923294400384" className="bg-white/5 p-4 rounded-full text-gray-400 hover:bg-green-500 hover:text-white transition-all duration-300">
                  <Whatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="glass-card">
              <form onSubmit={sendEmail} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="user_name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'success' ? (
                    <><CheckCircle2 size={20} /> <span>Message Sent!</span></>
                  ) : status === 'error' ? (
                    <span className="text-red-400">Error! Try again.</span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
        <p className="text-gray-500">© 2026 Zubair Zahid. All rights reserved.</p>
        <div className="flex space-x-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-secondary">Privacy Policy</a>
          <a href="#" className="hover:text-secondary">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 1000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-primary-dark">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects onProjectClick={setSelectedProject} />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
