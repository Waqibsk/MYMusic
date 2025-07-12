import { useRef, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { BiSkipNext } from 'react-icons/bi';
import { BiSkipPrevious } from 'react-icons/bi';
import { SongType } from '@renderer/types/song';
import { HandlePlayNext, HandlePlayPrev } from '@renderer/types/functions';
const CustomAudioPlayer = ({
  currentSong,
  songs,
  playNext,
  playPrev,
}: {
  currentSong: SongType;
  songs: SongType[];
  playNext: HandlePlayNext;
  playPrev: HandlePlayPrev;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong.path]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((current / duration) * 100 || 0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime =
      (parseFloat(e.target.value) / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="bg-transparent text-white p-4 rounded-xl w-full  ">
      <audio ref={audioRef} src={currentSong.path} />

      <div className="flex items-center flex-col">
        <div className="w-full">
          <input
            type="range"
            className="w-full h-[2px]  accent-[var(--secondary)]"
            min={0}
            max={100}
            value={progress}
            onChange={handleProgressChange}
          />
        </div>

        <div className="flex text-[var(--primary)] justify-between items-center w-full">
          <div className="flex items-center">
            <div className="p-2">
              <BiSkipPrevious size={30} onClick={playPrev} />
            </div>
            <div
              onClick={togglePlay}
              className=" py-2 rounded cursor-pointer transition"
            >
              {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
            </div>
            <div className="p-2" onClick={playNext}>
              <BiSkipNext size={30} />
            </div>
          </div>
          <div className="p-2">
            <FaShuffle size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
