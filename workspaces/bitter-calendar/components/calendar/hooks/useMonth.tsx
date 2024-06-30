import { useEffect, useState } from 'react';

export default function userMonth() {
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    setMonth(today);
  }, []);

  return month;
}
