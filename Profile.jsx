import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Globe, BarChart3, X, CheckCircle2 } from 'lucide-react';
import { fetchFinancialProducts } from '../services/dataService';
import { UserProfileContext } from '../context/UserProfileContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { profile, updateProfile } = useContext(UserProfileContext);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTool, setActiveTool] = useState(null);
  const [toolInput, setToolInput] = useState('');
  
  // Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0 = start, 1-N = questions, 99 = result
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    async function load() {
      const all = await fetchFinancialProducts();
      // Logic: Pick 4 distinct category products with highest returns
      const categories = ['savings', 'investment', 'insurance', 'crypto'];
      const picked = categories.map(cat => 
        all.filter(p => p.category === cat).sort((a,b) => b.expectedReturn - a.expectedReturn)[0]
      ).filter(Boolean);
      setFeatured(picked);
      setLoading(false);
    }
    load();
  }, []);

  const stats = [
    { label: 'Asset Classes', value: '4+', icon: Globe },
    { label: 'Active Investors', value: '25k+', icon: Zap },
    { label: 'Total Invested', value: 'Rs. 2.4B', icon: BarChart3 },
    { label: 'Safety Rating', value: 'AA+', icon: ShieldCheck },
  ];

  const tools = {
    zakat: {
      title: 'Zakat Calculator',
      description: 'Zakat is 2.5% of your total wealth. Enter your nisab-eligible assets.',
      calc: (val) => `Your estimated Zakat is Rs. ${(val * 0.025).toLocaleString()}`
    },
    tax: {
      title: 'Tax Estimator (FBR)',
      description: 'Estimate your annual income tax based on latest FBR slabs (Slaried).',
      calc: (val) => `Estimated Tax: Rs. ${(val > 600000 ? (val - 600000) * 0.05 : 0).toLocaleString()}`
    },
    risk: {
      title: 'Risk Profile Quiz',
      description: 'Answer 5 questions to determine your risk appetite.',
      quiz: true
    }
  };

  const quizQuestions = [
    {
      q: "What is your primary investment goal?",
      options: [
        { t: "Preserve Capital / Emergency Fund", s: 1 },
        { t: "Steady Growth for a Big Purchase", s: 3 },
        { t: "Wealth Building over Decades", s: 5 }
      ]
    },
    {
      q: "If your portfolio dropped 20% in value tomorrow, what would you do?",
      options: [
        { t: "Sell immediately to prevent further loss", s: 1 },
        { t: "Wait for it to recover before making a choice", s: 3 },
        { t: "Buy more at a 'discounted' price", s: 5 }
      ]
    },
    {
      q: "How would you describe your knowledge of financial markets?",
      options: [
        { t: "Novice (Limited experience)", s: 1 },
        { t: "Knowledgeable (Regularly follow news)", s: 3 },
        { t: "Expert (In-depth analysis/Professional)", s: 5 }
      ]
    }
  ];

  const getRiskResult = (score) => {
    if (score <= 5) return 'conservative';
    if (score <= 10) return 'moderate';
    return 'aggressive';
  };

  const handleQuizOption = (score) => {
    const nextStep = quizStep + 1;
    setQuizScore(prev => prev + score);
    
    // Logic for capturing investmentGoal from the first question
    if (quizStep === 1) {
      const goals = ["emergency", "wealth", "wealth"]; // Based on current s values
      const chosenGoal = goals[Math.min(score > 3 ? 1 : 0, goals.length - 1)];
      localStorage.setItem('temp_quiz_goal', chosenGoal);
    }

    if (nextStep > quizQuestions.length) {
      setQuizStep(99);
    } else {
      setQuizStep(nextStep);
    }
  };

  const saveQuizResult = () => {
    const result = getRiskResult(quizScore);
    const chosenGoal = localStorage.getItem('temp_quiz_goal') || 'wealth';
    updateProfile({
      ...profile,
      riskTolerance: result,
      investmentGoal: chosenGoal
    });
    localStorage.removeItem('temp_quiz_goal');
    setQuizStep(100); // Saved state
  };

  const closeTool = () => {
    setActiveTool(null);
    setToolInput('');
    setQuizStep(0);
    setQuizScore(0);
  };

  return (
    <div className="home-container space-y-12 pb-20">
      {/* Quick Tool Modal */}
      {activeTool && (
        <div className="modal-overlay flex items-center justify-center p-4">
          <div className="modal-content card-flair max-w-md w-full relative">
             <button 
               onClick={closeTool}
               className="modal-close text-gray-400"
             >
               <X className="w-5 h-5" />
             </button>
             <h2 className="modal-title text-xl font-bold uppercase mb-2">{tools[activeTool].title}</h2>
             <p className="modal-desc text-xs text-vestor-secondary italic border-b mb-6 pb-4">
                {tools[activeTool].description}
             </p>
             
             <div className="tool-content space-y-4">
                {tools[activeTool].quiz ? (
                   <div className="quiz-wrapper space-y-4">
                    {quizStep === 0 && (
                      <div className="quiz-start text-center py-6">
                        <p className="text-sm italic mb-6">This assessment takes 1 minute and helps us tailor your experience.</p>
                        <button onClick={() => setQuizStep(1)} className="btn-flair w-full py-4">Begin Assessment</button>
                      </div>
                    )}
                    
                    {quizStep > 0 && quizStep <= quizQuestions.length && (
                      <div className="quiz-question space-y-6">
                        <div className="quiz-progress flex justify-between items-center text-xs font-bold text-gray-400 uppercase mb-2">
                           <span>Question {quizStep} of {quizQuestions.length}</span>
                           <span>{Math.round((quizStep/quizQuestions.length)*100)}%</span>
                        </div>
                        <h3 className="quiz-q-text text-lg text-vestor-text leading-tight min-h-12 font-medium">
                          {quizQuestions[quizStep-1].q}
                        </h3>
                        <div className="quiz-options space-y-2">
                          {quizQuestions[quizStep-1].options.map((opt, i) => (
                            <button 
                              key={i}
                              onClick={() => handleQuizOption(opt.s)}
                              className="quiz-option w-full text-left p-4 border rounded text-xs font-medium"
                            >
                              {opt.t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {quizStep === 99 && (
                      <div className="quiz-result text-center py-6 space-y-6">
                        <div className="result-emoji text-4xl">📊</div>
                        <div className="result-header">
                          <p className="result-label text-xs font-bold text-gray-400 uppercase mb-1">Outcome</p>
                          <h3 className="result-val text-3xl font-black text-vestor-green uppercase italic">{getRiskResult(quizScore)} Profile</h3>
                        </div>
                        <p className="result-desc text-xs text-vestor-secondary italic">
                          Based on your responses, you prioritize {getRiskResult(quizScore) === 'conservative' ? 'safety' : getRiskResult(quizScore) === 'moderate' ? 'balanced growth' : 'aggressive market appreciation'}.
                        </p>
                        <button onClick={saveQuizResult} className="btn-flair w-full py-4 uppercase">Update Financial Profile</button>
                      </div>
                    )}

                    {quizStep === 100 && (
                      <div className="quiz-success text-center py-10 space-y-4">
                         <div className="quiz-success-icon flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                         </div>
                         <h3 className="text-xl font-bold uppercase">Profile Updated</h3>
                         <p className="text-xs text-vestor-secondary italic">Your investment intelligence has been synchronized with your profile.</p>
                         <button onClick={closeTool} className="btn-flair-outline w-full py-3">Finish</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="tool-input-wrapper space-y-4">
                    <label className="input-label text-xs font-bold uppercase text-gray-400">Enter Value (PKR)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 500000"
                      value={toolInput}
                      className="tool-input w-full p-3 text-lg font-bold focus:border-vestor-green"
                      onChange={(e) => setToolInput(e.target.value)}
                    />
                    <div className="tool-result p-4 font-bold text-center border">
                      {toolInput ? tools[activeTool].calc(parseFloat(toolInput) || 0) : 'Calculated result will appear here'}
                    </div>
                    <button 
                      onClick={closeTool}
                      className="btn-flair w-full py-4 mt-4"
                    >
                      Close Tool
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* Market Ticker */}
      <div className="market-ticker">
        <div className="flex items-center gap-4">
          <span className="ticker-label font-bold border-r pr-4">MARKET DATA</span>
          <div className="ticker-items flex gap-8">
            <div className="flex gap-2">KSE-100: <span className="text-vestor-green">64,250.21 +1.2%</span></div>
            <div className="flex gap-2 text-danger">PKR/USD: <span className="text-red-700">279.50 -0.1%</span></div>
            <div className="flex gap-2">GOLD: <span className="text-vestor-green">Rs. 215,400 +0.5%</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar - Quick Profile Info */}
        <aside className="home-sidebar space-y-6">
          <div className="card-flair text-center border-t-green">
             <div className="profile-avatar mx-auto mb-4 text-3xl">👤</div>
             <div className="font-bold text-lg">Investor Profile</div>
             <div className="text-xs text-vestor-secondary mb-4 italic">Islamabad, Pakistan</div>
             <div className="profile-stats border-t pt-4 mb-4">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Portfolio Value</div>
                <div className="text-2xl font-black">Rs. 845,200</div>
             </div>
             <Link to="/profile" className="btn-flair w-full">Manage Profile</Link>
          </div>

          <div className="card-flair">
            <h2 className="section-title">Quick Tools</h2>
            <div className="tool-buttons space-y-2">
               <button 
                 onClick={() => setActiveTool('zakat')}
                 className="btn-flair-outline w-full text-left"
               >
                 Zakat Calculator
               </button>
               <button 
                 onClick={() => setActiveTool('tax')}
                 className="btn-flair-outline w-full text-left"
               >
                 Tax Estimator (FBR)
               </button>
               <button 
                 onClick={() => setActiveTool('risk')}
                 className="btn-flair-outline w-full text-left"
               >
                 Risk Profile Quiz
               </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content-area space-y-12">
          {/* Hero Section */}
          <section className="hero-section bg-white border border-vestor-border rounded-[4px] p-10 relative overflow-hidden">
            <div className="hero-content relative z-10 max-w-xl">
              <h1 className="hero-title text-4xl md:text-5xl font-black text-vestor-text leading-[1.1] mb-6 tracking-tight">
                Secure Your <span className="text-vestor-green italic">Financial</span> Heritage.
              </h1>
              <p className="hero-desc text-base text-vestor-secondary mb-8 leading-relaxed">
                Vestor brings high-performance data to the everyday investor. Discover tailored products from National Savings to high-growth tech indices.
              </p>
              <div className="hero-actions flex gap-4">
                <Link to="/profile" className="btn-flair px-8">Start Planning</Link>
                <Link to="/products" className="btn-flair-outline px-8 border-gray-200 text-gray-600 hover:bg-gray-50">View Analytics</Link>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="featured-section">
            <div className="section-header flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold uppercase tracking-tight m-0">Primary Assets</h2>
              <Link to="/products" className="marketplace-link text-vestor-green font-bold text-xs hover:underline flex items-center uppercase tracking-widest">
                Marketplace
                <ArrowRight className="ml-1 w-3 h-3" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="skeleton-line bg-gray-50 h-32 rounded-[4px] border border-gray-200" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featured.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          {/* Bottom Banner */}
          <footer className="home-footer text-center py-10 border-t border-gray-100">
             <div className="footer-tag text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Vestor v1.0 — Pakistan Market Data Focus</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
