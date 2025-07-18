import { SongType } from '@renderer/types/song';
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function LikeButton({
  song,
  likedSongs,
  refreshLikedSongs,
}: {
  song: SongType;
  likedSongs: SongType[];
  refreshLikedSongs: () => void;
}) {
  const isliked = likedSongs.some(s => s.path === song.path);

  const toggleLike = async () => {
    await window.likeAPI.likeSong(song);
    refreshLikedSongs();
  };

  return (
    <div onClick={toggleLike}>
      {isliked ? <FaHeart size={19} /> : <FaRegHeart />}
    </div>
  );
}
