import React from 'react';
import { themes } from '@renderer/assets/themes';
import { SetTheme } from '@renderer/types/functions';
export default function SelectTheme({ setTheme }: { setTheme: SetTheme }) {
  const changeTheme = (theme: string) => {
    if (theme) {
      setTheme(theme);
    }
  };
  return (
    <div className="bg-black w-[50%] text-white fixed z-50">
      <div>
        {Object.entries(themes).map(([key, theme]) => (
          <div key={key}>
            <h3
              className="cursor-pointer"
              onClick={() => {
                changeTheme(key);
              }}
            >
              {theme.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
