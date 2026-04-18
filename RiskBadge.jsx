import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, User, List, TrendingUp, Compass } from 'lucide-react';
import { PortfolioContext } from '../context/PortfolioContext';

export default function Navbar() {
  const location = useLocation();
  const { portfolio } = useContext(PortfolioContext);
  
  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: List },
    { name: 'Recommendations', path: '/recommendations', icon: TrendingUp },
    { name: 'Portfolio', path: '/portfolio', icon: Wallet, count: portfolio.items.length },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="nav-bar">
      <div className="container px-10">
        <div className="nav-inner flex justify-between items-center">
          <Link to="/" className="nav-brand flex items-center">
            <Compass className="w-8 h-8 mr-2 text-vestor-green" />
            <span className="brand-text text-vestor-green">Vestor</span>
          </Link>
          
          <div className="nav-menu hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link flex items-center ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name === 'Home' ? 'Dashboard' : link.name}
                {link.count !== undefined && link.count > 0 && (
                  <span className="nav-count ml-1">
                    {link.count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex">
             <Link to="/portfolio" className="nav-mobile-icon">
               <Wallet />
               {portfolio.items.length > 0 && (
                 <span className="nav-count-mobile">
                   {portfolio.items.length}
                 </span>
               )}
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
