import { app, shell, dialog, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import fs from 'fs';
import path from 'path';
import { getLikedSongs, saveLikedSongs } from './utils/like';
import { getPlaylists, savePlaylists } from './utils/playlist';
import { error } from 'console';
import { SongType } from './types/all';

const likedSongsPath = path.join(app.getPath('userData'), 'likedSongs.json');
const playlistPath = path.join(app.getPath('userData'), 'playlists.json');

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  if (!fs.existsSync(likedSongsPath)) {
    fs.writeFileSync(likedSongsPath, '[]');
    console.log('file created to store likedsongs ', likedSongsPath);
  } else {
    console.log('file alreaady exists for likedSongs', likedSongsPath);
  }
  if (!fs.existsSync(playlistPath)) {
    fs.writeFileSync(playlistPath, '[]');
    console.log('file created to store  playlists   ', playlistPath);
  } else {
    console.log('file alreaady exists for playlists ', playlistPath);
  }

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//for picking music folder

ipcMain.handle('pick-music-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  if (result.canceled) return [];

  const folderPath = result.filePaths[0];

  const files = fs
    .readdirSync(folderPath)
    .filter(file => /\.(mp3|wav|ogg)$/i.test(file))
    .map(file => ({
      name: file,
      path: path.join(folderPath, file),
    }));

  return files;
});
ipcMain.handle('like-song', async (event, song: SongType) => {
  const likedSongsList = await getLikedSongs(likedSongsPath);
  const songIndex = likedSongsList.findIndex(s => s.path === song.path);

  if (songIndex !== -1) {
    likedSongsList.splice(songIndex, 1);
  } else {
    likedSongsList.push(song);
  }
  saveLikedSongs(likedSongsList, likedSongsPath);
  return likedSongsList;
});
ipcMain.handle('get-liked-songs', async () => {
  return getLikedSongs(likedSongsPath);
});
ipcMain.handle('create-playlist', async (event, name: string) => {
  const playlists = await getPlaylists(playlistPath);
  if (playlists.some(s => s.name === name)) {
    throw new Error('Playlist already exists');
  }
  playlists.push({ name, songs: [] });
  savePlaylists(playlists, playlistPath);
  return playlists;
});
ipcMain.handle('get-playlists', async () => {
  return getPlaylists(playlistPath);
});
ipcMain.handle(
  'add-to-playlist',
  async (event, song: SongType, ListName: string) => {
    const playlists = await getPlaylists(playlistPath);
    const playlist = playlists.find(s => s.name === ListName);
    if (playlist.songs.some(s => s.path === song.path)) {
      throw new error('song already exists');
    }
    playlist.songs.push(song);
    savePlaylists(playlists, playlistPath);
    return playlist;
  }
);
ipcMain.handle(
  'remove-song',
  async (event, song: SongType, playlistName: string) => {
    let playlists = await getPlaylists(playlistPath);
    const playlist = playlists.find(p => p.name === playlistName);
    playlist.songs.filter(s => s.path === song.path);
    savePlaylists(playlists, playlistPath);
    return playlists;
  }
);

ipcMain.handle('delete-playlist', async (event, name: string) => {
  let playlists = await getPlaylists(playlistPath);
  const newPlaylist = playlists.filter(p => p.name === name);
  savePlaylists(newPlaylist, playlistPath);
  return newPlaylist;
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
