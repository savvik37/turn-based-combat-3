// App.js
import React from 'react';
import { Battle } from './battle';
import {useState, useEffect} from 'react';

function App() {

  const [menu, setMenu] = useState(true);
  const [activateBattle, setActivateBattle] = useState(false);


  useEffect(() => {
    if (activateBattle) {
      setMenu(false);
    }
    else {
      setMenu(true);
    }
  }, [activateBattle]);


  return (
    <div className="App">
      
      <h1>Supreme Nova</h1>
      
      {activateBattle && (
          <div>
            <Battle /> 
          </div>
      )}

      <div className='ButtonContainer'>
        {activateBattle && (
            <button className='MenuButtons' onClick={() => setActivateBattle(false)}>Back to Menu</button>
        )}
        
        {menu && (
            <button className='MenuButtons' onClick={() => setActivateBattle(true)}>Start Battle</button>
        )}
      </div>

    </div>
  );
}

export default App;