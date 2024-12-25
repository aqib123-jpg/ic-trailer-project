import React, { useEffect, useState } from 'react';

const Gates: React.FC = () => {
  const [selected, updateSelected] = useState<string>('');
  const [output, updateOutput] = useState<number>(0);
  const [firstInput, updateFirst] = useState<number>(0);
  const [secondInput, updateSecond] = useState<number>(0);

  const gates: Array<string> = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

  const changeSelected = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    updateSelected(e.target.value);
  };

  useEffect(() => {
    console.log('Gate selected:', selected);
  }, [selected]);

  useEffect(() => {
    switch (selected) {
      case 'AND':
        updateOutput(firstInput & secondInput);
        break;
      case 'OR':
        updateOutput(firstInput | secondInput);
        break;
      case 'NOT':
        updateOutput(1 - firstInput); 
        break;
      case 'NAND':
        updateOutput(1 - (firstInput & secondInput)); 
        break;
      case 'NOR':
        updateOutput(1 - (firstInput | secondInput)); 
        break;
      case 'XOR':
        updateOutput(firstInput ^ secondInput); 
        break;
      case 'XNOR':
        updateOutput(1 - (firstInput ^ secondInput));
        break;
      default:
        updateOutput(0);
    }
  }, [selected, firstInput, secondInput]);

  return (
    <div>
      <div className="flex gap-2">
        <button
          className={`text-white px-4 py-2 rounded my-2 ${
            !firstInput ? 'hover:bg-gray-800' : 'hover:bg-blue-800'
          } ${!firstInput ? 'bg-gray-500' : 'bg-blue-500'}`}
          onClick={() => updateFirst(1 - firstInput)}
        >
          Input 1
        </button>
        <button
          className={`text-white px-4 py-2 rounded my-2 ${
            !secondInput ? 'hover:bg-gray-800' : 'hover:bg-blue-800'
          } ${!secondInput ? 'bg-gray-500' : 'bg-blue-500'}`}
          onClick={() => updateSecond(1 - secondInput)}
        >
          Input 2
        </button>
      </div>
      {
        gates.map((gate,key) => 
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-1">{gate}</button>
        )
      }
      <div>Output: {output}</div>
    </div>
  );
};

export default Gates;
