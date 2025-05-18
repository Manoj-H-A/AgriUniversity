import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const DashboardCard = ({ icon: Icon, title, children, actionButton, className, footerContent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={className}
  >
    <Card className="bg-slate-800/70 border-secondary/60 hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {title && (
        <CardHeader className="flex flex-row items-center space-x-3 pb-3 pt-4 px-4">
          {Icon && (
            <div className="p-2.5 bg-primary/20 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex-grow text-slate-300 pt-2 pb-4 px-4">
        {children}
      </CardContent>
      {(actionButton || footerContent) && (
        <CardFooter className="pt-0 pb-4 px-4">
          {actionButton}
          {footerContent}
        </CardFooter>
      )}
    </Card>
  </motion.div>
);

export default DashboardCard;