import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ServiceDetailPage = ({ services }) => {
  const { serviceId } = useParams();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20"
    >
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="outline" className="mb-8 border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200">
          <Link to="/#services">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Link>
        </Button>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {service.title}
        </motion.h1>
        
        <motion.p 
          className="text-lg text-slate-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {service.details || "Detailed information about this service will be available soon."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-slate-800/50 border border-emerald-700/50 rounded-lg p-6 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Contact for this Service</h2>
          <p className="text-slate-400">For more information about {service.title}, please contact the relevant department at <a href="mailto:servicedesk@agriuni.edu" className="text-emerald-400 hover:underline">servicedesk@agriuni.edu</a> or call (123) 456-7890 ext. 100.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceDetailPage;