import { useEffect, useRef, useState } from 'react';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import useTheme from './utils/changeTheme';
import SelectTheme from './components/SelectTheme';
import { themes } from './assets/themes';
import { Theme } from './types/theme';
import NavBar from './components/global/NavBar';
const App = () => {
  const [currentTheme, setCurrentTheme] = useState('spiderman');
  const [theme, setTheme] = useState<Theme>(themes[currentTheme]);
  const[coverImage,setCoverImage]=useState("")
  const [openTheme, setOpenTheme] = useState<boolean>(false);

  const [songs, setSongs] = useState<{ name: string; path: string }[]>([]);
  const [songSrc, setSongSrc] = useState<string>('');
  const handleLoadMusic = async () => {
    const result = await window.electronAPI.pickMusicFolder();
    setSongs(result);
  };
  const ToggleSelectTheme = () => {
    setOpenTheme(prev => !prev);
  };
  const playSong = (path: string) => {
    const normalizedPath = path.replace(/\\/g, '/');
    const fileUrl = encodeURI(`file:///${normalizedPath}`);
    setSongSrc(fileUrl);
  };
  useEffect(() => {
    setTheme(themes[currentTheme]);
    console.log('current theme', themes[currentTheme]);
    const randomIndex = Math.floor(Math.random() * themes[currentTheme].coverImages.length)
    setCoverImage(themes[currentTheme].coverImages[randomIndex]);
    useTheme(currentTheme);
  }, [currentTheme]);
  return (
    <>
      <div
        className="min-h-screen bg-cover  text-[var(--text)] bg-center relative"
        style={{ backgroundImage: theme.bgImage }}
      >
        <div>
          <NavBar ToggleSelectTheme={ToggleSelectTheme} />
        </div>
        <div className="absolute left-70  top-50">
          {openTheme ? <SelectTheme setTheme={setCurrentTheme} /> : <div></div>}
        </div>
        <div className="  h-[658px] flex flex-col justify-between ">
          <div className=" flex h-full justify-between w-full">
            <div className="w-full   flex justify-center items-center">
              <img className='w-[60%] h-[50%]' src={coverImage} />

              </div>


            <div className='flex flex-col m-2 w-full'>
              <button
                onClick={handleLoadMusic}
                className="bg-[var(--primary)] text-white p-2 rounded"
              >
                Load Music
              </button>

              <ul className=" mt-4">
                {songs.map((song, idx) => (
                  <li
                    key={idx}
                    className="cursor-pointer hover:text-blue-400 p-5"
                    onClick={() => {
                      console.log('Clicked on:', song.name);
                      playSong(song.path);
                    }}
                  >
                    {song.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[var(--bg)]">
            {songSrc ? <CustomAudioPlayer src={songSrc} /> : <div></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
