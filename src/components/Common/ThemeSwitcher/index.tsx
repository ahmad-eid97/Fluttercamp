'use client';
import { useMemo } from 'react';
//== Modules
import Cookies from 'universal-cookie';

function ThemeSwitcher() {
  const cookies = useMemo(() => new Cookies(), []);

  function switchMode(mode: string) {
    cookies.set('your-mode', mode, { path: '/' });
    document.body.setAttribute('data-theme', mode);
  }

  return (
    <div>
      <button onClick={() => switchMode('light')}>Light Mode</button>
      <button onClick={() => switchMode('dark')}>Dark Mode</button>
    </div>
  )
}

export default ThemeSwitcher
