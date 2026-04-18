/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Portfolio from './pages/Portfolio';
import Recommendations from './pages/Recommendations';
import { UserProfileProvider } from './context/UserProfileContext';
import { PortfolioProvider } from './context/PortfolioContext';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="app-wrapper flex flex-col min-h-screen">
      <Navbar />
      <main className="container flex-grow pt-8 pb-12 overflow-hidden">
        <div key={location.pathname} className="animate-slide-up">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="*" element={<div className="text-center py-20">404 - Page Not Found</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProfileProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </PortfolioProvider>
    </UserProfileProvider>
  );
}
