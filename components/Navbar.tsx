'use client';

import { useEffect, useState } from 'react';

interface NavbarProps {
  onOrderClick: () => void;
}

export default function Navbar({ onOrderClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    onOrderClick();
  };

  return (
    <nav
      className="navbar"
      id="navbar"
      style={{ padding: scrolled ? '10px 0' : '15px 0' }}
    >
      <div className="container">
        <div className="logo">
          <div className="logo-icon">🏆</div>
          <div>
            <span>CHAMPION MAN</span>
            <small>NATURAL MEDIC</small>
          </div>
        </div>
        <div
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          id="navLinks"
        >
          <a href="#home" onClick={handleLinkClick}>
            Bosh
          </a>
          <a href="#ingredients" onClick={handleLinkClick}>
            Tarkib
          </a>
          <a href="#benefits" onClick={handleLinkClick}>
            Foydalari
          </a>
          <a href="#howtouse" onClick={handleLinkClick}>
            Qo'llanma
          </a>
          <a
            href="#"
            className="order-nav-btn"
            id="navOrderBtn"
            onClick={handleOrderClick}
          >
            Buyurtma
          </a>
        </div>
        <div
          className="menu-btn"
          id="menuBtn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </div>
    </nav>
  );
}
