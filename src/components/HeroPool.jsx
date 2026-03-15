import React from 'react';
import HeroCard from './HeroCard';
import { heroesData } from '../heroes';

export default function HeroPool({ isHeroPicked, onAddAlly, onAddEnemy }) {
  return (
    <div className="hero-pool">
      <h2>Всі герої (Клік ЛІВОЮ кнопкою - Союзник, ПРАВОЮ - Ворог)</h2>
      <div className="heroes-grid">
        {heroesData.map((hero) => {
          const picked = isHeroPicked(hero);
          return (
            <HeroCard 
              key={hero.id} 
              hero={hero} 
              stateClass={picked ? 'disabled' : ''} 
              onClick={() => !picked && onAddAlly(hero)}
              onContextMenu={() => !picked && onAddEnemy(hero)}
            />
          );
        })}
      </div>
    </div>
  );
}