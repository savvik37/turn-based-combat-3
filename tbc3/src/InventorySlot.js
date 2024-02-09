import React from 'react';
import { useState } from 'react';
import './InventorySlot.css';

const Tooltip = ({ tooltip }) => {
  console.log('Rendering Tooltip', tooltip);
  if (!tooltip.show) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      transform: `translate(${(tooltip.x) + 10}px, ${tooltip.y}px)`, 
      zIndex: 1000, 
      background: 'black', 
      border: '1px solid black', 
      borderRadius: '5px', 
      padding: '5px' 
    }}>
      {tooltip.content}
    </div>
  );
};


const InventorySlot = ({ item, deleteItem }) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: 'x' });

  const handleClick = () => {
    deleteItem(item);
  }

  const handleMouseEnter = () => {
    setTooltip({ show: true, x: tooltip.x, y: tooltip.y, content: item.name });
    console.log('Mouse entered on ' + item.name);

  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
    setTooltip({ ...tooltip, show: false });
  };

  const handleMouseMove = (e) => {
    console.log('Mouse moved');

    const rect = e.target.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    setTooltip({ show: true, x, y, content: item.name });
  };

  return (
    <div className="inventory-slot" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={handleClick}>
      {item && (
        <div className="item" title={item.name}>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      )}
      <Tooltip tooltip={tooltip} />
    </div>
  );
};

export default InventorySlot;