import fs from 'fs';

export async function getLikedSongs(likedSongsPath) {

  try {

    if (!fs.existsSync(likedSongsPath)) {
    return [];
  }
  return await JSON.parse(fs.readFileSync(likedSongsPath, 'utf-8'));
}
  catch (err) {
    return [];
}
    }

  
export function saveLikedSongs(songs, likedSongsPath) {
  fs.writeFileSync(likedSongsPath, JSON.stringify(songs, null, 2));
}
