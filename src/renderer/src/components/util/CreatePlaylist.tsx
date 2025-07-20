import { refreshPlaylists } from '@renderer/types/functions';
import React, { SetStateAction, useState } from 'react';
import { ImCross } from 'react-icons/im';
export default function CreatePlaylist({ refreshPlaylists ,setIsCreatingPlaylist}:{refreshPlaylists:refreshPlaylists,setIsCreatingPlaylist:React.Dispatch<SetStateAction<boolean>>}) {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    await window.playlistAPI.createPlaylist(playlistName);
    await refreshPlaylists();
  };
  return (
    <div className="flex flex-col w-[400px] h-[100px] z-10 bg-black">
      <div className='flex justify-end p-2 cursor-pointer'>
        <ImCross onClick={() => {
          setIsCreatingPlaylist(false)
       }}/> 
      </div>
      <input
        type="text"
        placeholder="Enter your playlist name "
        value={playlistName}
        onChange={e => setPlaylistName(e.target.value)}
      />
      <div onClick={handleCreatePlaylist}>create</div>
    </div>
  );
}
