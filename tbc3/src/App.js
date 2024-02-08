// App.js
import React from 'react';
import {useState} from 'react';
import './App.css';
import Character from './Character';

function App() {

  // dice roller - v important for my game
  const rollDice = (power) => {
    return Math.floor(Math.random() * power) + 1;
  }

  // states
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(50);
  const [pTurn, setPTurn] = useState(true);
  const [opAlive, setOpAlive] = useState(true);
  const [miss, setMiss] = useState(false);

  // initialising players
  const player = new Character('Player', 100, 10, 5, 25);
  const opponent = new Character('Opponent', 100, 10, 5, 10);

  // handing playeer attack
  const HandleAttack = () => {
    console.log('Attack Clicked')

    const pAttack = rollDice(player.attackPower);
    const OpBlock = rollDice(opponent.defense);

    console.log("Damage: " + player.damage);
    console.log("Attack Roll: " + pAttack);
    console.log("Opponent Defense Roll: " + OpBlock);

    if (pAttack > OpBlock && opAlive===true) {
      let newHealth = opponentHealth - player.damage;
      if (newHealth <= 0 ){
        newHealth = 0;
        setOpAlive(false);
      }
      setOpponentHealth(newHealth);
      console.log("Opponent Health: " + newHealth);
      setPTurn(false);

      console.log("opponent about to attack")
      if (newHealth > 0) {
        opponentAttack();
      }
    }
    else if (pAttack <= OpBlock && opAlive===true){
      console.log("miss!")
      setMiss(true);
      setPTurn(false);
      setTimeout(() => {
        setMiss(false); // Reset miss state after displaying "Missed!" for a brief moment
      }, 1000);
      
      console.log("opponent about to attack")
      if (opAlive) {
        opponentAttack();
      }
    }
  }

  const opponentAttack = () => {
    console.log("Opponent Attack Clicked");
    setMiss(false);

    if (opAlive===true){
      setTimeout(() => {

        const opAttack = rollDice(opponent.attackPower);
        const pBlock = rollDice(player.defense);
    
        if (opAttack > pBlock){
          let newHealth = playerHealth - opponent.damage;
          if (newHealth <= 0){
            newHealth = 0;
          }
          setPlayerHealth(newHealth);
          console.log("Player Health: " + newHealth);
          setPTurn(true);
        }
  
      }, 1000);
    }
  }

  // handing item use - WIPWIPWIPWIP
  const HandleItem = () => {
    console.log('Item Clicked')
  }

  // handing player ending turn
  const HandleEndTurn = () => {
    console.log('End Turn Clicked')

    setPTurn(false);

    opponentAttack();
  }

  return (
    <div className="App">
      <div className="GameDiv">
        
        <div className="PlayerDiv">
          
          <h2>{player.name}</h2>
          <p>Health: {playerHealth}</p>
          <p>Attack Power: {player.attackPower}</p>
          <p>Defense: {player.defense}</p>
          
          {pTurn && opAlive &&(
            <div className="GameButtons">
              <button onClick={HandleAttack}>Attack</button>
              <button onClick={HandleItem}>Item</button>
              <button onClick={HandleEndTurn}>End Turn</button>
            </div> )}
            
            {!pTurn && opAlive &&(
            <div className="GameButtons">
              <button>Waiting for opponent...</button>
            </div> )}

            {!opAlive && (
            <div className="GameButtons">
              <button>OPPONENT DEFEATED!</button>
            </div> )}
        
        </div>

        <div className="Log">
          {!miss && (<h2>Log</h2>)}
          {miss && (<h2>Missed!</h2>)}
        </div>

        <div className="OpDiv">
          
          <h2>{opponent.name}</h2>
          <p>Health: {opponentHealth}</p>
          <p>Attack Power: {opponent.attackPower}</p>
          <p>Defense: {opponent.defense}</p>

        </div>

      </div>
    </div>
  );
}

export default App;