import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Node,
  Edge,
  Connection,
} from 'react-flow-renderer';

const initialNodes: Node[] = []; // Empty canvas initially
const initialEdges: Edge[] = []; // No connections initially

const Canvas: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Handles connecting nodes
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  // Handles drag-and-drop of logic gates
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const gateType = event.dataTransfer.getData('application/reactflow');
    const position = {
      x: event.clientX,
      y: event.clientY,
    };

    const newNode: Node = {
      id: `${gateType}-${nodes.length + 1}`,
      type: 'default',
      position,
      data: { label: gateType },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ width: '100%', height: '100vh', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()} // Allow drop
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
