import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookHeart, Menu, X, LogOut, UserCog, LayoutDashboard as LayoutDashboardIcon } from 'lucide-react';

const NavLink = ({ to, children, onClick, isHashLink = false, currentPathname }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isHashLink) {
      e.preventDefault();
      const targetId = to.substring(to.indexOf('#') + 1);
      if (currentPathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); 
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={isHashLink ? (currentPathname === '/' ? `#${to.split('#')[1]}`: `/${to}`) : to}
      onClick={handleClick}
      className="text-slate-200 hover:text-primary transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  );
};


const SiteHeader = ({ isAuthenticated, userType, onLogout, currentUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };
  
  let headerNavLinks = [];
  if (isAuthenticated) {
    if (userType === 'student') {
      headerNavLinks = [{ to: "/dashboard", label: "Student Dashboard", icon: LayoutDashboardIcon, isHashLink: false }];
    } else if (userType === 'staff') {
      headerNavLinks = [{ to: "/college-dashboard", label: "College Dashboard", icon: UserCog, isHashLink: false }];
    }
  } else {
    headerNavLinks = [
      { to: "#home", label: "Home", isHashLink: true },
      { to: "#about", label: "About", isHashLink: true },
      { to: "#services", label: "Services", isHashLink: true },
      { to: "#events", label: "Events", isHashLink: true },
      { to: "#contact", label: "Contact", isHashLink: true },
    ];
  }


  return (
    <header className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center" onClick={handleNavLinkClick}>
              <BookHeart className="h-10 w-10 text-primary mr-3" />
              <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">
                UAS Dharwad Portal
              </span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex space-x-2 items-center">
            {headerNavLinks.map(link => (
              <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick} isHashLink={link.isHashLink} currentPathname={location.pathname}>
                {link.icon && <link.icon className="mr-2 h-4 w-4 inline-block" />}
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && (
              <>
                <span className="text-slate-300 text-sm px-3 py-2">Welcome, {currentUser?.name || currentUser?.username}!</span>
                <Button variant="ghost" size="sm" onClick={handleLogoutClick} className="text-slate-200 hover:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            )}
             {!isAuthenticated && (
                 <Button onClick={() => { navigate('/#login'); handleNavLinkClick(); }} className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-all hover:scale-105">
                    Login
                </Button>
            )}
          </nav>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="text-slate-200 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800/95 pb-4"
        >
          <nav className="flex flex-col space-y-2 px-4 pt-2">
            {headerNavLinks.map(link => (
              <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick} isHashLink={link.isHashLink} currentPathname={location.pathname}>
                {link.icon && <link.icon className="mr-2 h-4 w-4 inline-block" />}
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated && (
               <>
                <span className="text-slate-300 text-sm px-3 py-2 text-center">Welcome, {currentUser?.name || currentUser?.username}!</span>
                <Button variant="ghost" onClick={handleLogoutClick} className="text-slate-200 hover:text-red-400 justify-center">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </>
            )}
            {!isAuthenticated && (
                 <Button onClick={() => { navigate('/#login'); handleNavLinkClick();}} className="w-full mt-2 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                    Login
                </Button>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default SiteHeader;