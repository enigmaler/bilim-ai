import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => (
  <motion.header
    className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-3">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Globe className="w-4 h-4 text-white" />
        </motion.div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          BILIMAI ✨
        </h1>
      </Link>
      <nav className="space-x-4 text-sm font-medium">
        <Link to="/" className="text-gray-700 hover:text-violet-600">
          Chat
        </Link>
        <Link to="/grammar" className="text-gray-700 hover:text-violet-600">
          Grammar
        </Link>
        <Link to="/vocabulary" className="text-gray-700 hover:text-violet-600">
          Vocabulary
        </Link>
        <Link to="/listening" className="text-gray-700 hover:text-violet-600">
          Listening
        </Link>
      </nav>
      {children}
    </div>
  </motion.header>
);

export default Header;
