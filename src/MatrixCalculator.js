import React, { useState } from 'react';

const CalculatorButton = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick} 
    className={`
      bg-blue-600 text-white font-bold 
      rounded-lg shadow-md hover:bg-blue-700 
      transition duration-300 ease-in-out transform 
      hover:scale-105 active:scale-95 
      p-3 text-lg ${className}
    `}
  >
    {children}
  </button>
);

const MatrixCalculator = () => {
  const [matrix1, setMatrix1] = useState([
    [0, 0],
    [0, 0]
  ]);
  const [matrix2, setMatrix2] = useState([
    [0, 0],
    [0, 0]
  ]);
  const [result, setResult] = useState([
    [0, 0],
    [0, 0]
  ]);
  const [operation, setOperation] = useState('add');

  const updateMatrix = (matrixSetter, row, col, value) => {
    const newMatrix = [...matrixSetter];
    newMatrix[row][col] = parseFloat(value) || 0;
    return newMatrix;
  };

  const calculateResult = () => {
    switch(operation) {
      case 'add':
        return matrix1.map((row, i) => 
          row.map((val, j) => val + matrix2[i][j])
        );
      case 'subtract':
        return matrix1.map((row, i) => 
          row.map((val, j) => val - matrix2[i][j])
        );
      case 'multiply':
        return [
          [
            matrix1[0][0]*matrix2[0][0] + matrix1[0][1]*matrix2[1][0],
            matrix1[0][0]*matrix2[0][1] + matrix1[0][1]*matrix2[1][1]
          ],
          [
            matrix1[1][0]*matrix2[0][0] + matrix1[1][1]*matrix2[1][0],
            matrix1[1][0]*matrix2[0][1] + matrix1[1][1]*matrix2[1][1]
          ]
        ];
      default:
        return [[0,0],[0,0]];
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-4 rounded-t-xl mb-4">
        <h1 className="text-2xl font-bold">Kalkulator Matriks Ordo 2x2</h1>
        <h2 className="text-2x1 font-bold">By Ginanjar</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {/* Matrix 1 Input */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Matriks A</h3>
          <div className="grid grid-cols-2 gap-2">
            {matrix1.map((row, rowIndex) => (
              row.map((value, colIndex) => (
                <input
                  key={`m1-${rowIndex}-${colIndex}`}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    const newMatrix = updateMatrix(matrix1, rowIndex, colIndex, e.target.value);
                    setMatrix1(newMatrix);
                  }}
                  className="
                    p-2 border rounded 
                    text-center text-gray-700 
                    focus:ring-2 focus:ring-blue-500 
                    transition duration-300
                  "
                  placeholder={`M1[${rowIndex},${colIndex}]`}
                />
              ))
            ))}
          </div>
        </div>

        {/* Operation Selector */}
        <div className="flex flex-col justify-center items-center">
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value)}
            className="
              p-3 w-full rounded-lg 
              bg-white border border-gray-300 
              text-blue-600 font-semibold
              focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="add">Tambah (+)</option>
            <option value="subtract">Kurang (-)</option>
            <option value="multiply">Kali (×)</option>
          </select>
        </div>

        {/* Matrix 2 Input */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Matriks B</h3>
          <div className="grid grid-cols-2 gap-2">
            {matrix2.map((row, rowIndex) => (
              row.map((value, colIndex) => (
                <input
                  key={`m2-${rowIndex}-${colIndex}`}
                  type="number"
                  value={value}
                  onChange={(e) => {
                    const newMatrix = updateMatrix(matrix2, rowIndex, colIndex, e.target.value);
                    setMatrix2(newMatrix);
                  }}
                  className="
                    p-2 border rounded 
                    text-center text-gray-700 
                    focus:ring-2 focus:ring-blue-500 
                    transition duration-300
                  "
                  placeholder={`M2[${rowIndex},${colIndex}]`}
                />
              ))
            ))}
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-4">
        <CalculatorButton 
          onClick={() => setResult(calculateResult())}
          className="w-full"
        >
          Hitung Matriks
        </CalculatorButton>
      </div>

      {/* Result Display */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-blue-600 text-center">Hasil Operasi</h3>
        <div className="grid grid-cols-2 gap-2">
          {result.map((row, rowIndex) => (
            row.map((value, colIndex) => (
                <div 
                key={`result-${rowIndex}-${colIndex}`}
                className="
                  bg-blue-100 p-3 rounded 
                  text-center font-bold text-blue-800
                  border border-blue-200
                "
              >
                {Number.isInteger(value) ? value : value.toFixed(2)}
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatrixCalculator;
