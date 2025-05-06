import { Button } from '@/lib/ui/button';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Full Stack Portfolio</h1>
      <Button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="mt-4 px-4 py-2 border"
      >
        Toggle theme
      </Button>
    </div>
  );
}

export default App;
