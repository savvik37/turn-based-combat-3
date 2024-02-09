import React from 'react';
import { useState } from 'react';
import './InventorySlot.css';

const Tooltip = ({ tooltip }) => {
  console.log('Rendering Tooltip', tooltip);
  if (!tooltip.show) return null;

  return (
    <div style={{ position: 'fixed', top: tooltip.y, left: tooltip.x, zIndex: 1000, background: 'black', border: '1px solid black', borderRadius: '5px', padding: '5px' }}>
      {tooltip.content}
    </div>
  );
};


const InventorySlot = ({ item }) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: 'x' });

  const handleMouseEnter = () => {
    console.log('Mouse entered', item.name);
    setTooltip({ show: true, x: tooltip.x, y: tooltip.y, content: item.name });
  };

  const handleMouseLeave = () => {
    console.log('Mouse left');
    setTooltip({ ...tooltip, show: false });
  };

  const handleMouseMove = (e) => {
    console.log('Mouse moved');
    setTooltip({ show: true, x: e.clientX - 200, y: e.clientY - 400, content: item.name });
  };

  return (
    <div className="inventory-slot" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
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