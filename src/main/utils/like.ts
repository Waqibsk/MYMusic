import fs from 'fs';
import { SongType } from '../types/all';

export async function getLikedSongs(likedSongsPath: string) {
  try {
    if (!fs.existsSync(likedSongsPath)) {
      return [];
    }
    return await JSON.parse(fs.readFileSync(likedSongsPath, 'utf-8'));
  } catch (err) {
    return [];
  }
}

export function saveLikedSongs(songs: SongType, likedSongsPath: string) {
  fs.writeFileSync(likedSongsPath, JSON.stringify(songs, null, 2));
}
