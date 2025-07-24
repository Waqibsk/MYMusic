import React, { SetStateAction, useState } from 'react';
import { themes } from '@renderer/assets/themes';
import { SetTheme } from '@renderer/types/functions';
export default function SelectTheme({ setTheme ,themeType,setThemeType}: { setTheme: SetTheme,themeType:string,setThemeType:React.Dispatch<SetStateAction<string>> }) {
  const [filter, setFilter] = useState("all");
  const changeTheme = (theme: string) => {
    if (theme) {
      setTheme(theme);
    }
  };

  return (
    <div className="bg-[var(--bg)]/90 w-[50%] fixed rounded text-[var(--text)] z-50">
      <div className="flex flex-col">
        <div className="flex ">
          <div className="  bg-[var(--primary)]/90 py-2 px-4 m-2 rounded-xl cursor-pointer " onClick={() => {
            setFilter("all")
          }}>
            All
          </div>
          <div className="   bg-[var(--primary)]/90 py-2 px-4 m-2 rounded-xl  cursor-pointer " onClick={() => {
            setFilter("anime")
          }}>
            Anime
          </div>
          <div className=" bg-[var(--primary)]/90 py-2 px-4 m-2 rounded-xl cursor-pointer   " onClick={() => {
            setFilter("superheroes")
          }}>
            Superheroes
          </div>
        </div>
        <div className="m-2">
          {filter !== 'all'
            ? Object.entries(themes[filter]).map(([key, theme]) => (
                <div key={key}>
                  <h3
                    className="cursor-pointer"
                    onClick={() => {
                      changeTheme(key);
                      setThemeType(filter)
                    }}
                  >
                    {theme.name}
                  </h3>
                </div>
              ))
            : Object.entries(themes).flatMap(([category, categoryThemes]) =>
                Object.entries(categoryThemes).map(([themeKey, theme]) => (
                  <div key={themeKey}>
                    <h3
                      className="cursor-pointer"
                      onClick={() => {
                        changeTheme(themeKey);
                        setThemeType(category)
                      }}
                    >
                      {theme.name}
                    </h3>
                  </div>
                ))
              )}
        </div>
      </div>
    </div>
  );
}
