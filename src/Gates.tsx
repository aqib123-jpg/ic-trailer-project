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
        updateOutput(1 - firstInput); // NOT inverts only the first input
        break;
      case 'NAND':
        updateOutput(1 - (firstInput & secondInput)); // NAND is the negation of AND
        break;
      case 'NOR':
        updateOutput(1 - (firstInput | secondInput)); // NOR is the negation of OR
        break;
      case 'XOR':
        updateOutput(firstInput ^ secondInput); // XOR for single bits
        break;
      case 'XNOR':
        updateOutput(1 - (firstInput ^ secondInput)); // XNOR is the negation of XOR
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

      <select value={selected} onChange={changeSelected}>
        {gates.map((gate, key) => (
          <option key={key} value={gate}>
            {gate}
          </option>
        ))}
      </select>

      <div>Output: {output}</div>
    </div>
  );
};

export default Gates;
