import { useRef, useState, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from "react-icons/fa";

const CustomAudioPlayer = ({ src }: { src: string }) => {
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
  }, [src]);

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
      <audio ref={audioRef} src={src} />

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

        <div>
          <button
            onClick={togglePlay}
            className="text-[var(--primary)] px-4 py-2 rounded cursor-pointer transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
