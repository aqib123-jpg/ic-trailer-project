import React from 'react';

import { useDrag } from 'react-dnd';
interface LogicGateProps {
  type: string; // Gate type: AND, OR, NOT
}

const LogicGate: React.FC<LogicGateProps> = ({ type }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'LOGIC_GATE',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as unknown as React.Ref<HTMLDivElement>}  
      style={{
        padding: '10px',
        border: '1px solid black',
        background: isDragging ? '#f0f0f0' : 'white',
        cursor: 'grab',
      }}
    >
      {type}
    </div>
  );
};

export default LogicGate;
