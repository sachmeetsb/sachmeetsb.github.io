import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-secondary py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Kartar AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
