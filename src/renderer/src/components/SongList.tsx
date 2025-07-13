import { SongType } from '@renderer/types/song';
import React from 'react';

export default function SongList({
  songs,
  currentSong,
  setCurrentSong,
}: {
  setCurrentSong: (song: SongType) => void;
  currentSong?: SongType;
  songs: SongType[];
}) {
  return (
    <div>
      {songs.map((song, idx) => (
        <div
          key={idx}
          className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} cursor-pointer h-[40px] truncate  p-2`}
          onClick={() => {
            setCurrentSong(song);
          }}
        >
          {song.name}
        </div>
      ))}
    </div>
  );
}
