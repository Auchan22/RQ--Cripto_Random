import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useReducer, useState } from 'react';
import './App.css';

const getRandomNumber = async (): Promise<number> => {
  const res = await fetch(
    'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new',
  );
  if (!res.ok) {
    throw new Error('Hubo un error');
  }
  const n = await res.text();
  return +n;
};

function App() {
  const { isLoading, isFetching, isError, error, data, refetch } = useQuery(
    ['randomNumber'],
    () => getRandomNumber(),
  );

  return (
    <div className='App'>
      {isFetching ? (
        <h2>Cargando...</h2>
      ) : (
        <h2>
          Numero: <b>{data}</b>
        </h2>
      )}
      {!isLoading && isError && <h2>{`${error} `}</h2>}
      <button onClick={() => refetch()} disabled={isFetching}>
        Nuevo numero
      </button>
    </div>
  );
}

export default App;
