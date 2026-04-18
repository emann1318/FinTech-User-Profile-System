import React, { createContext, useState, useEffect } from 'react';

export const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('vestor_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('vestor_profile', JSON.stringify(newProfile));
  };

  const isProfileComplete = () => {
    if (!profile) return false;
    return profile.riskTolerance && profile.investmentHorizon && profile.monthlyCapacity;
  };

  const getRecommendations = (products) => {
    if (!profile) return [];
    
    // Step 1: Filter by risk tolerance (Table 3)
    const riskMapping = {
      'conservative': ['low'],
      'moderate': ['low', 'medium'],
      'aggressive': ['low', 'medium', 'high']
    };
    const allowedRisk = riskMapping[profile.riskTolerance] || ['low'];

    // Step 2: Filter by investment horizon
    const horizonMapping = {
      'short': ['short'],
      'medium': ['short', 'medium'],
      'long': ['short', 'medium', 'long']
    };
    const allowedHorizon = horizonMapping[profile.investmentHorizon] || ['short'];

    // Step 3: Filter by liquidity preference
    const liquidityMapping = {
      'easy': ['easy'],
      'moderate': ['easy', 'moderate'],
      'locked': ['easy', 'moderate', 'locked']
    };
    const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ['easy'];

    // Filters
    const recommended = products.filter(p => {
      const isAffordable = p.minInvestment <= (parseFloat(profile.monthlyCapacity) || 0);
      const riskMatch = allowedRisk.includes(p.riskLevel);
      const horizonMatch = allowedHorizon.includes(p.timeHorizon);
      const liquidityMatch = allowedLiquidity.includes(p.liquidity);
      
      return isAffordable && riskMatch && horizonMatch && liquidityMatch;
    });

    // Step 4: Refine by Investment Goal
    let refined = [...recommended];
    
    if (profile.investmentGoal) {
      if (profile.investmentGoal === 'emergency') {
        // Emergency fund priorities liquidity and low risk
        refined = refined.filter(p => p.liquidity === 'easy' && p.riskLevel === 'low');
      } else if (profile.investmentGoal === 'retirement') {
        // Retirement favors long term, moderate or low risk
        refined = refined.filter(p => (p.riskLevel === 'low' || p.riskLevel === 'medium') && p.timeHorizon !== 'short');
      } else if (profile.investmentGoal === 'wealth') {
        // Wealth favors high return
        refined = refined.filter(p => p.expectedReturn > 12);
      } else if (profile.investmentGoal === 'education') {
        // Education favors medium to long term stability
        refined = refined.filter(p => p.timeHorizon !== 'short');
      }
    }

    // If goal filtering leaves nothing, fall back to general recommendations
    const finalSelection = refined.length > 0 ? refined : recommended;

    // Step 5: Sort by relevance
    if (profile.riskTolerance === 'conservative' || profile.investmentGoal === 'emergency') {
      return finalSelection.sort((a, b) => a.expectedReturn - b.expectedReturn);
    } else {
      return finalSelection.sort((a, b) => b.expectedReturn - a.expectedReturn);
    }
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, getRecommendations, isProfileComplete }}>
      {children}
    </UserProfileContext.Provider>
  );
}
