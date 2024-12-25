import React from 'react';
import LogicGate from './LogicGate';

const Toolbox: React.FC = () => {
  return (
    <div style={{ padding: '10px', borderRight: '1px solid gray' }}>
      <h3>Logic Gates</h3>
      <LogicGate type="AND" />
      <LogicGate type="OR" />
      <LogicGate type="NOT" />
    </div>
  );
};

export default Toolbox;
