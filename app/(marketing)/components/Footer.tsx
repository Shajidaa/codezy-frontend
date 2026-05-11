import React from 'react';
import { 
  FaGithub, 
  FaYoutube, 
  FaDiscord, 
  FaLinkedinIn, 

} from 'react-icons/fa';
import Logo from './logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#393536] text-[#FFFFFF] border-t-4 border-[#EEB30D] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          
          <Logo/>
          <p className="text-brand-gray text-sm leading-relaxed">
            Empowering the next generation of engineers through project-based learning and industry-standard practices.
          </p>
          <div className="flex space-x-4">
            <SocialIcon icon={<FaGithub />} href="#" />
            <SocialIcon icon={<FaDiscord />} href="#" />
            <SocialIcon icon={<FaYoutube />} href="#" />
            <SocialIcon icon={<FaLinkedinIn />} href="#" />
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <h3 className="text-brand-gold  font-semibold uppercase tracking-wider mb-6">Curriculum</h3>
          <ul className="space-y-3 text-brand-gray">
            <FooterLink text="Frontend Development" />
            <FooterLink text="Backend Systems" />
            <FooterLink text="DevOps Roadmap" />
            <FooterLink text="Data Structures" />
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-brand-gold  font-semibold uppercase tracking-wider mb-6">Community</h3>
          <ul className="space-y-3 text-brand-gray">
            <FooterLink text="Open Source" />
            <FooterLink text="Success Stories" />
            <FooterLink text="Code Challenges" />
            <FooterLink text="Technical Blog" />
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h3 className="text-brand-white font-semibold mb-4">Stay in the loop</h3>
          <p className="text-brand-gray text-sm mb-4">Get curated coding resources weekly.</p>
          <div className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="engineer@email.com" 
              className="bg-[#2a2728] border border-[#949293] px-4 py-2 rounded focus:outline-none focus:border-[#EEB30D] transition-colors"
            />
            <button className="bg-brand-gold  text-[#393536] font-bold py-2 rounded hover:bg-[#d4a00b] transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#949293]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[#949293] text-xs">
        <p>© {currentYear} Codezy Learning Inc. Built for developers, by developers.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-brand-gold">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

// Sub-components for cleaner code
const FooterLink = ({ text }: { text: string }) => (
  <li>
    <a href="#" className="hover:text-brand-gold transition-colors duration-200 flex items-center group">
      <span className="w-0 group-hover:w-2 h-px bg-brand-gold  mr-0 group-hover:mr-2 transition-all"></span>
      {text}
    </a>
  </li>
);

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full border border-brand-gray flex items-center justify-center text-[#949293] hover:border-[#EEB30D] hover:text-[#EEB30D] transition-all"
  >
    {icon}
  </a>
);

export default Footer;