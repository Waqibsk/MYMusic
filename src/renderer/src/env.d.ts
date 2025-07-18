/// <reference types="vite/client" />
export {};
import { PlaylistType } from './types/playlist';
import { SongType } from './types/song';
declare global {
  interface Window {
    electronAPI: {
      pickMusicFolder: () => Promise<SongType[]>;
    };
    likeAPI: {
      likeSong: (song: SongType) => Promise<SongType[]>;
      getLikedSongs: () => Promise<SongType[]>;
    };
    playlistAPI: {
      addToPlaylist: (
        song: SongType,
        playlistPath: string
      ) => Promise<PlaylistType[]>;
      getPlaylists: () => Promise<PlaylistType[]>;
      removeSong: (
        song: SongType,
        playlistName: string
      ) => Promise<PlaylistType[]>;
      deletePlaylist: (playlistName: string) => Promise<PlaylistType[]>;
      createPlaylist: (playlistName: string) => Promise<PlaylistType[]>;
    };
  }
}
