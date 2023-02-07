import { useEffect, useState } from 'react';
import './App.css';

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new',
  );
  const n = await res.text();
  return +n;
};

function App() {
  const [number, setNumber] = useState<number>();

  useEffect(() => {
    getRandomNumber().then((n) => setNumber(n));
  }, []);

  return (
    <div className='App'>
      <h2>
        Numero: <b>{number}</b>
      </h2>
    </div>
  );
}

export default App;
