import React from 'react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { scrollToSection } from '../utils/scrollUtils';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0e1116] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.h1
          className="text-8xl font-bold text-[#3de58f] mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist. Let's get you back home!
        </p>
        <motion.button
          onClick={() => scrollToSection('#hero')}
          className="bg-[#3de58f] text-black font-semibold px-6 py-3 rounded-md flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/ "> <FaHome /> Go Home</Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
