import { useEffect, useState } from 'react';

export default function useMonth() {
  const [month, setMonth] = useState();

  useEffect(() => {}, []);

  return [month, setMonth];
}
