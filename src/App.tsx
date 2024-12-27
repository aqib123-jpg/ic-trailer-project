// import React, { useState } from 'react';
// import Toolbox from './ToolBox';
// import Canvas from './Canvas';

// const App: React.FC = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Toolbox />
//       <Canvas />
//     </div>
//   );
// };

// export default App;


import React from 'react';
import './App.css';
import Canvas from './Canvas';
import GatePalette from './GatePalette';
import { ReactFlowProvider } from 'react-flow-renderer';

const App: React.FC = () => {
  return (
    <div className="app">
      <GatePalette />
      <ReactFlowProvider>
        <Canvas />
      </ReactFlowProvider>
      
    </div>
  );
};

export default App;
