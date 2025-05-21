import React from 'react';

const SiteFooter = () => {
  return (
    <footer className="py-8 bg-green-800/50 text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Agricultural University. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Powered by Hostinger Horizons
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;