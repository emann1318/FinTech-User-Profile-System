import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioContext } from '../context/PortfolioContext';
import { Wallet, Trash2, PieChart, TrendingUp, AlertCircle, TrendingDown, Plus, ChevronRight, ArrowRight, Clock, Coins, Calculator } from 'lucide-react';
import RiskBadge from '../components/RiskBadge';

export default function Portfolio() {
  const { portfolio, removeFromPortfolio, updateAllocation } = useContext(PortfolioContext);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [tempAmount, setTempAmount] = useState('');

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setTempAmount(item.allocatedAmount.toString());
  };

  const handleSaveEdit = (id) => {
    updateAllocation(id, parseFloat(tempAmount) || 0);
    setEditingId(null);
  };

  if (portfolio.items.length === 0) {
    return (
      <div className="empty-portfolio max-w-4xl mx-auto py-20 text-center space-y-6">
        <div className="empty-icon-box bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto border">
          <Wallet className="w-10 h-10 text-vestor-green opacity-40" />
        </div>
        <div className="empty-text space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Your Portfolio is Empty</h1>
          <p className="text-gray-400 font-medium max-w-sm mx-auto">
            You haven't allocated any funds to financial assets yet. Start browsing to build your wealth.
          </p>
        </div>
        <Link 
          to="/products"
          className="btn-flair px-10 py-4"
        >
          Explore Assets
        </Link>
      </div>
    );
  }

  const highRiskPercent = portfolio.riskDistribution.high || 0;

  return (
    <div className="portfolio-container max-w-6xl mx-auto space-y-10 pb-20">
      <header className="portfolio-header flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-black text-vestor-text tracking-tight uppercase">Investment Portfolio</h1>
          <p className="text-xs text-vestor-secondary font-medium italic">Asset distribution overview for Pakistan market.</p>
        </div>
        
        <div className="market-ticker !py-1 !px-3 font-bold uppercase tracking-widest text-[10px]">
           Portfolio Health: Stable
        </div>
      </header>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-flair space-y-2 border-t-green">
           <span className="block text-xs font-black text-gray-400 uppercase tracking-widest">Capital Base</span>
           <span className="text-3xl font-black tracking-tight">Rs. {portfolio.totalInvested.toLocaleString()}</span>
           <span className="text-[10px] text-gray-400 font-bold block italic">Synced from {portfolio.items.length} instruments</span>
        </div>

        <div className="card-flair space-y-2 border-t-green">
           <span className="block text-xs font-black text-gray-400 uppercase tracking-widest">Weighted Yield</span>
           <span className="text-3xl font-black text-vestor-green tracking-tight">{portfolio.weightedReturn.toFixed(2)}%</span>
           <span className="text-[10px] text-vestor-green font-bold block italic">Annualised Projection</span>
        </div>

        <div className="card-flair space-y-4 border-t-green">
           <div className="flex items-center justify-between">
             <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Risk Allocation</span>
           </div>
           <div className="risk-bar flex h-2 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="risk-low h-full" style={{ width: `${portfolio.riskDistribution.low}%`, backgroundColor: 'var(--vestor-green)' }} />
             <div className="risk-medium h-full" style={{ width: `${portfolio.riskDistribution.medium}%`, backgroundColor: '#fbbf24' }} />
             <div className="risk-high h-full" style={{ width: `${portfolio.riskDistribution.high}%`, backgroundColor: '#ef4444' }} />
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest gap-2">
             <span className="text-vestor-green">Low {portfolio.riskDistribution.low.toFixed(0)}%</span>
             <span className="text-yellow-600">Med {portfolio.riskDistribution.medium.toFixed(0)}%</span>
             <span className="text-red-700">High {portfolio.riskDistribution.high.toFixed(0)}%</span>
           </div>
        </div>
      </div>

      {highRiskPercent > 70 && (
        <div className="alert-card bg-red-50 border-red-200 p-4 flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
          <div className="text-xs font-bold leading-tight uppercase tracking-tight">
            High Risk Alert: Portfolio concentration in high-risk assets is over 70%. Consider diversifying with 'Low Risk' options.
          </div>
        </div>
      )}

      {/* Asset List */}
      <div className="card-flair asset-list-card p-0 overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
           <h2 className="text-xl font-black tracking-tight flex items-center m-0">
             <ListIcon className="w-5 h-5 mr-2 text-vestor-green opacity-40" />
             Asset Allocation
           </h2>
           <Link to="/products" className="text-xs font-black text-vestor-green hover:underline flex items-center uppercase tracking-widest">
             <Plus className="w-3 h-3 mr-1" /> Add More
           </Link>
        </div>
        
        <div className="table-responsive overflow-x-auto">
          <table className="asset-table w-full text-left">
            <thead className="table-head">
              <tr>
                <th className="px-6 py-4">Asset Name</th>
                <th className="px-6 py-4">Allocation</th>
                <th className="px-6 py-4 hidden md:table-cell">Return</th>
                <th className="px-6 py-4 hidden md:table-cell">Risk</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {portfolio.items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className={`asset-row hover-bg-gray ${expandedId === item.id ? 'bg-gray-50' : ''}`}>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                          <button 
                            onClick={() => toggleExpand(item.id)}
                            className={`mr-3 transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`}
                          >
                            <ChevronRight className="w-4 h-4 text-vestor-green" />
                          </button>
                          <div className="asset-icon-box w-8 h-8 bg-white border mr-3 shrink-0 flex items-center justify-center p-1">
                            <img src={item.image} alt="" className="product-img" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <div className="font-bold text-vestor-text">{item.name}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.category}</div>
                          </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-vestor-text">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            value={tempAmount}
                            onChange={(e) => setTempAmount(e.target.value)}
                            className="allocation-input w-24 p-1 text-sm outline-none"
                            autoFocus
                          />
                          <button onClick={() => handleSaveEdit(item.id)} className="text-vestor-green hover:underline font-bold">OK</button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditClick(item)} className="allocation-val underline decoration-dotted decoration-gray-300">
                          Rs. {item.allocatedAmount.toLocaleString()}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <div className="flex items-center text-vestor-green font-black">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {item.expectedReturn}%
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <RiskBadge riskLevel={item.riskLevel} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="asset-actions flex items-center justify-end gap-3 transition-opacity">
                        <button 
                          onClick={() => removeFromPortfolio(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedId === item.id && (
                    <tr className="bg-[#f9fafb]">
                      <td colSpan="5" className="px-6 py-8 border-b border-gray-100">
                        <div className="expanded-details space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-white border border-gray-100 rounded text-vestor-green">
                                  <Clock className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tenure</div>
                                  <div className="text-sm font-black text-gray-900 capitalize">{item.timeHorizon} Term</div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-white border border-gray-100 rounded text-vestor-green">
                                  <Coins className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Liquidity</div>
                                  <div className="text-sm font-black text-gray-900 capitalize">{item.liquidity}</div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="p-2 bg-white border border-gray-100 rounded text-vestor-green">
                                  <Calculator className="w-4 h-4" />
                                </div>
                                <div className="space-y-1">
                                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Min. Entry</div>
                                  <div className="text-sm font-black text-gray-900">Rs. {item.minInvestment.toLocaleString()}</div>
                                </div>
                              </div>

                              <div className="flex items-end justify-end">
                                <Link to={`/product/${item.id}`} className="btn-flair text-[10px] py-2 px-6 tracking-widest uppercase">
                                  Asset Intelligence
                                </Link>
                              </div>
                           </div>

                           <div className="description-box bg-white p-6 border border-gray-100 rounded-[2px] shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-vestor-green" />
                              <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] mb-3">Professional Analysis</div>
                              <p className="text-xs text-vestor-secondary leading-relaxed font-medium italic">
                                "{item.description}"
                              </p>
                           </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ListIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
