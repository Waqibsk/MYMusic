import { SongType } from '@renderer/types/song';
import React, { useState, useEffect } from 'react';
import LikeButton from './util/LikeButton';
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
  const [songType, setSongType] = useState<string>("all");
  const [likedSongs, setLikedSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      const result = await window.likeAPI.getLikedSongs();
      setLikedSongs(result);
    };
    fetchLikedSongs();
  }, []);

  const handleTypeChange = (type: string) => {
    setSongType(type);
  };

  const refreshLikedSongs = async () => {
    const result = await window.likeAPI.getLikedSongs();
    setLikedSongs(result);
  };

  const favSongs = likedSongs;

  return (
    <div>
      <div className='flex items-center '>
        <div className='m-2 p-2 bg-[var(--primary)] rounded-xl cursor-pointer' onClick={() => handleTypeChange("all")}>
          All
        </div>
        <div className='m-2 p-2 bg-[var(--primary)] rounded-xl cursor-pointer' onClick={() => handleTypeChange("fav")}>
          Favourites
        </div>
      </div>
      <div>
        {(songType === "fav" ? favSongs : songs).map((song, idx) => (
          <div key={song.path} className="group flex justify-between items-center hover:bg-[var(--bg)] hover:cursor-pointer">
            <div
              className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} flex items-center cursor-pointer h-[40px]  w-[40%]   p-5 my-2 `}
              onClick={() => setCurrentSong(song)}
            >
              <div className='w-full truncate'>
              {song.name}
              </div>

            </div>
            <div className="hidden group-hover:flex w-[100px] justify-evenly items-center  p-2">
              <LikeButton song={song} likedSongs={likedSongs} refreshLikedSongs={refreshLikedSongs} />
              <MdPlaylistAdd size={25} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
