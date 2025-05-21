import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const AboutSection = () => (
  <motion.section id="about" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-16 md:py-24 bg-slate-800/50 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">About Our University</h2>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img 
            className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video"
            alt="University of Agriculture Dharwad campus with lush green fields and academic buildings"
            src="https://images.unsplash.com/photo-1674450654605-472b2c630645" />
        </div>
        <div className="text-slate-300 space-y-4 text-lg">
          <p>The University of Agricultural Sciences, Dharwad (UASD) was established on October 1, 1986. Our mission is to provide leadership in teaching, research and extension in agriculture and allied sciences.</p>
          <p>We are committed to developing human resources, innovative technologies and their dissemination to serve the farming community of Karnataka. We offer a wide array of programs from undergraduate to doctoral levels, supported by modern facilities and experienced faculty.</p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default AboutSection;