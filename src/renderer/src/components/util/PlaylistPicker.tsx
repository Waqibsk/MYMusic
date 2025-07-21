import { refreshPlaylists } from '@renderer/types/functions';
import { PlaylistType } from '@renderer/types/playlist';
import { SongType } from '@renderer/types/song';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { IoMdAdd } from 'react-icons/io';
export default function PlaylistPicker({
  playlists,
  setAddingToPlaylist,
  refreshPlaylists,
  song,
}: {
  playlists: PlaylistType[];
  refreshPlaylists:refreshPlaylists,
  setAddingToPlaylist: React.Dispatch<SetStateAction<boolean>>;
  song: SongType ;
}) {
  
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const handleAddToPlaylist = async () => {
    for (const playlist of selectedPlaylists) {
      await window.playlistAPI.addToPlaylist(song, playlist);

 }
     refreshPlaylists();
    setAddingToPlaylist(false);
    return;
  };
  const isSelected = (playlistName) => {
    return selectedPlaylists.includes(playlistName);
  }
  const toggleSelectPlaylist = ( playlistName:string) => {

    setSelectedPlaylists((prev) => prev.includes(playlistName) ? prev.filter(name => name !== playlistName) : [...prev, playlistName]);
  
}
  return (
    <div className="flex flex-col bg-[var(--bg)] p-4   w-[400px] ">
      <div
        className=" flex justify-between py-2 cursor-pointer"
        onClick={() => {
          setAddingToPlaylist(false);
        }}
      >
        {' '}
        <div>
          Add to Playlist
</div>
        <ImCross />
      </div>
      <div className="">
        {playlists.map((playlist, idx) => (
          <div key={playlist.name} className={`${isSelected(playlist.name)?"bg-[var(--secondary)]":""} flex items-center rounded px-2 cursor-pointer m-2 `}onClick={() => { toggleSelectPlaylist(playlist.name) }}>
            <div>{playlist.name}</div>
         
          </div>
        ))}
      </div>
      <div className='flex justify-center m-2'>
      <button className="text-black bg-white w-[30%] cursor-pointer" onClick={handleAddToPlaylist}>
        Add
      </button>
 
      </div>
   </div>
  );
}
