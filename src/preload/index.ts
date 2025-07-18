import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
    contextBridge.exposeInMainWorld('electronAPI', {
      pickMusicFolder: () => ipcRenderer.invoke('pick-music-folder'),
    });
    contextBridge.exposeInMainWorld('likeAPI', {
      likeSong: song => ipcRenderer.invoke('like-song', song),
      getLikedSongs: () => ipcRenderer.invoke('get-liked-songs'),
    });
    contextBridge.exposeInMainWorld('playlistAPI', {
      addToPlaylist: (song, playlistName) =>
        ipcRenderer.invoke('add-to-playlist', song, playlistName),
      getPlaylists: () => ipcRenderer.invoke('get-playlists'),
      removeSong: (song, playlistName) =>
        ipcRenderer.invoke('remove-song', song, playlistName),
      deletePlaylist: playlistName =>
        ipcRenderer.invoke('delete-playlist', playlistName),
      createPlaylist: playlistName =>
        ipcRenderer.invoke('create-playlist', playlistName),
    });
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
