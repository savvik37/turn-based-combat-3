import React from 'react';
import './InventorySlot.css';

const InventorySlot = ({ item }) => {
  return (
    <div className="inventory-slot">
      {item && (
        <div className="item" title={item.name}>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      )}
    </div>
  );
};

export default InventorySlot;