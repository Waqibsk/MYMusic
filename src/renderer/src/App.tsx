import { useEffect, useRef, useState } from 'react';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import useTheme from './utils/changeTheme';
import SelectTheme from './components/SelectTheme';
import { themes } from './assets/themes';
import { Theme } from './types/theme';
import NavBar from './components/global/NavBar';
import { SongType } from './types/song';
const App = () => {
  const [currentTheme, setCurrentTheme] = useState('spiderman');
  const [theme, setTheme] = useState<Theme>(themes[currentTheme]);
  const [coverImage, setCoverImage] = useState('');
  const [openTheme, setOpenTheme] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<SongType>();
  const [songs, setSongs] = useState<SongType[]>([]);
  const [songSrc, setSongSrc] = useState<string>('');
  const handleLoadMusic = async () => {
    const result = await window.electronAPI.pickMusicFolder();
    setSongs(result);
  };
  const ToggleSelectTheme = () => {
    setOpenTheme(prev => !prev);
  };
  const handlePlayNext = () => {
    if (currentSong) {
      const currentSongIndex = songs.indexOf(currentSong);
      if (currentSongIndex === songs.length - 1) {
        setCurrentSong(songs[0]);
      } else {
        setCurrentSong(songs[currentSongIndex + 1]);
      }
    }
  };
  const handlePlayPrev = () => {
    if (currentSong) {
      const currentSongIndex = songs.indexOf(currentSong);
      if (currentSongIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[currentSongIndex - 1]);
      }
    }
  };
  const playSong = (path: string) => {
    const normalizedPath = path.replace(/\\/g, '/');
    const fileUrl = encodeURI(`file:///${normalizedPath}`);
    setSongSrc(fileUrl);
  };
  useEffect(() => {
    setTheme(themes[currentTheme]);
    console.log('current theme', themes[currentTheme]);
    const randomIndex = Math.floor(
      Math.random() * themes[currentTheme].coverImages.length
    );
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
              {/* <img className="w-[50%]" src={coverImage} /> */}
            </div>

            <div className="flex flex-col m-2 w-full">
              <button
                onClick={handleLoadMusic}
                className="bg-[var(--primary)]  p-2 rounded"
              >
                Load Music
              </button>

              <div className="mt-4 bg-[var(--bg)]/70">
                {songs.map((song, idx) => (
                  <div
                    key={idx}
                    className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} cursor-pointer h-[40px] truncate  p-2`}
                    onClick={() => {
                      setCurrentSong(song);
                      playSong(song.path);
                    }}
                  >
                    {song.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[var(--bg)]/80">
            {currentSong ? (
              <CustomAudioPlayer
                currentSong={currentSong}
                songs={songs}
                playNext={handlePlayNext}
                playPrev={handlePlayPrev}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
