import api from '@/config/axios';
import { useEffect, useState } from 'react';

export default function User() {
  const [name, setName] = useState('');

  useEffect(() => {
    api.get('/api/user').then((res) => setName(res.data.name));
  }, []);

  return <div>Hello {name}</div>;
}
