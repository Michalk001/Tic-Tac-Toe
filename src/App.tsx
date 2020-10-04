import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import './App.css';
import  {Game} from './components/game/Game'
import {GameProvider} from "./context/GameContext";
function App() {
  return (
      <BrowserRouter>
          <GameProvider>
              <Switch>
                <Route exact path="/" component={Game} />
              </Switch>
          </GameProvider>
      </BrowserRouter>
  );
}

export default App;
