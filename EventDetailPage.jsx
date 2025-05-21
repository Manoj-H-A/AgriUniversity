import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';

const EventDetailPage = ({ events }) => {
  const { eventId } = useParams();
  const event = events.find(e => e.id === eventId);

  if (!event) {
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
          <Link to="/#events">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Link>
        </Button>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-sky-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {event.title}
        </motion.h1>

        <motion.div 
          className="flex items-center text-slate-400 mb-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span className="flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-emerald-400" /> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="flex items-center"><MapPin className="mr-2 h-5 w-5 text-emerald-400" /> University Auditorium</span>
        </motion.div>
        
        <motion.p 
          className="text-lg text-slate-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {event.details || "More details about this event will be posted soon. Stay tuned!"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-slate-800/50 border border-emerald-700/50 rounded-lg p-6 shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">Event Registration</h2>
          <p className="text-slate-400 mb-4">Interested in attending {event.title}? Register now to secure your spot!</p>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105">
            Register for Event
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventDetailPage;