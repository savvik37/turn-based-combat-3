import React from 'react';
import InventorySlot from './InventorySlot';
import './Inventory.css';

const Inventory = ({ inventory, setActivateInv, deleteItem }) => {
  return (
    <div className="inventory-container">
      {inventory.map((item, index) => (
        <InventorySlot key={index} item={item} deleteItem={deleteItem}/>
      ))}
      
      <button className="inventory-button" onClick={() => setActivateInv(false)}>Back</button>

    </div>
  );
};

export default Inventory;