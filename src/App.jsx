import {useState} from 'react';


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) =>{
    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1)) // validamos que el dato ingresado no sea vació y que si ya ha sido ingresado un operador antes -> calc-1 sea distinto, para no asignar 2 operadors
    ){
      return 
    }
    setCalc(calc+value);

    if(!ops.includes(value)){
      setResult(eval(calc+value).toString());
    }

  }

  const createDigits = () => {
    const digits = [];
    for (let i=1; i<10; i++){
      digits.push(
        <button 
          key={i} 
          onClick={() => updateCalc(i.toString())}
        >
          {i}
        </button>
      )
    }
    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () =>{
    if(calc == ''){
      setResult('0')
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
    console.log(calc);
    console.log(result);
    console.log(value);

    // actualizar el resultado al borrar 

      if (ops.includes(value.slice(-1))) { //si incluye una operación
        setResult(eval(value.slice(0,-1)).toString()); 
      }
      else{
        setResult(eval(value).toString());  
      }
    

    console.log(value);

  }


  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">
         {result ?  <span>({result})</span> : ''}
         &nbsp;
         {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
