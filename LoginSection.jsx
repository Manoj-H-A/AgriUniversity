import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const LoginSection = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <motion.section id="login" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">Portal Login</h2>
        <Card className="bg-slate-800/50 border-secondary/50 p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username-landing" className="text-slate-300 text-sm font-medium">Username / USN / Email</Label>
              <Input
                id="username-landing"
                name="username"
                type="text"
                value={loginData.username}
                onChange={handleInputChange}
                placeholder="Enter your login ID"
                className="mt-1 bg-slate-700/50 border-slate-600 focus:border-primary focus:ring-primary text-slate-50"
                required
              />
            </div>
            <div>
              <Label htmlFor="password-landing" className="text-slate-300 text-sm font-medium">Password</Label>
              <Input
                id="password-landing"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="mt-1 bg-slate-700/50 border-slate-600 focus:border-primary focus:ring-primary text-slate-50"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105">
              <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
          </form>
        </Card>
      </div>
    </motion.section>
  );
};

export default LoginSection;