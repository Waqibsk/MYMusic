import { SongType } from '@renderer/types/song';
import React, { useState, useEffect } from 'react';
import LikeButton from './util/LikeButton';
import { MdPlaylistAdd } from 'react-icons/md';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { PlaylistType } from '@renderer/types/playlist';
import { toggleCreatePlaylist } from '@renderer/types/functions';
import CreatePlaylist from './util/CreatePlaylist';
import PlaylistPicker from './util/PlaylistPicker';
import { FaTrash } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

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
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistType|null>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState<boolean>(false);
  const [addingToPlaylist, setAddingToPlaylist] = useState<boolean>(false);
  const [songToAddInPlaylist,setSongToAddInPlaylist]=useState<SongType|null>(null)

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
  };
  const toggleCreatePlaylist = () => {
    setIsCreatingPlaylist(prev => !prev);
  };
  const handleRemoveSongFromPlaylist = async (song: SongType, selectedPlaylist: PlaylistType)=>{
    const result = await window.playlistAPI.removeSong(song, selectedPlaylist.name);
    setSelectedPlaylist((prev) => {
  if (!prev) return prev;
  return {
    ...prev,
    songs: prev.songs.filter(s => s.path !== song.path),
  };
});
    setPlaylists(result);
}
  const handleDeletePlaylist = async(playlistName: string)=>{
    const result = await window.playlistAPI.deletePlaylist(playlistName);
    
    setPlaylists(result);
  }
  const favSongs = likedSongs;

  return (
    <div className={`` }>
      <div
        className={`${isCreatingPlaylist ? 'absolute' : 'hidden'} top-40 left-50 "`}
      >
        <CreatePlaylist refreshPlaylists={refreshPlaylists} setIsCreatingPlaylist={setIsCreatingPlaylist } />
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
            <div className='p-4'>
              <div>No playlists</div>
                
              <div onClick={toggleCreatePlaylist} className="bg-black w-[10%] text-center rounded-xl cursor-pointer p-2 my-2">
                Create 
              </div>
            </div>
          ) : selectedPlaylist ?
           <div className='flex flex-col p-4'>
      < div className=' flex'>

<         IoIosArrowRoundBack className='cursor-pointer' size={30} onClick={()=>{setSelectedPlaylist(null)}} />
                  <div>
        Name: {selectedPlaylist.name}
  </div>
      </div>
                <div>
                  {selectedPlaylist.songs.map((song, idx) => (
            <div
              key={song.path}
              className={`group flex justify-between items-center ${ !addingToPlaylist? "hover:bg-[var(--bg)] " :""} "hover:cursor-pointer"`}
            >
              <div
                className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} flex items-center cursor-pointer h-[40px]  w-[40%]   p-5 my-2 `}
                onClick={() => setCurrentSong(song)}
              >
                <div className= "truncate">{song.name}</div>
              </div>
              <div className="hidden group-hover:flex w-[10%] cursor-pointer justify-evenly items-center  p-2">
                <LikeButton
                  song={song}
                  likedSongs={likedSongs}
                  refreshLikedSongs={refreshLikedSongs}
                        />
<IoIosRemoveCircleOutline size={25} onClick={ ()=>{handleRemoveSongFromPlaylist(song,selectedPlaylist)}} />
              </div>
             
                    </div>
                  ))}
           </div>
           </div> 
 : (
            <div className='p-4'>
              {playlists.map((playlist, idx) => (
                <div key={playlist.name} className='flex items-center my-2 justify-between w-[50%]' >
                  <div onClick={() => { setSelectedPlaylist(playlist) }} className='cursor-pointer'>
  {playlist.name}
                  </div>
                  <div onClick={() => { handleDeletePlaylist(playlist.name) }}>
                  <FaTrash/>
                  </div> 
                </div>
              ))}
              <div onClick={toggleCreatePlaylist} className="bg-black w-[15%] text-center p-2 rounded-xl cursor-pointer my-2">
                Create 
              </div>
            </div>
          )
        ) : (
          (songType === 'fav' ? favSongs : songs).map((song, idx) => (
            <div
              key={song.path}
              className={`group flex justify-between items-center ${addingToPlaylist? "" :"hover:bg-[var(--bg)] "} "hover:cursor-pointer"`}
            >
              <div
                className={`${currentSong?.name === song.name ? 'text-[var(--secondary)]' : 'text-red'} ${addingToPlaylist?"pointer-events-none":""} flex items-center cursor-pointer h-[40px]  w-[40%]   p-5 my-2 `}
                onClick={() => setCurrentSong(song)}
              >
                <div className="w-full truncate">{song.name}</div>
              </div>
              <div
  className={`hidden ${addingToPlaylist ? "group-hover:hidden" : "group-hover:flex"} w-[100px] justify-evenly items-center p-2`}
>
  <LikeButton
    song={song}
    likedSongs={likedSongs}
    
    refreshLikedSongs={refreshLikedSongs}
  />
  <MdPlaylistAdd
                  size={25}
                  className='cursor-pointer'
    onClick={() => {
      setAddingToPlaylist(true);
      setSongToAddInPlaylist(song);
    }}
  />
</div>

              <div
                className={`${addingToPlaylist ? 'absolute' : 'hidden'} top-50 left-50 "`}
              >
                {songToAddInPlaylist && 
                 <PlaylistPicker
                  playlists={playlists}
                  setAddingToPlaylist={setAddingToPlaylist}
                  song={songToAddInPlaylist}
                  refreshPlaylists={refreshPlaylists}
                />

                }
                             </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
