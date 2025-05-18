import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, ArrowRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const EventsSection = ({ events }) => {
  return (
    <motion.section id="events" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-16 md:py-24 bg-slate-800/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.5 }}>
              <Card className="bg-slate-800/50 border-emerald-700/50 hover:shadow-emerald-500/30 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl text-emerald-300">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-slate-400 flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" /> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-slate-300">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 w-full">
                     <Link to={`/events/${event.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EventsSection;