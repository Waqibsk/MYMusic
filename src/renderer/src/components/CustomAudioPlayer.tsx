import { useRef, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { BiSkipNext } from 'react-icons/bi';
import { BiSkipPrevious } from 'react-icons/bi';
import { SongType } from '@renderer/types/song';
import { RxLoop } from 'react-icons/rx';
import { GoUnmute } from 'react-icons/go';
import { GoMute } from 'react-icons/go';
import {
  HandlePlayNext,
  HandlePlayPrev,
  HandlePlayShuffle,
} from '@renderer/types/functions';
const CustomAudioPlayer = ({
  currentSong,
  songs,
  playNext,
  playPrev,
  playShuffle,
}: {
  currentSong: SongType;
  songs: SongType[];
  playNext: HandlePlayNext;
  playPrev: HandlePlayPrev;
  playShuffle: HandlePlayShuffle;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [looping, setLooping] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  const shuffleRef = useRef(shuffle);
  const loopingRef = useRef(looping);
  const toggleLooping = () => {
    setLooping(prev => !prev);
  };
  const toggleShuffle = () => {
    setShuffle(prev => !prev);
  };
  const toggleMute = () => {
    setIsMute(prev => !prev);
  };
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
    shuffleRef.current = shuffle;
    loopingRef.current = looping;
  }, [looping, shuffle]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      if (shuffleRef.current && !loopingRef.current) {
        console.log('NOW SHUFLLING');
        playShuffle();
      }
    };
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  return (
    <div className="bg-transparent text-white p-4 rounded-xl w-full  ">
      <audio
        ref={audioRef}
        src={currentSong.path}
        loop={looping}
        muted={isMute}
      />

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
            <div className="p-2 cursor-pointer">
              <BiSkipPrevious size={30} onClick={playPrev} />
            </div>
            <div
              onClick={togglePlay}
              className=" p-2 cursor-pointer transition"
            >
              {isPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
            </div>
            <div className="p-2 cursor-pointer" onClick={playNext}>
              <BiSkipNext size={30} />
            </div>
            <div className="p-2 cursor-pointer" onClick={toggleMute}>
              {isMute ? <GoMute size={20} /> : <GoUnmute size={20} />}{' '}
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`${shuffle ? ' bg-[var(--text)]/10 rounded-xl ' : ''}p-2 cursor-pointer`}
              onClick={toggleShuffle}
            >
              <FaShuffle size={20} />
            </div>
            <div
              className={`${looping ? 'bg-[var(--text)]/10 rounded-xl ' : 'text-[var(--primary)]'} p-2 cursor-pointer`}
              onClick={toggleLooping}
            >
              <RxLoop size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
