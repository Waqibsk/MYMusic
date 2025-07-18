export type SongType = {
  name: string;
  path: string;
};
export type PlaylistItem = {
  name: string;
  songs: SongType[];
};
