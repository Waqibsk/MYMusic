import { refreshPlaylists } from '@renderer/types/functions';
import React, { SetStateAction, useState } from 'react';
import { ImCross } from 'react-icons/im';
export default function CreatePlaylist({
  refreshPlaylists,
  setIsCreatingPlaylist,
}: {
  refreshPlaylists: refreshPlaylists;
  setIsCreatingPlaylist: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    await window.playlistAPI.createPlaylist(playlistName);
    await refreshPlaylists();
    setIsCreatingPlaylist(false);
  };
  return (
    <div className="flex flex-col w-[300px]  z-10 bg-[var(--bg)]">
      
      <div className="flex justify-between p-2 cursor-pointer ">
        <div>Create Your Own Playlist</div>
        <ImCross
          onClick={() => {
            setIsCreatingPlaylist(false);
          }}
        />
      </div>
      <div className="p-2 mx-2 ">
        <input
          className="mb-2"
          type="text"
          placeholder="Enter your playlist name "
          value={playlistName}
          onChange={e => setPlaylistName(e.target.value)}
        />
        <div
          onClick={handleCreatePlaylist}
          className="bg-[var(--primary)] w-[30%] text-center rounded cursor-pointer m-2"
        >
          Create
        </div>
      </div>
    </div>
  );
}
