import { Github, Linkedin } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="hidden md:flex md:flex-row gap-2 md:fixed md:bottom-8 md:right-8 text-gray-600 dark:text-gray-400">
      <a 
        href="https://github.com/btorndorff" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
      >
        <Github className="w-5 h-5" />
      </a>
      <span className="text-gray-400 dark:text-gray-600">|</span>
      <a 
        href="https://www.linkedin.com/in/benjaminorndorff/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  );
};

export default SocialLinks;