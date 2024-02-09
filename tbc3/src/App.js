// App.js
import React from 'react';
import { Battle } from './battle';
import { Template } from './template';
import Inventory from './Inventory';
import {useState, useEffect} from 'react';

function App() {

  const [menu, setMenu] = useState(true);
  const [activateBattle, setActivateBattle] = useState(false);
  const [activateInv, setActivateInv] = useState(false);

  const inventoryData = [
    { name: 'Sword', imageUrl: require('./assets/invicon/sword.png')},
    { name: 'Shield', imageUrl: require('./assets/invicon/shield.png') },
  ];


  useEffect(() => {
    if (activateBattle) {
      setMenu(false);
      setActivateInv(false);
    }
    else {
      setMenu(true);
    }
  }, [activateBattle]);


  return (

    
    <div className="App">
      
      {activateInv && <div className="overlay"></div>}
         
      <h1>RPG Battler</h1>
      <h3>Indev 0.1</h3>

      {activateInv && (<Inventory inventory={inventoryData} setActivateInv={setActivateInv}/>)}
        
      {activateBattle && (
          <div className="slide-in"> 
            <Battle /> 
          </div>
      )}

      <div className='ButtonContainer'>
        {activateBattle && (
             <button className='MenuButtons' onClick={() => {setActivateBattle(false); setActivateInv(false)}}>Run Away...</button>
         )}
        
        {menu && (
             <button className='MenuButtons' onClick={() => setActivateBattle(true)}>Start Battle</button>
          )}

         {menu && (
             <button className='MenuButtons' onClick={() => setActivateInv(prevState => !prevState)}>Inventory</button>
           )}
      </div>
  
    </div>
  );
}

export default App;