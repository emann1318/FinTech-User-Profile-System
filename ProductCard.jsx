import React from 'react';
import { Filter, X } from 'lucide-react';

export default function FilterPanel({ filters, onFilterChange, productCount }) {
  const categories = ['savings', 'investment', 'insurance', 'crypto'];
  const riskLevels = ['low', 'medium', 'high'];
  const liquidities = ['easy', 'moderate', 'locked'];
  const horizons = ['short', 'medium', 'long'];

  const handleToggle = (type, value) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange(type, updated);
  };

  const clearFilters = () => {
    onFilterChange('all', {
      risk: [],
      category: [],
      liquidity: 'all',
      horizon: 'all',
      minReturn: 0,
      maxInvestment: 1000000
    });
  };

  return (
    <div className="bg-white border border-vestor-border rounded-[4px] p-5 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <h2 className="text-base font-bold flex items-center border-none p-0 m-0">
           Filters
        </h2>
        <button 
          onClick={clearFilters}
          className="text-[11px] text-vestor-green font-bold hover:underline uppercase"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Asset Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleToggle('category', cat)}
                className={`category-pill ${filters.category.includes(cat) ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Level */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Risk Tolerance</h3>
          <div className="space-y-1.5">
            {riskLevels.map(risk => (
              <label key={risk} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.risk.includes(risk)}
                  onChange={() => handleToggle('risk', risk)}
                  className="w-4 h-4 text-vestor-green border-gray-300 rounded focus:ring-vestor-green"
                />
                <span className="ml-2.5 text-xs font-semibold text-gray-700 group-hover:text-vestor-green transition-colors capitalize">
                  {risk} Risk
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Return Range */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex justify-between">Min Return <span>{filters.minReturn}%</span></h3>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={filters.minReturn}
            onChange={(e) => onFilterChange('minReturn', parseInt(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vestor-green"
          />
        </div>

        {/* Liquidity Preference */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Liquidity</h3>
          <select 
            value={filters.liquidity}
            onChange={(e) => onFilterChange('liquidity', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-[4px] p-2 text-xs font-bold text-gray-700 focus:border-vestor-green focus:ring-0 outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="all">All Liquidities</option>
            {liquidities.map(liq => (
              <option key={liq} value={liq} className="capitalize">{liq.charAt(0).toUpperCase() + liq.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Time Horizon */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Time Horizon</h3>
          <select 
            value={filters.horizon}
            onChange={(e) => onFilterChange('horizon', e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-[4px] p-2 text-xs font-bold text-gray-700 focus:border-vestor-green focus:ring-0 outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="all">Any Horizon</option>
            {horizons.map(h => (
              <option key={h} value={h} className="capitalize">{h.charAt(0).toUpperCase() + h.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Max Investment */}
        <div>
           <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Investment Budget</h3>
           <div className="relative">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rs.</span>
             <input
               type="number"
               value={filters.maxInvestment}
               onChange={(e) => onFilterChange('maxInvestment', parseInt(e.target.value) || 0)}
               className="w-full bg-white border border-gray-200 rounded-[4px] py-2 pl-9 pr-3 text-xs font-bold text-gray-700 focus:border-vestor-green focus:ring-0 outline-none"
             />
           </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="text-center">
           <span className="block text-vestor-green text-2xl font-black">{productCount}</span>
           <span className="text-[9px] text-gray-400 uppercase font-black tracking-[0.2em]">Results Found</span>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
