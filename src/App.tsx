import React from 'react';
import Toolbox from './ToolBox';
import Canvas from './Canvas';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Toolbox />
      <Canvas />
    </div>
  );
};

export default App;
