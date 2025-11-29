import { Github, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const linkClass =
    "text-sm text-neutral-300 hover:text-white transition-colors";

  return (
    <footer className="bg-black text-neutral-300 py-14 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 pb-12 mb-10 border-b border-neutral-800">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" aria-label="Gymie Home" className="inline-block mb-4">
              <h2 className="text-3xl font-black tracking-tight text-white">
                Gym<span className="text-black bg-yellow-300 rounded px-1.5">ie</span>
              </h2>
            </Link>

            <p className="text-sm max-w-sm leading-relaxed text-neutral-400">
              Elevate your fitness journey with the best trainers, programs, 
              and a community built for growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li><Link to="/memberships" className={linkClass}>Memberships</Link></li>
              <li><Link to="/trainers" className={linkClass}>Trainers</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <p className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-white" />
                123 Gym Street, Fitness City, 90210
              </p>

              <p className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-white" />
                <a href="mailto:support@gymie.com" className={linkClass}>
                  support@gymie.com
                </a>
              </p>

              <p className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-white" />
                (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Gymie Inc. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-800">
              <Github className="h-5 w-5 text-white" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-800">
              <Linkedin className="h-5 w-5 text-white" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-800">
              <Instagram className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
