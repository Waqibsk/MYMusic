import { toggleCreatePlaylist } from '@renderer/types/functions';
import React, { useState } from 'react';

export default function CreatePlaylist({refreshPlaylists}) {
  const [playlistName, setPlaylistName] = useState('');

  const handleCreatePlaylist = async () => {
    await window.playlistAPI.createPlaylist(playlistName);
    await refreshPlaylists();
  };
  return (
    <div className="flex flex-col">
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
