import { useState } from 'react';
import { heroesData } from '../heroes';

export function useDraftLogic() {
  const [enemyTeam, setEnemyTeam] = useState([]);
  const [myTeam, setMyTeam] = useState([]);

  const isHeroPicked = (hero) => {
    return enemyTeam.some(e => e.id === hero.id) || myTeam.some(m => m.id === hero.id);
  };

  const addToEnemyTeam = (hero) => {
    if (enemyTeam.length < 5 && !isHeroPicked(hero)) {
      setEnemyTeam([...enemyTeam, hero]);
    }
  };

  const addToMyTeam = (hero) => {
    if (myTeam.length < 5 && !isHeroPicked(hero)) {
      const sameRoleCount = myTeam.filter(h => h.role === hero.role).length;
      if (sameRoleCount >= 1) {
        const roleNames = {
          "Marksman": "Стрілець (Керрі)",
          "Mage": "Маг (Мідер)",
          "Assassin": "Вбивця (Лісник)",
          "Tank": "Танк (Роумер)",
          "Fighter": "Боєць (Експа)",
          "Support": "Підтримка (Роумер)"
        };
        const roleUa = roleNames[hero.role] || hero.role;
        const isConfirmed = window.confirm(`Увага! У вашій команді вже є ${roleUa}.\nВи впевнені, що хочете пікнути ще одного героя цього ж класу?`);
        
        if (!isConfirmed) return;
      }
      setMyTeam([...myTeam, hero]);
    }
  };

  const removeFromEnemyTeam = (hero) => setEnemyTeam(enemyTeam.filter(h => h.id !== hero.id));
  const removeFromMyTeam = (hero) => setMyTeam(myTeam.filter(h => h.id !== hero.id));

  const getRecommendations = () => {
    if (enemyTeam.length === 0 && myTeam.length === 0) return [];

    let scoredHeroes = heroesData.map(hero => {
      let score = 0;
      let reasons = [];

      enemyTeam.forEach(enemy => {
        if (hero.strongAgainst.includes(enemy.id)) {
          score += 2;
          reasons.push(`Контрить ${enemy.name}`);
        }
        if (hero.weakAgainst.includes(enemy.id)) {
          score -= 2;
          reasons.push(`Боїться ${enemy.name}`);
        }
      });

      myTeam.forEach(ally => {
        if (hero.synergizesWith.includes(ally.id) || ally.synergizesWith.includes(hero.id)) {
          score += 1;
          reasons.push(`Синергія з ${ally.name}`);
        }
      });

      return { ...hero, score, reasons };
    });

    scoredHeroes = scoredHeroes.filter(hero => !isHeroPicked(hero) && hero.score > 0);
    scoredHeroes.sort((a, b) => b.score - a.score);
    
    return scoredHeroes.slice(0, 5);
  };


  return {
    enemyTeam,
    myTeam,
    addToEnemyTeam,
    addToMyTeam,
    removeFromEnemyTeam,
    removeFromMyTeam,
    isHeroPicked,
    recommendations: getRecommendations()
  };
}