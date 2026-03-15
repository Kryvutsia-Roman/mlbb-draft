import React from 'react';
import HeroCard from './HeroCard';

export default function Recommendations({ heroes, onSelectHero }) {
  if (heroes.length === 0) return null;

  return (
    <div className="recommendations-section">
      <h2>💡 Рекомендовані піки</h2>
      <div className="slots recommendations">
        {heroes.map((hero) => (
          <HeroCard 
            key={hero.id} 
            hero={hero} 
            stateClass="recommended" 
            onClick={onSelectHero}
            isRecommended={true}
          />
        ))}
      </div>
    </div>
  );
}