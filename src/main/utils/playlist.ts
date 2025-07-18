import fs from 'fs';
import { SongType } from '../types/all';
import { PlaylistItem } from '../types/all';
import { PlatformPath } from 'path';
export async function getPlaylists(playlistsPath: string) {
  try {
    if (!fs.existsSync(playlistsPath)) {
      return [];
    }
    return await JSON.parse(fs.readFileSync(playlistsPath, 'utf-8'));
  } catch (err) {
    return [];
  }
}

export function savePlaylists(
  playlists: PlaylistItem[],
  playlistsPath: string
) {
  fs.writeFileSync(playlistsPath, JSON.stringify(playlists, null, 2));
}
