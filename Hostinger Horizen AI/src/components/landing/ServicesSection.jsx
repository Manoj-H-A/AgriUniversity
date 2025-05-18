import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, GraduationCap, ArrowRight } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const serviceIcons = {
  'Library & E-Resources': BookOpen,
  'Career Counseling': Users,
  'Academic Support': GraduationCap,
};

const ServicesSection = ({ services }) => {
  return (
    <motion.section id="services" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Student Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.title] || BookOpen;
            return (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.5 }}>
                <Card className="bg-slate-800/50 border-emerald-700/50 hover:shadow-emerald-500/30 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader className="items-center">
                    <div className="p-4 bg-emerald-500/20 rounded-full mb-4">
                      <Icon className="h-10 w-10 text-emerald-300" />
                    </div>
                    <CardTitle className="text-2xl text-emerald-300 text-center">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-slate-300 text-center">{service.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="border-emerald-500 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 w-full">
                      <Link to={`/services/${service.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;