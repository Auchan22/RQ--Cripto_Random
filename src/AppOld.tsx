import { useEffect, useMemo, useReducer, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [key, refetch] = useReducer((x) => x + 1, 0);

  useMemo(() => {
    setIsLoading(true);
    getRandomNumber()
      .then((n) => setNumber(n))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [key]);

  return (
    <div className='App'>
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>
          Numero: <b>{number}</b>
        </h2>
      )}
      {!isLoading && error && <h2>{error}</h2>}
      <button onClick={refetch} disabled={isLoading}>
        Nuevo numero
      </button>
    </div>
  );
}

export default App;
