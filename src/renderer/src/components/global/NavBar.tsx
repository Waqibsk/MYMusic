import React from 'react';
import { ToggleSelectTheme } from '@renderer/types/functions';
export default function NavBar({
  ToggleSelectTheme,
}: {
  ToggleSelectTheme: ToggleSelectTheme;
}) {
  return (
    <div className="text-[var(--text)] flex justify-end">
      <div onClick={ToggleSelectTheme} className="cursor-pointer p-2">
        Themes
      </div>
      <div className="p-2">Playlists</div>
      <div className="p-2">Favourites</div>
    </div>
  );
}
