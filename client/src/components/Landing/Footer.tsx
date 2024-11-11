import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 md:py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
        <p className="font-semibold text-sm md:text-[1.1rem] mb-4 md:mb-0 md:mr-4">
          &copy; 2024 Interview Tracker | Developed by Nidhish
        </p>
        <div className="flex justify-center md:justify-end space-x-4">
          <SocialIcon icon={<IoLogoLinkedin/>} href="https://www.linkedin.com/in/nidhish-srivastava/"/>
          <SocialIcon icon={<IoLogoTwitter/>} href="https://twitter.com/Nidhish_30"/>
          <SocialIcon icon={<IoLogoGithub/>} href="https://github.com/nidhish-srivastava"/>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-gray-400 transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

export default Footer;
