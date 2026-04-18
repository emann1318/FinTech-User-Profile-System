import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, Info, Layout } from 'lucide-react';
import RiskBadge from './RiskBadge';
import { PortfolioContext } from '../context/PortfolioContext';

export default function ProductCard({ product }) {
  const { addToPortfolio, portfolio } = useContext(PortfolioContext);
  const [isAdding, setIsAdding] = useState(false);
  const [investAmount, setInvestAmount] = useState(product.minInvestment);

  const isInPortfolio = portfolio.items.some(item => item.id === product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToPortfolio(product, parseFloat(investAmount));
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 2000);
  };

  return (
    <div className="product-card card-flair flex flex-col h-full relative group cursor-default transition-transform duration-200 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="product-image-wrapper relative overflow-hidden text-center border-b block cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img h-full w-full object-contain p-4"
          referrerPolicy="no-referrer"
        />
        <div className="product-badge-pos absolute top-2 right-2 z-10">
          <RiskBadge riskLevel={product.riskLevel} />
        </div>
        
        <div className="hover-reveal-overlay absolute inset-0 bg-vestor-green/90 backdrop-blur-sm flex items-center justify-center p-6 text-center">
           <div className="text-white space-y-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em]">Quick Metrics</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[9px] font-bold opacity-70 uppercase">Liquidity</div>
                  <div className="text-xs font-black capitalize">{product.liquidity}</div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] font-bold opacity-70 uppercase">Horizon</div>
                  <div className="text-xs font-black capitalize">{product.timeHorizon}</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white text-vestor-green py-2 px-4 rounded text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
                <Info className="w-3 h-3" /> Explore Details
              </div>
           </div>
        </div>
      </Link>

      <div className="product-body p-4 flex-grow flex flex-col">
        <div className="product-info mb-2">
          <Link to={`/product/${product.id}`} className="product-title font-bold text-base mb-1 hover:text-vestor-green transition-colors block leading-tight">
            {product.name}
          </Link>
          <div className="product-return text-vestor-green shadow-none font-bold text-xl uppercase">
            {product.expectedReturn}%
            <span className="product-return-label text-xs ml-1 text-vestor-secondary font-medium tracking-normal">Expected Return</span>
          </div>
        </div>

        <p className="product-desc text-xs text-vestor-secondary mb-4">
          {product.description}
        </p>

        <div className="product-footer mt-auto space-y-3">
          <div className="product-min flex justify-between text-xs font-semibold">
             <span className="text-vestor-secondary font-bold">Min Investment</span>
             <span className="text-vestor-green font-bold">Rs. {product.minInvestment.toLocaleString()}</span>
          </div>
          
          <div className="product-actions flex gap-2">
            <button
               onClick={handleAdd}
               className={`flex-1 btn-flair flex items-center justify-center gap-2 ${
                 isAdding ? 'adding-success' : ''
               }`}
            >
              {isAdding ? (
                <>Added ✓</>
              ) : (
                <><Plus className="w-4 h-4" /> Add Asset</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
