// import React from 'react';

// const GatePalette: React.FC = () => {
//   const gates: string[] = ['AND', 'OR', 'NOT', 'XOR'];

//   const onDragStart = (event: React.DragEvent<HTMLDivElement>, gateType: string) => {
//     event.dataTransfer.setData('application/reactflow', gateType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <div className="gate-palette">
//       <h3>Logic Gates</h3>
//       {gates.map((gate) => (
//         <div
//           key={gate}
//           className="gate"
//           draggable
//           onDragStart={(event) => onDragStart(event, gate)}
//         >
//           {gate}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GatePalette;




import React from 'react';

const GatePalette: React.FC = () => {
  const gates: string[] = ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'XNOR'];

  const draggingStart = (e: React.DragEvent<HTMLDivElement>, gate: string): void => {
    e.dataTransfer.setData('application/reactflow', gate);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="border border-black p-2 w-48">
      <h1 className="text-xl font-semibold text-center">Logic Gates</h1>
      {gates.map((gate, index) => (
        <div
          key={index}
          className="cursor-pointer px-4 py-2 bg-slate-500 my-2 text-center rounded-md"
          draggable
          onDragStart={(e) => draggingStart(e, gate)}
        >
          {gate}
        </div>
      ))}
    </div>
  );
};

export default GatePalette;
