import { useDraftLogic } from './hooks/useDraftLogic';
import TeamSection from './components/TeamSection';
import Recommendations from './components/Recommendations';
import HeroPool from './components/HeroPool';
import './App.css';

function App() {
  const { 
    enemyTeam, 
    myTeam, 
    addToEnemyTeam, 
    addToMyTeam, 
    removeFromEnemyTeam, 
    removeFromMyTeam, 
    isHeroPicked, 
    recommendations 
  } = useDraftLogic();

  return (
    <div className="app-container">
      <h1>MLBB Draft Helper</h1>
      
      <div className="draft-board">
        <div className="teams-container">
          <TeamSection 
            title="Союзники" 
            team={myTeam} 
            maxSlots={5} 
            onRemoveHero={removeFromMyTeam} 
            themeClass="my-team" 
          />
          <TeamSection 
            title="Вороги" 
            team={enemyTeam} 
            maxSlots={5} 
            onRemoveHero={removeFromEnemyTeam} 
            themeClass="enemy-team" 
          />
        </div>

        <Recommendations 
          heroes={recommendations} 
          onSelectHero={addToMyTeam} 
        />

        <HeroPool 
          isHeroPicked={isHeroPicked}
          onAddAlly={addToMyTeam}
          onAddEnemy={addToEnemyTeam}
        />
      </div>
    </div>
  );
}

export default App;