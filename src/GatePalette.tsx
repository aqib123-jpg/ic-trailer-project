import React from 'react';

const GatePalette: React.FC = () => {
  const gates: string[] = ['AND', 'OR', 'NOT', 'XOR'];

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, gateType: string) => {
    event.dataTransfer.setData('application/reactflow', gateType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="gate-palette">
      <h3>Logic Gates</h3>
      {gates.map((gate) => (
        <div
          key={gate}
          className="gate"
          draggable
          onDragStart={(event) => onDragStart(event, gate)}
        >
          {gate}
        </div>
      ))}
    </div>
  );
};

export default GatePalette;
