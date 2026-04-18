import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Info, HelpCircle, TrendingUp, Calculator, Shield, ArrowRight, Table } from 'lucide-react';
import { fetchFinancialProducts } from '../services/dataService';
import { PortfolioContext } from '../context/PortfolioContext';
import RiskBadge from '../components/RiskBadge';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToPortfolio } = useContext(PortfolioContext);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [investAmount, setInvestAmount] = useState('');
  const [years, setYears] = useState(5);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      const all = await fetchFinancialProducts();
      const p = all.find(item => item.id.toString() === id);
      if (p) {
        setProduct(p);
        setInvestAmount(p.minInvestment.toString());
        // Find similar products for comparison
        const related = all
          .filter(item => item.id.toString() !== id && item.category === p.category)
          .slice(0, 2);
        setSimilar(related);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="py-20 text-center animate-pulse font-bold">Loading product details...</div>;
  if (!product) return <div className="py-20 text-center font-bold">Product not found.</div>;

  const handleAdd = () => {
    const amt = parseFloat(investAmount);
    if (amt < product.minInvestment) return alert(`Minimum investment is Rs. ${product.minInvestment}`);
    addToPortfolio(product, amt);
    setAdding(true);
    setTimeout(() => setAdding(false), 2000);
  };

  const calculateReturn = () => {
    const p = parseFloat(investAmount) || 0;
    const r = product.expectedReturn / 100;
    const t = parseInt(years);
    // Simple compound interest for projection
    const futureValue = p * Math.pow(1 + r, t);
    return Math.round(futureValue);
  };

  const getInsights = () => {
    const insights = [];
    if (product.riskLevel === 'low') insights.push("Suitable for conservative investors prioritizing capital preservation.");
    if (product.riskLevel === 'high') insights.push("Best for aggressive investors comfortable with significant volatility.");
    if (product.liquidity === 'locked') insights.push("Requires commitment; early withdrawal may incur penalties.");
    if (product.timeHorizon === 'long') insights.push("Optimal when held for 5+ years to maximize returns.");
    return insights.join(" ");
  };

  return (
    <div className="detail-container pb-20 max-w-6xl mx-auto space-y-8 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-400 hover:text-vestor-green transition-colors font-black text-[10px] uppercase tracking-[0.2em]"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Return to Market
        </button>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
          Vestor Terminal <span className="text-gray-200">/</span> {product.category} <span className="text-gray-200">/</span> {product.id}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left: Product Overview */}
        <div className="overview-pane space-y-10">
          <section className="product-hero card-flair !p-0 overflow-hidden border-t-4 border-t-vestor-green">
             <div className="flex flex-col md:flex-row">
               <div className="p-8 md:p-10 flex-grow space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-gray-900 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-sm">{product.category}</span>
                    <RiskBadge riskLevel={product.riskLevel} />
                    <span className="flex items-center text-vestor-green text-[10px] font-black uppercase tracking-widest">
                       <Shield className="w-3 h-3 mr-1" /> Verified Asset
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-black text-vestor-text leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  
                  <p className="text-base text-vestor-secondary font-medium leading-relaxed max-w-2xl italic border-l-2 border-vestor-green/20 pl-6 py-2">
                    {product.description}
                  </p>
               </div>
               
               <div className="md:w-64 bg-gray-50 flex items-center justify-center p-10 border-l border-gray-100 h-auto">
                 <div className="w-full aspect-square bg-white border flex items-center justify-center p-4">
                   <img src={product.image} alt="" className="product-img max-h-full object-contain" referrerPolicy="no-referrer" />
                 </div>
               </div>
             </div>
          </section>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-vestor-border divide-x divide-y md:divide-y-0 rounded-[4px] bg-white overflow-hidden">
            <div className="p-6">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1 text-vestor-green" /> Yield
              </div>
              <div className="text-2xl font-black text-vestor-green font-mono">{product.expectedReturn}%</div>
              <div className="text-[10px] font-bold text-vestor-secondary italic">Est. Annual</div>
            </div>
            
            <div className="p-6">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                <HelpCircle className="w-3 h-3 mr-1" /> Access
              </div>
              <div className="text-xl font-black text-vestor-text capitalize">{product.liquidity}</div>
              <div className="text-[10px] font-bold text-vestor-secondary italic">Liquidity Profile</div>
            </div>

            <div className="p-6">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                <Info className="w-3 h-3 mr-1" /> Duration
              </div>
              <div className="text-xl font-black text-vestor-text capitalize">{product.timeHorizon}</div>
              <div className="text-[10px] font-bold text-vestor-secondary italic">Ideal Horizon</div>
            </div>

            <div className="p-6 border-b sm:border-b-0">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 flex items-center">
                <Shield className="w-3 h-3 mr-1" /> Entry
              </div>
              <div className="text-xl font-black text-vestor-text font-mono truncate">Rs.{product.minInvestment.toLocaleString()}</div>
              <div className="text-[10px] font-bold text-vestor-secondary italic">Min. Capital</div>
            </div>
          </div>

          <div className="card-flair bg-[#f8faf8] border-vestor-green/10 p-8">
             <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="p-3 bg-vestor-green/10 rounded-full text-vestor-green shrink-0">
                 <ArrowRight className="w-6 h-6" />
               </div>
               <div>
                  <h3 className="text-xs font-black mb-2 uppercase tracking-[0.3em] text-vestor-green">Strategic Analysis</h3>
                  <p className="text-vestor-secondary text-sm font-medium leading-relaxed italic">
                    "{getInsights()}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Source: National Market Intelligence Registry
                  </div>
               </div>
             </div>
          </div>

          {/* Comparison Section */}
          <section className="comparison-section space-y-6 pt-10">
             <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
               <Table className="w-5 h-5 text-vestor-green" />
               <h2 className="text-xl font-black uppercase m-0 border-none p-0 inline-block">Market Comparison</h2>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50/50">
                     <th className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">Asset</th>
                     <th className="p-4 text-[10px] font-black uppercase text-vestor-green tracking-widest bg-vestor-green/5">Current</th>
                     {similar.map(s => (
                       <th key={s.id} className="p-4 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                         <Link to={`/product/${s.id}`} className="hover:text-vestor-green transition-colors">{s.name}</Link>
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="text-sm font-bold divide-y divide-gray-100">
                   <tr>
                     <td className="p-4 text-gray-400 text-[10px] uppercase tracking-widest">Preview</td>
                     <td className="p-4 bg-vestor-green/5">
                       <img src={product.image} className="w-10 h-10 object-contain mx-auto" referrerPolicy="no-referrer" />
                     </td>
                     {similar.map(s => (
                       <td key={s.id} className="p-4">
                         <Link to={`/product/${s.id}`} className="block hover:scale-105 transition-transform">
                           <img src={s.image} className="w-10 h-10 object-contain mx-auto" referrerPolicy="no-referrer" />
                         </Link>
                       </td>
                     ))}
                   </tr>
                   <tr>
                     <td className="p-4 text-gray-400 text-[10px] uppercase tracking-widest">Yield</td>
                     <td className="p-4 text-vestor-green bg-vestor-green/5">{product.expectedReturn}%</td>
                     {similar.map(s => <td key={s.id} className="p-4 text-vestor-text">{s.expectedReturn}%</td>)}
                   </tr>
                   <tr>
                     <td className="p-4 text-gray-400 text-[10px] uppercase tracking-widest">Risk</td>
                     <td className="p-4 text-vestor-green bg-vestor-green/5 capitalize">{product.riskLevel}</td>
                     {similar.map(s => <td key={s.id} className="p-4 text-vestor-text capitalize">{s.riskLevel}</td>)}
                   </tr>
                   <tr>
                     <td className="p-4 text-gray-400 text-[10px] uppercase tracking-widest">Investment</td>
                     <td className="p-4 text-vestor-green bg-vestor-green/5">Rs.{product.minInvestment.toLocaleString()}</td>
                     {similar.map(s => <td key={s.id} className="p-4 text-vestor-text">Rs.{s.minInvestment.toLocaleString()}</td>)}
                   </tr>
                   <tr>
                     <td className="p-4 text-gray-400 text-[10px] uppercase tracking-widest">Action</td>
                     <td className="p-4 bg-vestor-green/5 text-[9px] font-black uppercase text-gray-300 italic">Viewing Now</td>
                     {similar.map(s => (
                       <td key={s.id} className="p-4">
                         <Link to={`/product/${s.id}`} className="inline-flex items-center gap-1 text-[10px] text-vestor-green uppercase font-black hover:underline">
                           Explore <ArrowRight className="w-3 h-3" />
                         </Link>
                       </td>
                     ))}
                   </tr>
                 </tbody>
               </table>
             </div>
          </section>
        </div>

        {/* Right: Investment Sidebar */}
        <div className="sidebar-pane">
          <div className="sticky top-24 card-flair space-y-8 p-8 border-l-4 border-l-gray-900 shadow-xl">
             <div className="sidebar-header border-b pb-4">
                <h3 className="text-sm font-black flex items-center m-0 uppercase tracking-[0.2em] text-gray-900">
                  Allocation Tool
                </h3>
             </div>

             <div className="space-y-6">
                <div className="tool-input-group">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Planned Investment (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-300 text-lg">Rs.</span>
                    <input 
                      type="number"
                      value={investAmount}
                      onChange={(e) => setInvestAmount(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-2xl font-black bg-gray-50 border-gray-200 focus:bg-white focus:border-vestor-green outline-none transition-all rounded-[2px]"
                    />
                  </div>
                </div>

                <div className="tool-range-group">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Horizon</label>
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black text-vestor-text">{years} YEARS</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="20"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                  <div className="flex justify-between text-[9px] font-bold text-gray-300 mt-2 uppercase">
                    <span>1 Year</span>
                    <span>20 Years</span>
                  </div>
                </div>

                <div className="result-card bg-gray-50 p-6 rounded-[2px] border border-gray-100 text-center space-y-1">
                   <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Est. Final Capital</div>
                   <div className="text-3xl font-black text-gray-900 font-mono tracking-tighter italic">Rs.{calculateReturn().toLocaleString()}</div>
                   <div className="pt-2">
                     <span className="inline-flex items-center gap-1 text-[10px] font-black text-vestor-green uppercase">
                       <TrendingUp className="w-3 h-3" /> +Rs.{(calculateReturn() - (parseFloat(investAmount) || 0)).toLocaleString()} GAIN
                     </span>
                   </div>
                </div>

                <button 
                  onClick={handleAdd}
                  disabled={adding}
                  className={`w-full py-5 text-sm font-black tracking-[0.2em] transition-all relative overflow-hidden group ${
                    adding 
                    ? 'bg-vestor-green text-white cursor-default' 
                    : 'bg-gray-900 text-white hover:bg-vestor-text hover:-translate-y-0.5 active:translate-y-0 shadow-lg'
                  }`}
                >
                  <span className="relative z-10 uppercase">
                    {adding ? 'Synchronized' : 'Execute Allocation'}
                  </span>
                  {adding && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
                </button>

                <p className="text-[9px] text-gray-400 font-medium text-center italic leading-relaxed px-4">
                  Financial projections are estimates based on current market yield data. Capital at risk.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, icon: Icon }) {
  return (
    <div className="card-flair metric-card flex items-start gap-4 p-4">
      <div className="metric-icon-box p-2 rounded text-vestor-green shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="metric-label text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="metric-value text-lg font-black capitalize leading-tight">{value}</div>
        <div className="metric-sub text-xs font-bold text-vestor-secondary italic">{sub}</div>
      </div>
    </div>
  );
}
