import { Github, Linkedin, Mail, MailOpen } from 'lucide-react';

export const MobileFooter = () => {
  return (
    <footer className="fixed bottom-0 w-full flex justify-between items-center p-4 md:hidden bg-gray-50 dark:bg-gray-900">
      <a href="mailto:btorndorff@gmail.com" className="text-sm font-mono text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
        → BTORNDORFF@GMAIL.COM
      </a>
      
      <div className="flex gap-6">
        <a href="https://github.com/btorndorff" className="hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/benjaminorndorff/" className="hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};

export const DesktopFooter = () => {
    return (
      <footer className="hidden md:block">
        <div className="fixed bottom-8 right-8">
          <div className="flex flex-col gap-6">
            <a href="mailto:btorndorff@gmail.com" className="hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors group">
              <Mail className="w-5 h-5 block group-hover:hidden" />
              <MailOpen className="w-5 h-5 hidden group-hover:block" />
            </a>
            <a href="https://github.com/btorndorff" className="hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/benjaminorndorff/" className="hover:text-gray-600 dark:text-white dark:hover:text-gray-300 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="fixed bottom-8 left-8 text-sm font-mono text-gray-500 dark:text-gray-400 [writing-mode:vertical-lr] transform rotate-180">
          UPDATED 9/29/24
        </div>
      </footer>
    );
};
