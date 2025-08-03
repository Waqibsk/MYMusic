import React from 'react';
import { ToggleSelectTheme } from '@renderer/types/functions';
export default function NavBar({
  ToggleSelectTheme,
}: {
  ToggleSelectTheme: ToggleSelectTheme;
}) {
  return (
    <div className="text-[var(--text)] flex justify-end">
      <div onClick={ToggleSelectTheme} className="cursor-pointer bg-[var(--bg)]  rounded p-2 m-2">
        Themes
      </div>
    </div>
  );
}
