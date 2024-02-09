// App.js
import React from 'react';
import { Battle } from './battle';
import { Template } from './template';
import Inventory from './Inventory';
import Items from './Items';
import {useState, useEffect} from 'react';

function App() {

  const [menu, setMenu] = useState(true);
  const [activateBattle, setActivateBattle] = useState(false);
  const [activateInv, setActivateInv] = useState(false);

  // player stuff
  const [player, setPlayer] = useState(null)
  useEffect(() => {
    const storedPlayer = localStorage.getItem('player');
    if (storedPlayer) {
      const playerObj = JSON.parse(storedPlayer);
      setPlayer(playerObj);
      if (playerObj.items) {
        setInventoryData(playerObj.items);
      }
    }
  }, []);
  
  const playerItems = player ? player.items : [];

  const [inventoryData, setInventoryData] = useState(playerItems);

  const deleteItem = (itemToDelete) => {
    setInventoryData(prevInventory => {
      const newInventory = prevInventory.filter(item => item !== itemToDelete);
      const updatedPlayer = { ...player, items: newInventory };
      localStorage.setItem('player', JSON.stringify(updatedPlayer));
      return newInventory;
    });
  };

  // debug function to add sword to inventory
  const addSword = () => {
    setInventoryData(prevInventory => {
      const newInventory = [...prevInventory, Items[0]];
      const updatedPlayer = { ...player, items: newInventory };
      localStorage.setItem('player', JSON.stringify(updatedPlayer));
      return newInventory;
    });
  }

  // use effect to handle battle activation
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

      <button onClick={addSword}>Add Sword</button>   
      
      {activateInv && <div className="overlay"></div>}
         
      <h1>RPG Battler</h1>
      <h3>Indev 0.1</h3>

      {activateInv && (<Inventory inventory={inventoryData} setActivateInv={setActivateInv} deleteItem={deleteItem}/>)}
        
      {activateBattle && (
          <div className="slide-in"> 
            <Battle setActivateInv={setActivateInv} /> 
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