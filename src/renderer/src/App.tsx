import { useRef, useState } from "react";

const App = () => {
  const [songs, setSongs] = useState<{ name: string; path: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleLoadMusic = async () => {
    const result = await window.electronAPI.pickMusicFolder();
    setSongs(result); 
  };

  const playSong = (path: string) => {
    if (audioRef.current) {
      audioRef.current.src = `file://${path}`;
      audioRef.current.play();
    }
  };

  return (
    <>
      <h1 className="text-white bg-black p-2">🎵 Music Player</h1>

      <button onClick={handleLoadMusic} className="bg-blue-600 text-white p-2 rounded">
        Load Music
      </button>

      <ul className="text-white mt-4">
        {songs.map((song, idx) => (
          <li
            key={idx}
            className="cursor-pointer hover:text-blue-400"
            onClick={() => playSong(song.path)}
          >
            {song.name}
          </li>
        ))}
      </ul>

      <audio ref={audioRef} controls className="mt-4 w-full" />
    </>
  );
};

export default App;
