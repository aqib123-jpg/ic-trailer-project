import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  useReactFlow,
  ReactFlowProvider,
} from 'react-flow-renderer';

type NodeType = Node;
type EdgeType = Edge;

const initialNodes: NodeType[] = [];
const initialEdges: EdgeType[] = [];

const Canvas: React.FC = () => {
  const [nodes, setNodes] = useState<NodeType[]>(initialNodes);
  const [edges, setEdges] = useState<EdgeType[]>(initialEdges);
  const { project } = useReactFlow();

  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  // Custom Node rendering
  const customNode = ({ data }: any) => (
    <div
      style={{
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px',
        width: '120px',
        textAlign: 'center',
      }}
    >
      <div>{data.label}</div>
      {data.inputs.map((input: any) => (
        <div key={input.id}>
          <strong>{input.label}</strong>
        </div>
      ))}
    </div>
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    // Get the gate type from the dragged element
    const gateType = event.dataTransfer.getData('application/reactflow');
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const position = project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    // Define inputs for different gates
    let inputs = [];
    if (gateType !== 'NOT') {
      inputs = [{ id: 'input1', label: 'Input 1' }, { id: 'input2', label: 'Input 2' }];
    } else {
      inputs = [{ id: 'input1', label: 'Input' }];
    }

    const newNode: NodeType = {
      id: `${gateType}-${nodes.length + 1}`,
      type: 'custom', // Use custom node type
      position,
      data: {
        label: `${gateType} Gate`,
        inputs: inputs, // Add inputs dynamically
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ height: '100vh', display: 'flex', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        nodesDraggable={true}  // Allow nodes to be draggable after drop
        nodeTypes={{ custom: customNode }}  // Register custom node type
      >
        <Background gap={10} color="#FF0000" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
