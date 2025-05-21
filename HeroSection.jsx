import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const HeroSection = () => {
  return (
    <motion.section
      id="home"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="py-20 md:py-32 bg-cover bg-center relative"
    >
      <img  
        className="absolute inset-0 w-full h-full object-cover -z-10" 
        alt="Panoramic view of an agricultural university campus at sunset"
       src="https://images.unsplash.com/photo-1677730277400-097e5da58a56" />
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-400 to-yellow-300"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
        >
          University of Agricultural Sciences, Dharwad
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
        >
          Pioneering agricultural education, research, and extension for a sustainable future.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroSection;