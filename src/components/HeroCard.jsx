import React from 'react';

export default function HeroCard({ hero, stateClass, onClick, onContextMenu, isRecommended }) {
  return (
    <div 
      className={`hero-card ${stateClass}`}
      onClick={() => onClick && onClick(hero)}
      onContextMenu={(e) => {
        e.preventDefault();
        if (onContextMenu) onContextMenu(hero);
      }}
    >
      {isRecommended && <div className="score-badge">+{hero.score}</div>}
      
      <img src={hero.avatar} alt={hero.name} />
      <span>{hero.name}</span>
      
      {isRecommended && hero.reasons && (
        <div className="reasons">
          {hero.reasons.map((reason, idx) => (
            <span key={idx} className="reason-tag">{reason}</span>
          ))}
        </div>
      )}
    </div>
  );
}