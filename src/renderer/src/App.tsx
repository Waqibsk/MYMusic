import { useEffect, useRef, useState } from 'react';
import CustomAudioPlayer from './components/CustomAudioPlayer';
import useTheme from './utils/changeTheme';
import SelectTheme from './components/SelectTheme';
import { themes } from './assets/themes';
import { Theme } from './types/theme';
import NavBar from './components/global/NavBar';
import { SongType } from './types/song';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { FaRegFolderOpen } from 'react-icons/fa6';
import { FaFolder } from 'react-icons/fa';
import { getRandomWithOneExclusion } from './utils/functions';
import SongList from './components/SongList';
const App = () => {
  const [currentTheme, setCurrentTheme] = useState('spiderman');
  const [theme, setTheme] = useState<Theme>(themes[currentTheme]);
  const [coverImage, setCoverImage] = useState('');
  const [openTheme, setOpenTheme] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<SongType>();
  const [songs, setSongs] = useState<SongType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const handleLoadMusic = async () => {
    const result = await window.electronAPI.pickMusicFolder();
    setSongs(result);
  };
  const ToggleSelectTheme = () => {
    setOpenTheme(prev => !prev);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const handlePlayShuffle = () => {
    if (currentSong) {
      const currentSongIndex = songs.indexOf(currentSong);
      const randomIndex = getRandomWithOneExclusion(
        songs.length,
        currentSongIndex
      );
      console.log('random song', randomIndex);
      setCurrentSong(songs[randomIndex]);
    }
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

  useEffect(() => {
    setTheme(themes[currentTheme]);
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
              <div className="flex justify-between">
                {isSidebarOpen ? (
                  <div
                    onClick={handleLoadMusic}
                    className="bg-[var(--bg)]  p-2 rounded"
                  >
                    <div className="flex items-center">
                      <FaRegFolderOpen />
                      <div className="px-2">Add folder</div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}

                <div onClick={toggleSidebar} className="cursor-pointer">
                  {isSidebarOpen ? (
                    <TbLayoutSidebarLeftExpandFilled size={30} />
                  ) : (
                    <TbLayoutSidebarLeftCollapseFilled size={30} />
                  )}
                </div>
              </div>
              <div className="mt-4 bg-[var(--bg)]/70 rounded">
                {isSidebarOpen ? (
                  songs.length !== 0 ? (
                    <SongList
                      songs={songs}
                      setCurrentSong={setCurrentSong}
                      currentSong={currentSong}
                    />
                  ) : (
                    <div className="bg-black/70 w-full  flex justify-center items-center h-[500px]">
                      <div className="flex flex-col justify-center ">
                        <FaFolder size={80} onClick={handleLoadMusic} />
                        <div>
                          Select your
                          <br /> Music folder
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  ''
                )}
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
                playShuffle={handlePlayShuffle}
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
