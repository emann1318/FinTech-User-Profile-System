import React, { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem('vestor_portfolio');
    return saved ? JSON.parse(saved) : {
      items: [],
      totalInvested: 0,
      weightedReturn: 0,
      riskDistribution: { low: 0, medium: 0, high: 0 }
    };
  });

  const calculatePortfolioStats = (items) => {
    if (!items || items.length === 0) {
      return { totalInvested: 0, weightedReturn: 0, riskDistribution: { low: 0, medium: 0, high: 0 } };
    }

    const total = items.reduce((sum, item) => sum + (parseFloat(item.allocatedAmount) || 0), 0);
    
    if (total === 0) {
      return { totalInvested: 0, weightedReturn: 0, riskDistribution: { low: 0, medium: 0, high: 0 } };
    }

    const weightedReturn = items.reduce((sum, item) => {
      return sum + ((parseFloat(item.allocatedAmount) || 0) / total) * (item.expectedReturn || 0);
    }, 0);

    const riskDist = items.reduce((acc, item) => {
      const percentage = ((parseFloat(item.allocatedAmount) || 0) / total) * 100;
      if (item.riskLevel in acc) {
        acc[item.riskLevel] += percentage;
      }
      return acc;
    }, { low: 0, medium: 0, high: 0 });

    return { totalInvested: total, weightedReturn, riskDistribution: riskDist };
  };

  const addToPortfolio = (product, amount) => {
    setPortfolio(prev => {
      const existing = prev.items.find(i => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = prev.items.map(i => i.id === product.id ? { ...i, allocatedAmount: i.allocatedAmount + amount } : i);
      } else {
        newItems = [...prev.items, { ...product, allocatedAmount: amount }];
      }
      const stats = calculatePortfolioStats(newItems);
      const newState = { ...prev, items: newItems, ...stats };
      localStorage.setItem('vestor_portfolio', JSON.stringify(newState));
      return newState;
    });
  };

  const removeFromPortfolio = (productId) => {
    setPortfolio(prev => {
      const newItems = prev.items.filter(i => i.id !== productId);
      const stats = calculatePortfolioStats(newItems);
      const newState = { ...prev, items: newItems, ...stats };
      localStorage.setItem('vestor_portfolio', JSON.stringify(newState));
      return newState;
    });
  };

  const updateAllocation = (productId, newAmount) => {
    setPortfolio(prev => {
      const newItems = prev.items.map(i => i.id === productId ? { ...i, allocatedAmount: newAmount } : i);
      const stats = calculatePortfolioStats(newItems);
      const newState = { ...prev, items: newItems, ...stats };
      localStorage.setItem('vestor_portfolio', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio, updateAllocation }}>
      {children}
    </PortfolioContext.Provider>
  );
}
