import React from 'react';
import { ShoppingCart, Heart, Linkedin, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-2 md:mt-4 bg-white border-t border-slate-200 shadow-[0_-4px_25px_-10px_rgba(0,0,0,0.06)] rounded-t-3xl pb-6">
      {/* Optional: Very subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10"></div>
      
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        
        {/* Top Section - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start mb-10 text-center md:text-left space-y-6 md:space-y-0">
          
          {/* LEFT SECTION - Brand */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm border border-primary/5">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-800 leading-tight">
                Quick <span className="hidden lg:inline"><br /></span>Basket
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[260px] md:max-w-xs">
              Smart Barcode Billing System for Modern Retail
            </p>
          </div>

          {/* CENTER SECTION - Links */}
          <div className="flex flex-col items-center md:items-start md:mx-auto">
            <h3 className="text-slate-800 font-bold mb-5 uppercase tracking-wider text-sm flex items-center">
              Useful Links
            </h3>
            <div className="flex flex-col space-y-3.5 items-center md:items-start">
              <Link to="/" className="text-slate-500 hover:text-primary font-medium transition-all duration-300 ease-in-out relative group overflow-hidden">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link to="/" className="text-slate-500 hover:text-primary font-medium transition-all duration-300 ease-in-out relative group overflow-hidden">
                Terminal
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
              <Link to="/admin" className="text-slate-500 hover:text-secondary font-medium transition-all duration-300 ease-in-out relative group overflow-hidden">
                Admin Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* RIGHT SECTION - Socials */}
          <div className="flex flex-col items-center md:items-start md:ml-auto">
            <h3 className="text-slate-800 font-bold mb-5 uppercase tracking-wider text-sm">CONNECT</h3>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/subha-mondal10/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 text-slate-400 hover:text-[#0A66C2] hover:bg-blue-50 hover:shadow-md hover:scale-110 hover:-translate-y-1 rounded-full transition-all duration-300 ease-in-out" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/webdevbysubha" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 text-slate-400 hover:text-slate-800 hover:bg-slate-200 hover:shadow-md hover:scale-110 hover:-translate-y-1 rounded-full transition-all duration-300 ease-in-out" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://x.com/webdevbysubha" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-200 hover:shadow-md hover:scale-110 hover:-translate-y-1 rounded-full transition-all duration-300 ease-in-out" title="X (Twitter)">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:learncswithsubha@gmail.com" className="p-3 bg-slate-100 text-slate-400 hover:text-primary hover:bg-primary/10 hover:shadow-md hover:scale-110 hover:-translate-y-1 rounded-full transition-all duration-300 ease-in-out" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>

        {/* BOTTOM SECTION - Credits & Copyright */}
        <div className="border-t border-slate-200 pt-8 mt-4 flex flex-col items-center space-y-4">
          <p className="flex items-center justify-center gap-2 text-slate-600 font-medium text-sm transition-all duration-300 ease-in-out">
            Developed with <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]" /> by Subha
          </p>
          
          <p className="text-slate-400 text-xs font-medium tracking-wide">
            &copy; {currentYear} Quick Basket POS. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
