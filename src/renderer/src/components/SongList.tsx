import { SongType } from '@renderer/types/song';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';

import { MdPlaylistAdd } from 'react-icons/md';
import { MdPlaylistAddCheck } from 'react-icons/md';
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
        <div className="group flex justify-between items-center hover:bg-[var(--bg)] hover:cursor-pointer">
          <div
            key={idx}
            className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} flex items-center cursor-pointer h-[40px] truncate w-[40%] p-5 my-2 `}
            onClick={() => {
              setCurrentSong(song);
            }}
          >
            {song.name}
          </div>
          <div className="hidden group-hover:flex  items-center bg-black p-2">
            <FaHeart size={19} />
            <MdPlaylistAdd size={25} />
          </div>
        </div>
      ))}
    </div>
  );
}
