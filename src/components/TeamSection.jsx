import React from 'react';
import HeroCard from './HeroCard';

export default function TeamSection({ title, team, maxSlots, onRemoveHero, themeClass }) {
  return (
    <div className={`team-section ${themeClass}`}>
      <h2>{title} ({team.length}/{maxSlots})</h2>
      <div className="slots">
        {team.map((hero) => (
          <HeroCard 
            key={hero.id} 
            hero={hero} 
            stateClass="picked" 
            onClick={onRemoveHero} 
          />
        ))}
        {[...Array(maxSlots - team.length)].map((_, i) => (
          <div key={`empty-${i}`} className="empty-slot"></div>
        ))}
      </div>
    </div>
  );
}