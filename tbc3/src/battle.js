// App.js
import React from 'react';
import {useState} from 'react';
import './App.css';
import Character from './Character';
import Opponents from './Opponents';

export function Battle() {

  // dice roller - v important for my game
  const rollDice = (power) => {
    return Math.floor(Math.random() * power) + 1;
  }
  
  // initialising players
  const player = new Character('Player', 100, 20, 10, 40);
  const [opponent, setOpponent] = useState(new Character('Pleb', 50, 10, 5, 20));

  // states
  const [playerHealth, setPlayerHealth] = useState(player.health);
  const [opponentHealth, setOpponentHealth] = useState(opponent.health);
  const [pTurn, setPTurn] = useState(true);
  const [opAlive, setOpAlive] = useState(true);
  const [pAlive, setPAlive] = useState(true);
  const [update, setUpdate] = useState(false);
  const [updateText, setUpdateText] = useState("");

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
        setUpdate(true);
        setUpdateText("You defeated the opponent!");
      }
      setOpponentHealth(newHealth);
      console.log("Opponent Health: " + newHealth);
      setUpdate(true);
      setUpdateText("You hit the opponent ! APvDP: " + pAttack + "v" + OpBlock +"!");
      setPTurn(false);

      console.log("opponent about to attack")
      if (newHealth > 0) {
        opponentAttack();
      }
    }
    else if (pAttack <= OpBlock && opAlive===true){
      console.log("miss!")
      setUpdate(true);
      setUpdateText("You missed!");
      setPTurn(false);
      setTimeout(() => {
      }, 1000);
      
      console.log("opponent about to attack")
      if (opAlive) {
        opponentAttack();
      }
    }
  }

  const opponentAttack = () => {
    console.log("Opponent Attack Clicked");
    

    if (opAlive===true){
      setTimeout(() => {
        setUpdate(false);
        setUpdateText("Opponent Attacking...");

        const opAttack = rollDice(opponent.attackPower);
        const pBlock = rollDice(player.defense);
    
        if (opAttack > pBlock){
          let newHealth = playerHealth - opponent.damage;
          if (newHealth <= 0){
            newHealth = 0;
            setPAlive(false);
            setUpdate(true);
            setUpdateText("Opponent Wins! APvDP: " + opAttack + "v" + pBlock +"!");
            setPTurn(false);
          }
          setPlayerHealth(newHealth);
          console.log("Player Health: " + newHealth);

          setUpdate(true);
          setUpdateText(opponent.name + " Hits! APvDP: " + opAttack + "v" + pBlock +"!");
          setPTurn(false);
        }

        else{
          setUpdate(true);
          setUpdateText(opponent.name + " Misses!");
          setPTurn(false);
        }

        setPTurn(true);
  
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

  const newOpponent = () => {
    console.log('New Opponent Clicked')

    const newOpponent = Opponents[Math.floor(Math.random() * Opponents.length)];
    setOpponent(newOpponent);
    setOpponentHealth(newOpponent.health);

    setOpAlive(true);
    setPTurn(true);
    setUpdate(true);
        setUpdateText(newOpponent.name + " Arrives!");
  }

  return (
    <div className="App">
      <div className="GameDiv">
        
        <div className="PlayerDiv">
          
          <h2>{player.name}</h2>
          <p>Health: {playerHealth}</p>
          <p>Attack Power: {player.attackPower}</p>
          <p>Defense: {player.defense}</p>
          
          {pTurn && opAlive && pAlive &&(
            <div className="GameButtons">
              <button onClick={HandleAttack}>Attack</button>
              <button onClick={HandleItem}>Item</button>
              <button onClick={HandleEndTurn}>End Turn</button>
            </div> )}

            {!pAlive &&(
            <div className="DEAD">
              <button>DEAD</button>
            </div> )}
            
            {!pTurn && opAlive &&(
            <div className="GameButtons">
              <button>Waiting for opponent...</button>
            </div> )}

            {!opAlive && (
            <div className="GameButtons">
              <button 
              onClick={newOpponent}
              onMouseOver={e => e.currentTarget.innerText = "NEXT OPPONENT"} 
              onMouseOut={e => e.currentTarget.innerText = "OPPONENT DEFEATED!"}
              >OPPONENT DEFEATED!</button>
            </div> )}
        
        </div>

        <div className="Log">
          {!update && (<h2>Welcome warrior...</h2>)}
          {update && (<h2>{updateText}</h2>)}
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