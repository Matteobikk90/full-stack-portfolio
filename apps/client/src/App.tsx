import { Button } from '@/lib/ui/button';
import useStore from '@/stores';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default function App() {
  const { mode, toggle } = useStore(
    useShallow((state) => ({
      mode: state.mode,
      toggle: state.toggle,
    }))
  );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Full Stack Portfolio</h1>
      <Button onClick={toggle} className="mt-4 px-4 py-2 border">
        Toggle theme
      </Button>
    </div>
  );
}
