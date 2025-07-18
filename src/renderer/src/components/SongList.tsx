import { SongType } from '@renderer/types/song';
import React, { useState, useEffect } from 'react';
import LikeButton from './util/LikeButton';
import { MdPlaylistAdd } from 'react-icons/md';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { PlaylistType } from '@renderer/types/playlist';
import { toggleCreatePlaylist } from '@renderer/types/functions';
import CreatePlaylist from './util/CreatePlaylist';

export default function SongList({
  songs,
  currentSong,
  setCurrentSong,
}: {
  setCurrentSong: (song: SongType) => void;
  currentSong?: SongType;
  songs: SongType[];
}) {
  const [songType, setSongType] = useState<string>('all');
  const [likedSongs, setLikedSongs] = useState<SongType[]>([]);
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType>({
    name: '',
    songs: [],
  });
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      const result = await window.likeAPI.getLikedSongs();
      setLikedSongs(result);
    };
    const fetchPlaylists = async () => {
      const result = await window.playlistAPI.getPlaylists();
      setPlaylists(result);
    };
    fetchPlaylists();
    fetchLikedSongs();
  }, []);

  const handleTypeChange = (type: string) => {
    setSongType(type);
  };

  const refreshLikedSongs = async () => {
    const result = await window.likeAPI.getLikedSongs();
    setLikedSongs(result);
  };
  const refreshPlaylists = async () => {
    const result = await window.playlistAPI.getPlaylists();
    setPlaylists(result);
  }
  const toggleCreatePlaylist = () => {
    setIsCreatingPlaylist(prev => !prev);
  };
  const favSongs = likedSongs;

  return (
    <div className=" ">
      <div className={`${isCreatingPlaylist?"absolute":"hidden"} top-50 left-50 "`}>
        <CreatePlaylist refreshPlaylists={refreshPlaylists} />
      </div>
      <div className="flex items-center">
        <div
          className="m-2 p-2 bg-[var(--primary)] rounded-xl cursor-pointer"
          onClick={() => handleTypeChange('all')}
        >
          All
        </div>
        <div
          className="m-2 p-2 bg-[var(--primary)]  rounded-xl  cursor-pointer"
          onClick={() => handleTypeChange('fav')}
        >
          Favourites
        </div>
        <div
          className="m-2 p-2 bg-[var(--primary)]  rounded-xl  cursor-pointer"
          onClick={() => {
            handleTypeChange('playlist');
          }}
        >
          Playlists
        </div>
      </div>
      <div className="">
        {songType === 'playlist' ? (
          playlists.length === 0 ? (
            <div>
              <div>No playlists</div>
            </div>
          ) : (
            <div>
              {playlists.map((playlist, idx) => (
                <div
                  key={playlist.name}
                >{playlist.name}</div>
              ))}
              <div onClick={toggleCreatePlaylist} className='bg-black'>create new</div>
            </div>
          )
        ) : (
          (songType === 'fav' ? favSongs : songs).map((song, idx) => (
            <div
              key={song.path}
              className="group flex justify-between items-center hover:bg-[var(--bg)] hover:cursor-pointer"
            >
              <div
                className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} flex items-center cursor-pointer h-[40px]  w-[40%]   p-5 my-2 `}
                onClick={() => setCurrentSong(song)}
              >
                <div className="w-full truncate">{song.name}</div>
              </div>
              <div className="hidden group-hover:flex w-[100px] justify-evenly items-center  p-2">
                <LikeButton
                  song={song}
                  likedSongs={likedSongs}
                  refreshLikedSongs={refreshLikedSongs}
                />
                <MdPlaylistAdd size={25} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
