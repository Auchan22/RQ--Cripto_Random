import { useQuery } from '@tanstack/react-query';

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

export const useRandom = () => {
  const query = useQuery(['randomNumber'], getRandomNumber);

  return query;
};
