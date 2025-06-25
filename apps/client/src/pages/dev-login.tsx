import { useState } from 'react';

export default function DevLoginPage() {
  const [email, setEmail] = useState('matteo.soresini@hotmail.it');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:4000/auth/dev-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Dev login failed');

      location.href = '/'; // Refresh to trigger useAuth
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <main className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Dev Login</h1>
      <input
        className="border w-full p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </main>
  );
}
