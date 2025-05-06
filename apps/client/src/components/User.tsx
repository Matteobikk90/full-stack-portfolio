import { useLoaderData } from '@tanstack/react-router';

export default function User() {
  const { name } = useLoaderData({ from: '/user' });

  return <div>Hello {name}</div>;
}
