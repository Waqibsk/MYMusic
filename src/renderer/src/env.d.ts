/// <reference types="vite/client" />
export {};
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
  }
}
