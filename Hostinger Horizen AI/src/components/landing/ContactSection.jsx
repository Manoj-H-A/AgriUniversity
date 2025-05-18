import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const ContactSection = () => (
  <motion.section id="contact" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-16 md:py-24 bg-slate-800/50 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">Contact Us</h2>
      <div className="max-w-2xl mx-auto text-slate-300 text-lg space-y-4">
        <p className="flex items-center justify-center"><MapPin className="mr-2 h-5 w-5 text-primary" /> University of Agriculture, Dharwad, Karnataka, India - 580005</p>
        <p className="flex items-center justify-center"><Phone className="mr-2 h-5 w-5 text-primary" /> Phone: +91-836-2214420</p>
        <p className="flex items-center justify-center"><Mail className="mr-2 h-5 w-5 text-primary" /> Email: <a href="mailto:registrar@uasd.in" className="text-orange-400 hover:text-primary underline">registrar@uasd.in</a></p>
      </div>
      <div className="mt-12">
        <Button
          onClick={() => window.open('https://www.openstreetmap.org/?mlat=15.4784&mlon=74.9929#map=15/15.4784/74.9929', '_blank')}
          className="bg-gradient-to-r from-secondary to-teal-600 hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105"
        >
          View on Map
        </Button>
      </div>
    </div>
  </motion.section>
);

export default ContactSection;