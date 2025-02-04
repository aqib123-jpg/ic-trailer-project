import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

type GateType = "AND" | "OR" | "NOT";

interface LogicGate {
  id: number;
  type: GateType;
  input1?: boolean;
  input2?: boolean;
  output?: boolean;
}

const gatesData: LogicGate[] = [
  { id: 1, type: "AND" },
  { id: 2, type: "OR" },
  { id: 3, type: "NOT" },
];

const LogicGateComponent = React.forwardRef<HTMLDivElement, { gate: LogicGate }>(
  ({ gate }, ref) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "gate",
      item: { id: gate.id, type: gate.type },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={(node) => {
          drag(node);
          if (node && ref) {
            (ref as React.RefObject<HTMLDivElement>).current = node;
          }
        }}
        className={`p-2 border rounded shadow-sm bg-blue-500 text-white ${
          isDragging ? "opacity-50" : "opacity-100"
        } cursor-grab`}
      >
        {gate.type}
      </div>
    );
  }
);



const DropZone: React.FC<{
  onDrop: (item: { id: number; type: GateType }) => void;
}> = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "gate",
    drop: (item: { id: number; type: GateType }) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={(node) => {
        drop(node);
        if (node && dropRef.current) {
          dropRef.current = node;
        }
      }}
      className={`w-full h-64 border-2 border-dashed rounded flex justify-center items-center ${
        isOver ? "bg-blue-100" : "bg-gray-100"
      }`}
    >
      Drop Logic Gates Here
    </div>
  );
};


const App: React.FC = () => {
  const [droppedGates, setDroppedGates] = useState<LogicGate[]>([]);
  const [ledState, setLedState] = useState(false);

  const handleDrop = (item: { id: number; type: GateType }) => {
    setDroppedGates((prev) => [
      ...prev,
      { id: Date.now(), type: item.type, input1: false, input2: false, output: false },
    ]);
  };

  const handleBlink = () => {
    if (droppedGates.some((gate) => gate.type === "AND")) {
      setLedState((prev) => !prev);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* Logic Gates*/}
        <div className="flex flex-col gap-2 p-4 border rounded shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-2">Logic Gates</h2>
          {gatesData.map((gate) => (
            <LogicGateComponent key={gate.id} gate={gate} />
          ))}
        </div>
        {/* comment here twenty first feburary */}
        <div className="flex-1">
          <DropZone onDrop={handleDrop} />
        </div>

        
        <div className="flex flex-col gap-4 items-center p-4 border rounded shadow-lg bg-white">
          <h2 className="text-xl font-bold">Canvas</h2>
          <div className="grid grid-cols-1 gap-2">
            {droppedGates.map((gate) => (
              <div
                key={gate.id}
                className="p-2 border rounded shadow bg-green-500 text-white"
              >
                {gate.type}
              </div>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={handleBlink}
          >
            Blink LED
          </button>
          <div
            className={`w-8 h-8 rounded-full border-2 ${
              ledState ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
